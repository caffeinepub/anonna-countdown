import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useFluteMelody } from "../hooks/useFluteMelody";

interface EntranceOverlayProps {
  onEnter: () => void;
}

export default function EntranceOverlay({ onEnter }: EntranceOverlayProps) {
  const { playFlute } = useFluteMelody();
  const [leaving, setLeaving] = useState(false);

  const handleEnter = () => {
    if (leaving) return;
    playFlute();
    setLeaving(true);
    setTimeout(onEnter, 900);
  };

  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 4 + Math.random() * 5,
    delay: Math.random() * 4,
  }));

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.button
          key="overlay"
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          className="fixed inset-0 flex flex-col items-center justify-center select-none cursor-pointer z-[1000] w-full border-0 outline-none"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.11 0.07 295) 0%, oklch(0.15 0.09 315) 40%, oklch(0.13 0.08 335) 70%, oklch(0.11 0.06 355) 100%)",
          }}
          onClick={handleEnter}
          aria-label="Enter website"
          data-ocid="entrance.button"
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, oklch(0.72 0.22 340 / 0.12) 0%, transparent 70%)",
            }}
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: "oklch(0.78 0.18 340 / 0.55)",
                boxShadow: "0 0 6px oklch(0.72 0.22 340 / 0.6)",
              }}
              animate={{
                y: [-12, 12, -12],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Content */}
          <motion.div
            className="flex flex-col items-center gap-8 relative z-10"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            {/* Title */}
            <h1
              className="font-display font-bold tracking-[0.2em]"
              style={{
                fontSize: "clamp(3.5rem, 16vw, 11rem)",
                lineHeight: 0.9,
                background:
                  "linear-gradient(135deg, oklch(0.92 0.12 350) 0%, oklch(0.78 0.20 340) 30%, oklch(0.72 0.22 340) 60%, oklch(0.65 0.18 290) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 30px oklch(0.72 0.22 340 / 0.4))",
              }}
            >
              ANONNA
            </h1>

            {/* Decorative line */}
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: "clamp(50px, 10vw, 80px)",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.72 0.22 340 / 0.5))",
                }}
              />
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "oklch(0.72 0.22 340)",
                  boxShadow: "0 0 10px oklch(0.72 0.22 340 / 0.9)",
                }}
              />
              <div
                style={{
                  width: "clamp(50px, 10vw, 80px)",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, oklch(0.65 0.18 290 / 0.5), transparent)",
                }}
              />
            </div>

            {/* Tap to enter */}
            <motion.div
              className="flex flex-col items-center gap-3"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div
                className="text-4xl"
                style={{
                  filter: "drop-shadow(0 0 12px oklch(0.78 0.18 340 / 0.9))",
                }}
              >
                ♪
              </div>
              <div
                className="font-body tracking-[0.35em] uppercase text-sm"
                style={{
                  color: "oklch(0.75 0.12 330)",
                  textShadow:
                    "0 0 20px oklch(0.72 0.22 340 / 0.6), 0 0 40px oklch(0.65 0.18 290 / 0.3)",
                }}
              >
                ছুঁয়ে দিন
              </div>
              <div
                className="font-body tracking-[0.25em] text-xs"
                style={{ color: "oklch(0.55 0.09 315)" }}
              >
                tap to enter
              </div>
            </motion.div>
          </motion.div>
        </motion.button>
      ) : (
        <motion.div
          key="leaving"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] pointer-events-none"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.11 0.07 295) 0%, oklch(0.15 0.09 315) 40%, oklch(0.13 0.08 335) 70%, oklch(0.11 0.06 355) 100%)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
