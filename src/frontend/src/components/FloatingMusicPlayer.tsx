import { AnimatePresence, motion } from "motion/react";
import { useBackgroundMusic } from "../hooks/useBackgroundMusic";

export default function FloatingMusicPlayer() {
  const {
    isPlaying,
    started,
    trackName,
    trackIndex,
    totalTracks,
    start,
    pause,
    resume,
    nextTrack,
  } = useBackgroundMusic();

  const handlePlayPause = () => {
    if (!started) start();
    else if (isPlaying) pause();
    else resume();
  };

  return (
    <div
      className="fixed bottom-6 right-5 z-[500] flex flex-col items-end gap-2"
      data-ocid="music.panel"
    >
      {/* Track name tooltip */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl px-3 py-1.5 text-xs font-body tracking-wide"
            style={{
              background: "oklch(0.18 0.08 310 / 0.92)",
              border: "1px solid oklch(0.72 0.22 340 / 0.25)",
              color: "oklch(0.85 0.10 330)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 20px oklch(0.72 0.22 340 / 0.15)",
            }}
          >
            ♪ {trackName}
            <span style={{ color: "oklch(0.55 0.09 315)" }}>
              {" "}
              ({trackIndex + 1}/{totalTracks})
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls row */}
      <div className="flex items-center gap-2">
        {/* Next track button */}
        <AnimatePresence>
          {isPlaying && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={nextTrack}
              data-ocid="music.secondary_button"
              className="flex items-center justify-center rounded-full w-9 h-9 transition-all duration-200 active:scale-95"
              style={{
                background: "oklch(0.18 0.08 310 / 0.88)",
                border: "1px solid oklch(0.72 0.22 340 / 0.25)",
                color: "oklch(0.78 0.16 335)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 2px 12px oklch(0.72 0.22 340 / 0.12)",
              }}
              aria-label="Next track"
              title="পরের সুর"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                role="img"
              >
                <title>Next</title>
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Play / Pause button */}
        <motion.button
          type="button"
          onClick={handlePlayPause}
          data-ocid="music.primary_button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center justify-center rounded-full w-12 h-12 transition-all duration-200"
          style={{
            background: isPlaying
              ? "linear-gradient(135deg, oklch(0.72 0.22 340), oklch(0.65 0.18 290))"
              : "oklch(0.20 0.09 310 / 0.92)",
            border: "1px solid oklch(0.72 0.22 340 / 0.35)",
            boxShadow: isPlaying
              ? "0 0 20px oklch(0.72 0.22 340 / 0.45), 0 4px 16px oklch(0.65 0.18 290 / 0.3)"
              : "0 2px 14px oklch(0.72 0.22 340 / 0.18)",
            backdropFilter: "blur(12px)",
            color: isPlaying ? "oklch(0.98 0.02 320)" : "oklch(0.72 0.22 340)",
          }}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "বন্ধ করুন" : "বাঁশি শুনুন"}
        >
          {!started ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              role="img"
            >
              <title>Music</title>
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          ) : isPlaying ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              role="img"
            >
              <title>Pause</title>
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              role="img"
            >
              <title>Play</title>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Pulse ring when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="absolute bottom-0 right-0 w-12 h-12 rounded-full pointer-events-none"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
            style={{
              border: "1px solid oklch(0.72 0.22 340 / 0.5)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
