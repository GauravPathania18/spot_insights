let isPlaying = false;
let track = {
  id: "t1",
  name: "Mock Song",
  artist: "Mock Artist"
};

function now() {
  return new Date().toISOString();
}

// Force playback to start after 2 seconds
setTimeout(() => {
  isPlaying = true;
}, 2000);

// Force pause after 5 seconds
setTimeout(() => {
  isPlaying = false;
}, 5000);

// Force resume after 7 seconds
setTimeout(() => {
  isPlaying = true;
}, 7000);

// Force track end after 10 seconds
setTimeout(() => {
  isPlaying = false;
  track = null;
}, 10000);

module.exports = {
  getPlaybackState() {
  return {
    is_playing: isPlaying,
    track_id: track ? track.id : null,
    track_name: track ? track.name : null,
    artist: track ? track.artist : null,
    progress_ms: 0,
    device: "desktop",
    timestamp: now()
  };
}

};
