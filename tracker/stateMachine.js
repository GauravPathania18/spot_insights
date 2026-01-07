let prev = {
  track_id: null,
  is_playing: false
};

function processState(state) {
  const events = [];

  if (!prev.is_playing && state.is_playing && state.track_id) {
    events.push(`TRACK_START — ${state.track_name}`);
  }

  if (prev.is_playing && !state.is_playing) {
    events.push("PAUSE");
  }

  if (prev.track_id && !state.track_id) {
  events.push("TRACK_END");
}


  prev = {
    track_id: state.track_id,
    is_playing: state.is_playing
  };

  return events;
}

module.exports = { processState };
