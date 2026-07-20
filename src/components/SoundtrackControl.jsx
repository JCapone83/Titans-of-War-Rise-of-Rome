import { ExternalLink, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { parseStoredMuted, parseStoredVolume, soundtrackTrackIdForTurn, soundtrackTracks } from '../game/soundtrack.js'

const VOLUME_KEY = 'birth-of-rome-music-volume'
const MUTED_KEY = 'birth-of-rome-music-muted'

function storedVolume() {
  return parseStoredVolume(window.localStorage.getItem(VOLUME_KEY))
}

function storedMuted() {
  return parseStoredMuted(window.localStorage.getItem(MUTED_KEY))
}

export function SoundtrackControl({ open, turn, onClose }) {
  const audioRef = useRef(null)
  const recommendedId = soundtrackTrackIdForTurn(turn)
  const previousRecommendedRef = useRef(recommendedId)
  const [trackIndex, setTrackIndex] = useState(() => Math.max(0, soundtrackTracks.findIndex((track) => track.id === recommendedId)))
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(storedMuted)
  const [volume, setVolume] = useState(storedVolume)
  const [playbackError, setPlaybackError] = useState('')
  const track = soundtrackTracks[trackIndex]

  useEffect(() => {
    if (previousRecommendedRef.current === recommendedId) return
    const nextIndex = soundtrackTracks.findIndex((candidate) => candidate.id === recommendedId)
    if (nextIndex >= 0) setTrackIndex(nextIndex)
    previousRecommendedRef.current = recommendedId
  }, [recommendedId])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = track.src
    audio.load()
    setPlaybackError('')
    if (playing) audio.play().catch(() => {
      setPlaying(false)
      setPlaybackError('Playback was blocked by the browser.')
    })
  }, [track.src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted = muted
    window.localStorage.setItem(VOLUME_KEY, String(volume))
    window.localStorage.setItem(MUTED_KEY, String(muted))
  }, [muted, volume])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      setPlaying(true)
      setPlaybackError('')
    } catch {
      setPlaybackError('Playback was blocked by the browser.')
    }
  }

  const changeTrack = (direction) => {
    setTrackIndex((current) => (current + direction + soundtrackTracks.length) % soundtrackTracks.length)
  }

  return (
    <>
      <audio ref={audioRef} loop preload="metadata" onError={() => setPlaybackError('This recording could not be loaded.')} />
      {open ? (
        <section className="soundtrack-panel" aria-label="Roman soundtrack controls">
          <div className="soundtrack-heading">
            <div>
              <span>Roman Soundscape</span>
              <small>Recommended for turn {turn}</small>
            </div>
            <button type="button" onClick={onClose} title="Close soundtrack" aria-label="Close soundtrack"><X /></button>
          </div>
          <div className="soundtrack-now-playing" aria-live="polite">
            <strong>{track.title}</strong>
            <span>{track.composer} · {track.performer}</span>
            <small>{track.id === recommendedId ? 'Era recommendation' : track.license}</small>
          </div>
          <div className="soundtrack-transport" aria-label="Playback controls">
            <button type="button" onClick={() => changeTrack(-1)} title="Previous recording" aria-label="Previous recording"><SkipBack /></button>
            <button type="button" className="play-command" onClick={togglePlayback} title={playing ? 'Pause music' : 'Play music'} aria-label={playing ? 'Pause music' : 'Play music'}>
              {playing ? <Pause /> : <Play />}
            </button>
            <button type="button" onClick={() => changeTrack(1)} title="Next recording" aria-label="Next recording"><SkipForward /></button>
            <button type="button" onClick={() => setMuted((current) => !current)} title={muted ? 'Unmute music' : 'Mute music'} aria-label={muted ? 'Unmute music' : 'Mute music'}>
              {muted ? <VolumeX /> : <Volume2 />}
            </button>
          </div>
          <label className="soundtrack-volume">
            <Volume2 aria-hidden="true" />
            <span>Volume</span>
            <input aria-label="Music volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
          </label>
          <a className="soundtrack-source" href={track.source} target="_blank" rel="noreferrer">
            <span>Source and rights</span>
            <small>{track.license}</small>
            <ExternalLink />
          </a>
          {playbackError ? <p className="soundtrack-error" role="status">{playbackError}</p> : null}
        </section>
      ) : null}
    </>
  )
}
