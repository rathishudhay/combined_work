const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const maxmind = require("maxmind");
const requestIp = require("request-ip");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
const allowedURL = process.env.ALLOWED_URL;

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected");
} catch (error) {
  console.log(error);
}

// const analyticsSchema = new mongoose.Schema({
//     timestamp: { type: Date, required: true },
//     referrer: { type: String, required: false },
//     screenWidth: { type: Number, required: true },
//     isPWA: { type: Boolean, required: true },
//     navigationData: { type: Object, required: true },
//     country: { type: String, required: true },
//     anonymousId: { type: String, required: true },
//     browserInfo: { type: String, required: true },
//     subdomain: { type: String, required: true }
// });

const countrySchema = new mongoose.Schema({
  countries: {
    type: Map,
    of: Number,
  },
  subdomain: { type: String, required: true },
});

const InteractionPerpageSchema = new mongoose.Schema({
  page: { type: String, required: true },
  interactionTime: { type: Number, required: true },
  subdomain: { type: String, required: true },
});

const uniqueUserSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  visitDate: { type: Date, required: true },
  subdomain: { type: String, required: true },
});

const eventSchema = new mongoose.Schema({
  uniqueUser: { type: [String], required: true },
  subdomain: { type: String, required: true },
  eventName: { type: String, required: true },
  totalAction: { type: Number, required: true },
});

// const Analytics = mongoose.model('Analytics', analyticsSchema);
const Country = mongoose.model("Country", countrySchema);
const InteractionPerpage = mongoose.model(
  "InteractionPerpage",
  InteractionPerpageSchema
);
const UniqueUser = mongoose.model("UniqueUser", uniqueUserSchema);
const Event = mongoose.model("Event", eventSchema);

// app.use(cors({
//     origin: /\.netlify\.app$/,
//     credentials: true
// }));
// app.use(cors({
//     origin: 'https://dainty-lily-988bf6.netlify.app/',
//     credentials: true
// }));
app.use(
  cors({
    origin: allowedURL,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(requestIp.mw());

let lookup;
maxmind
  .open("./GeoLite2-Country.mmdb")
  .then((cityLookup) => {
    lookup = cityLookup;
  })
  .catch((err) => {
    console.error("Error opening GeoLite2 database:", err);
  });

function generateAnonymousId(ip, userAgent, date) {
  const hash = crypto.createHash("sha256");
  hash.update(ip + userAgent + date);
  return hash.digest("hex");
}

app.post("/analytics/:subdomain", async (req, res) => {
  try {
    const subdomain = req.params.subdomain;

    if (!subdomain) {
      throw new Error("Subdomain not provided");
    }

    const clientIp = req.clientIp;
    if (!clientIp) {
      throw new Error("Client IP not found");
    }

    let countryDoc = await Country.findOne({ subdomain });
    if (!countryDoc) {
      countryDoc = new Country({ countries: {}, subdomain });
      await countryDoc.save();
      console.log(`Created new Country document for subdomain: ${subdomain}`);
    }

    let country = "unknown";
    if (lookup) {
      const geo = lookup.get(clientIp);
      if (geo && geo.country) {
        country = geo.country.iso_code;
      }
    } else {
      console.error("GeoLite2 lookup not initialized");
    }

    const { timestamp, navigationData, eventsCount } = req.body;

    for (const [page, interactionTime] of Object.entries(navigationData)) {
      await InteractionPerpage.findOneAndUpdate(
        { page, subdomain },
        { $inc: { interactionTime } },
        { upsert: true }
      );
    }

    const existingUser = await UniqueUser.findOne({ ip: clientIp, subdomain });
    if (!existingUser) {
      const newUser = new UniqueUser({
        ip: clientIp,
        visitDate: timestamp,
        subdomain,
      });
      await newUser.save();
    }

    for (const [eventName, count] of Object.entries(eventsCount)) {
      let eventDoc = await Event.findOne({ eventName, subdomain });
      if (!eventDoc) {
        eventDoc = new Event({
          eventName,
          subdomain,
          totalAction: count,
          uniqueUser: [clientIp],
        });
      } else {
        eventDoc.totalAction += count;
        if (!eventDoc.uniqueUser.includes(clientIp)) {
          eventDoc.uniqueUser.push(clientIp);
        }
      }
      await eventDoc.save();
    }

    await Country.findOneAndUpdate(
      { subdomain },
      { $inc: { [`countries.${country}`]: 1 }, subdomain },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: "Data added successfully",
    });
  } catch (error) {
    console.error("Error in /analytics route:", error);
    res.status(400).json({ error: error.message });
  }
});

app.get("/users-by-country/:subdomain", async (req, res) => {
  try {
    const { subdomain } = req.params;
    if (!subdomain) {
      return res.status(400).json({ error: "Subdomain not provided" });
    }

    const countryData = await Country.findOne({ subdomain });

    if (!countryData) {
      return res.status(200).json({ countries: {} });
    }

    const countries = countryData.countries;

    res.status(200).json({ countries });
  } catch (error) {
    console.error("Error in /users-by-country route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/total-users/:subdomain", async (req, res) => {
  try {
    const { subdomain } = req.params;
    if (!subdomain) {
      return res.status(400).json({ error: "Subdomain not provided" });
    }

    const totalUsers = await UniqueUser.countDocuments({ subdomain }).lean();

    const uniqueDates = await UniqueUser.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$visitDate" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // const dates = uniqueDates.map(doc => doc._id);
    // const userCounts = uniqueDates.map(doc => doc.count);

    const usersPerDate = uniqueDates.map((doc) => ({
      date: doc._id,
      userVisited: doc.count,
    }));

    const response = {
      totalUsers,
      usersPerDate,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in /total-users route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/interactions-per-page/:subdomain", async (req, res) => {
  try {
    const { subdomain } = req.params;
    if (!subdomain) {
      return res.status(400).json({ error: "Subdomain not provided" });
    }

    const interactionsData = await InteractionPerpage.find({ subdomain });

    if (!interactionsData || interactionsData.length === 0) {
      return res.status(200).json({ interactions: [] });
    }

    const interactions = interactionsData.map((interaction) => ({
      page: interaction.page,
      interactionTime: interaction.interactionTime,
    }));

    res.status(200).json({ interactions });
  } catch (error) {
    console.error("Error in /interactions-per-page route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/events/:subdomain", async (req, res) => {
  try {
    const { subdomain } = req.params;

    if (!subdomain) {
      return res.status(400).json({ error: "Subdomain not provided" });
    }

    const eventsData = await Event.find({ subdomain });

    if (!eventsData || eventsData.length === 0) {
      return res.status(200).json({ events: [] });
    }

    const events = eventsData.map((event) => ({
      eventName: event.eventName,
      totalAction: event.totalAction,
      uniqueUserCount: event.uniqueUser.length,
    }));

    res.status(200).json({ events });
  } catch (error) {
    console.error("Error in /events/:subdomain route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
