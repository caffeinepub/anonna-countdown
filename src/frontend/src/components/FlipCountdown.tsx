import { useEffect, useRef, useState } from "react";

const TARGET_DATE = new Date("2026-09-09T00:00:00");

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

interface FlipCardProps {
  value: string;
  label: string;
  labelBn: string;
}

function FlipCard({ value, label, labelBn }: FlipCardProps) {
  const prevValueRef = useRef(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 500);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flip-card-bg rounded-2xl px-5 py-4 md:px-8 md:py-6 glow-box-primary relative overflow-hidden"
        style={{ minWidth: "80px" }}
      >
        {/* Decorative top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.22 340 / 0.6), transparent)",
          }}
        />

        {/* Flip divider line */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "50%",
            height: "1px",
            background: "oklch(0.15 0.06 295 / 0.8)",
            zIndex: 1,
          }}
        />

        <div
          className={`font-display font-bold text-center select-none ${
            isFlipping ? "animate-flip-in" : ""
          }`}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1,
            background:
              "linear-gradient(135deg, oklch(0.92 0.12 350) 0%, oklch(0.72 0.22 340) 50%, oklch(0.65 0.20 295) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            perspectiveOrigin: "center",
          }}
        >
          {value}
        </div>
      </div>

      <div className="text-center">
        <div
          className="font-body text-xs md:text-sm font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.70 0.08 310)" }}
        >
          {label}
        </div>
        <div
          className="font-body text-xs mt-0.5"
          style={{ color: "oklch(0.60 0.07 310)" }}
        >
          {labelBn}
        </div>
      </div>
    </div>
  );
}

export default function FlipCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-ocid="ananya.countdown.section"
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-primary mb-3 animate-fade-in-up-delay-2">
          অপেক্ষার সময়
        </h2>
        <p
          className="font-body text-sm md:text-base animate-fade-in-up-delay-3"
          style={{ color: "oklch(0.65 0.08 310)" }}
        >
          September 9, 2026 পর্যন্ত বাকি
        </p>
      </div>

      <div className="flex gap-4 md:gap-6 lg:gap-10 justify-center flex-wrap">
        <FlipCard value={timeLeft.days} label="Days" labelBn="দিন" />
        <FlipCard value={timeLeft.hours} label="Hours" labelBn="ঘন্টা" />
        <FlipCard value={timeLeft.minutes} label="Minutes" labelBn="মিনিট" />
        <FlipCard value={timeLeft.seconds} label="Seconds" labelBn="সেকেন্ড" />
      </div>

      {/* Decorative separator */}
      <div className="mt-12 flex items-center gap-4">
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.22 340 / 0.3), transparent)",
          }}
        />
        <div
          className="text-xs font-body tracking-widest"
          style={{ color: "oklch(0.55 0.08 310)" }}
        >
          ✦ ✦ ✦
        </div>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.65 0.18 290 / 0.3), transparent)",
          }}
        />
      </div>
    </section>
  );
}
