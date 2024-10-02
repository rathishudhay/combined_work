import React from 'react'
import Drag from './Components/Drag'
import Spacing from './Components/Spacing'
import LightBox from './Components/LightBox'
import ScrollAnimation from './Components/ScrollAnimation'
import FontUploader from './Components/FontUploader'
import YouTubePlayer from './Components/YoutubeVideo'
import EmbeddedVideo from './Components/EmbeddedVideo'
import LottiePlayer from './Components/LottiePlayer'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Analytics from './Components/Analytics'
import ManualSpacing from './Components/ManualSpacing'
import BorderSide from './Components/BorderSide'
import GoogleMpas from './Components/GoogleMpas'
import Interactions from './Components/Interactions'


const App = () => {
  const youtubeUrl = 'https://youtu.be/OGTG1l7yin4?si=1SbKUybnROnNDYGr';
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>

              <Link to="/analytics">Go to analytics</Link>

              <Drag />

              <div style={{ height: "5vh" }}></div>

              <Spacing />

              <div style={{ height: "10vh" }}></div>

              <LightBox />

              <div style={{ height: "5vh" }}></div>

              {/* <ScrollAnimation bottom={true} top={false} inView={false}/> */}
              <ScrollAnimation bottom={false} top={true} inView={false} />
              {/* <ScrollAnimation bottom={false} top={false} inView={true}/> */}

              <div style={{ height: "10vh" }}></div>

              <FontUploader />

              <div style={{ height: "10vh" }}></div>

              <h1 className="text-2xl font-bold mb-4">Youtube Integration</h1>
              <YouTubePlayer
                width="640"
                height="360"
                url={youtubeUrl}
                title={"Custom"}
                startAt="00:00:30"
                mute={false}
                autoplay={false}
                controls={true}
                limitRelated={true}
              />

              <div style={{ height: "10vh" }}></div>

              <h1 className="text-2xl font-bold mb-4">Video Integration</h1>
              <EmbeddedVideo
                url="https://rr1---sn-npoe7ne7.googlevideo.com/videoplayback?expire=1716721913&ei=mcRSZvCxJ_eG6dsPs8GN2Ao&ip=45.112.174.202&id=o-AMBKw2tWfR7DxC2I0OKr0PhwUN1ExjTZWLZk9lGRTLRu&itag=135&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AWRWj2TJ9nWlk_i5sHkaae5yP__ZS0tyTbeX8YwcCGL5usZ4BgYQvOPxeCar-W23JvabPur5Nsz_p5V_&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=4717711&dur=544.999&lmt=1621314719891106&keepalive=yes&c=MEDIA_CONNECT_FRONTEND&txp=5311224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAKp360KuAcbmk0Q-_-zTm6R73uoWR_LeU-9GWDDITV3_AiEAs0HoPobOsTtVgkdbhkyRo2KVIGzNnKuld4mPzPoBs-E%3D&redirect_counter=1&cm2rm=sn-i3bd67z&fexp=24350476&req_id=b0c7eb6391a2a3ee&cms_redirect=yes&mh=cE&mip=2405:201:6802:d1e5:5de1:38b7:e8be:b1b8&mm=34&mn=sn-npoe7ne7&ms=ltu&mt=1716699866&mv=m&mvi=1&pl=45&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AHWaYeowRAIgJisdOKEq5so7hEe_f4WNudz-FCYPnSbHtU6knwIxBWYCIFOs88HexCQQ-Z9KAp8Ewgqxf3VlKh2Iqs_Ldx9fRX72"
                title="My Embedded Video"
                width="640"
                height="360"
              />

              <div style={{ height: "10vh" }}></div>

              <h1 className="text-2xl font-bold mb-4">Lottie Integration</h1>
              <LottiePlayer loop={true} playReverse={true} renderer="canvas" />

              <div style={{ height: "10vh" }}></div>

              <ManualSpacing />

              <div style={{ height: "10vh" }}></div>

              <div className='m-20'>
                <BorderSide />
              </div>

              <div style={{ height: "10vh" }}></div>

              <div className="m-20">
                <GoogleMpas
                  apiKey="AIzaSyChM3B5LGvi1cpFkNj-Yp3uurFjnZIv-2s"
                  address="1600 Amphitheatre Parkway, Mountain View, CA"
                  title="Google HQ"
                  tooltip="Google's headquarters in Mountain View, California"
                />
              </div>

              <div style={{ height: "10vh" }}></div>
            </>
          } />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/interactions' element={<Interactions />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App