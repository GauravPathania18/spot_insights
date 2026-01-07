const { getPlaybackState } = require("./mockPlayer");
const { processState } = require("./stateMachine");
const {
  startSession,
  tick,
  endSession
} = require("./sessionBuilder");

async function sendSession(session) {
  await fetch("http://localhost:4000/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(session)
  });
}

setInterval(() => {
  const state = getPlaybackState();
  const events = processState(state);

  // time accumulation
  tick(state.is_playing);

  events.forEach(e => {
    console.log(`[${state.timestamp}] ${e}`);

    if (e.startsWith("TRACK_START")) {
      startSession(state);
    }

    if (e === "TRACK_END") {
      const session = endSession();
      if (session) {
        console.log("SESSION COMPLETE:");
        console.log(JSON.stringify(session, null, 2));
        sendSession(session);
      }
    }
  });
}, 1000);
