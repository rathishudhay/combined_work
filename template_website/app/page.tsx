"use client"
import FullScreenVideo from "@/components/FullScreenVideo";
import Parallax from "@/components/Parallax";
import ScrollSeparate from "@/components/ScrollSeparate";
import TextTwistingEffect from "@/components/TextTwistingEffect";
import VideoCard from "@/components/VideoCard";

export default function Home() {
  return (
    <div>
      <Parallax
        imageUrl="https://a.storyblok.com/f/133769/1920x2716/5c24d6b467/exo-ape-hero-1.jpg/m/2400x3395/filters:quality(90)"
      />
      <VideoCard
        videoUrl="https://download-video.akamaized.net/v3-1/playback/4bdb3586-71c8-40be-b000-2ba5691333a3/dee0a4f7?__token__=st=1719926568~exp=1719940968~acl=%2Fv3-1%2Fplayback%2F4bdb3586-71c8-40be-b000-2ba5691333a3%2Fdee0a4f7%2A~hmac=aeddcbbafa5b0f7fed93ced8872f86a52d4192bf629a05bbd2ecc25183c035d9&r=dXMtY2VudHJhbDE%3D"
        previewImageUrl="https://a.storyblok.com/f/133769/2400x2990/540fb12941/columbia-pictures-thumbnail.jpg/m/1300x1620/filters:quality(90)"
        height="auto"
        width="300px"
        autoPlayOnHover={true}
        title="Hello Hello hello hello hello"
      />

      <FullScreenVideo
        videoUrl="https://download-video.akamaized.net/v3-1/playback/334619e0-f92f-4627-ba88-dfe521b4e062/9e976370?__token__=st=1720029467~exp=1720043867~acl=%2Fv3-1%2Fplayback%2F334619e0-f92f-4627-ba88-dfe521b4e062%2F9e976370%2A~hmac=3f0fb397ee5364daae7950d731e5e95f456490aea722bbf9a45ef534ddbac5f4&r=dXMtY2VudHJhbDE%3D"
      />

      {/* <div className="h-10"></div>

      <ScrollSeparate /> */}

      <div className="h-screen"></div>

    </div>
  );
}
