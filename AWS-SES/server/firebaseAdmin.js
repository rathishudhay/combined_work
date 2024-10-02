const admin = require('firebase-admin');
const serviceAccount = require('./pushfirebase-e63fd-firebase-adminsdk-zsm7j-d0d26086bc.json');  // Replace with your actual service account path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
