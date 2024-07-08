'use client';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

export default function Home() {
  const [player, setPlayer] = useState<any>(null);
  const [isPaused, setPaused] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    script.onload = () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'replace with ur owntoken';
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
        });

        setPlayer(player);
        console.log(player); // Log the player object to see its contents

        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player.addListener('player_state_changed', (state) => {
          if (!state) {
            return;
          }

          setPaused(state.paused);
        });

        player.connect();
      };
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const togglePlay = () => {
    if (player) {
      player.togglePlay();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Spotify Web Playback SDK</h1>
      <button className="btn-spotify" onClick={togglePlay}>
        {isPaused ? "PLAY" : "PAUSE"}
      </button>
    </main>
  );
}
