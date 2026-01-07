ended_at > started_at

duration_listened_ms <= (ended_at - started_at)

paused_ms + duration_listened_ms <= session_length

skipped = true if duration_listened_ms < 30% of track length