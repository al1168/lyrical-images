'use client';
import { useEffect } from 'react';
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady : any;
    Spotify :any;
  }
}
export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    script.onload = () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQCd0Pj03XocBbTYF4C689_ozJeJHUoN7aD-BZ8obLr1alkDqLU_zDrDuBULvVsgpPmfHx7yfwp5pHTgg6zLNGWAc1aqQ9CmnsJxzGc0fwPXb7uCpmaxiKwFT-CQYfMvSEiv1ibhymYUZ1TORo2x1l4nvoSvC7ECDJWjFxGsEmCbLArjwaEhwb5CGNDBLjodQMcjzLuEHqUtfPN_YGCUf_AW'; 
        const player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
        });

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
      };
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Spotify Web Playback SDK</h1>
    </main>
  );
}
