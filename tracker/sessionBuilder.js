const { randomUUID } = require("crypto");

let activeSession = null;
let lastTick = null;

function nowMs() {
  return Date.now();
}

function startSession(state) {
  activeSession = {
    session_id: randomUUID(),
    user_id: "local_user",
    track: {
      id: state.track_id,
      name: state.track_name,
      artist: state.artist
    },
    started_at: new Date(state.timestamp).toISOString(),
    ended_at: null,
    duration_listened_ms: 0,
    paused_ms: 0,
    skipped: false,
    source: state.device
  };
  lastTick = nowMs();
}

function tick(isPlaying) {
  if (!activeSession) return;

  const now = nowMs();
  const delta = now - lastTick;

  if (isPlaying) {
    activeSession.duration_listened_ms += delta;
  } else {
    activeSession.paused_ms += delta;
  }

  lastTick = now;
}

function endSession() {
  if (!activeSession) return null;

  activeSession.ended_at = new Date().toISOString();

  // simple skip heuristic (30 seconds minimum)
  if (activeSession.duration_listened_ms < 30000) {
    activeSession.skipped = true;
  }

  const finished = activeSession;
  activeSession = null;
  lastTick = null;

  return finished;
}

module.exports = {
  startSession,
  tick,
  endSession
};
