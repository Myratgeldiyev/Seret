"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"

interface VideoPlayerProps {
  movieId: string
  movieTitle: string
  videoUrl: string // Added videoUrl prop to accept actual video source
  onBack?: () => void
}

export function VideoPlayer({ movieId, movieTitle, videoUrl, onBack }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  // Load saved playback time
  useEffect(() => {
    const savedTime = localStorage.getItem(`seret_playback_${movieId}`)
    if (savedTime && videoRef.current) {
      videoRef.current.currentTime = Number.parseFloat(savedTime)
    }
  }, [movieId])

  // Save playback time periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && isPlaying) {
        localStorage.setItem(`seret_playback_${movieId}`, videoRef.current.currentTime.toString())
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [movieId, isPlaying])

  // Handle controls visibility
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => {
        container.removeEventListener("mousemove", handleMouseMove)
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current)
        }
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
  }

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black group">
      <video
        ref={videoRef}
        className="w-full h-full"
        src={videoUrl} // Use the actual videoUrl prop instead of placeholder
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
      />

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
            )}
            <h2 className="text-xl font-semibold text-white">{movieTitle}</h2>
          </div>
        </div>

        {/* Center Play Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="icon" className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30" onClick={togglePlay}>
              <Play className="w-10 h-10 fill-current text-white" />
            </Button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
          {/* Progress Bar */}
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
              </Button>

              <Button variant="ghost" size="icon" onClick={() => skip(-10)} className="text-white hover:bg-white/20">
                <SkipBack className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="icon" onClick={() => skip(10)} className="text-white hover:bg-white/20">
                <SkipForward className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-24"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
