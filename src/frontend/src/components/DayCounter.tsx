import { useMemo } from "react";

const START_DATE = new Date("2026-03-09");
const END_DATE = new Date("2026-09-09");
const TOTAL_DAYS = 184;

// Generate stable day keys for the dot grid
const DAY_KEYS = Array.from(
  { length: TOTAL_DAYS },
  (_, i) => `day-dot-${i + 1}`,
);

function normalizeDate(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

interface Stats {
  elapsed: number;
  remaining: number;
  percentComplete: number;
}

function calculateStats(): Stats {
  const today = normalizeDate(new Date());
  const start = normalizeDate(START_DATE);
  const end = normalizeDate(END_DATE);

  if (today < start) {
    return { elapsed: 0, remaining: TOTAL_DAYS, percentComplete: 0 };
  }
  if (today > end) {
    return { elapsed: TOTAL_DAYS, remaining: 0, percentComplete: 100 };
  }

  const elapsed = Math.min(daysBetween(start, today), TOTAL_DAYS);
  const remaining = TOTAL_DAYS - elapsed;
  const percentComplete = Math.round((elapsed / TOTAL_DAYS) * 100);

  return { elapsed, remaining, percentComplete };
}

interface StatCardProps {
  label: string;
  labelBn: string;
  value: number;
  color: string;
  index: number;
}

function StatCard({ label, labelBn, value, color, index }: StatCardProps) {
  return (
    <div
      className="card-glass rounded-2xl p-5 md:p-6 flex-1 min-w-[130px] text-center"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.8s ease ${index * 0.15 + 0.5}s forwards`,
        boxShadow: `0 0 25px ${color}30, inset 0 1px 0 oklch(0.95 0.03 320 / 0.07)`,
        border: `1px solid ${color}40`,
      }}
    >
      <div
        className="font-display font-bold mb-1"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          background: `linear-gradient(135deg, ${color}, oklch(0.65 0.18 290))`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        className="font-body text-sm font-semibold uppercase tracking-widest mb-0.5"
        style={{ color: "oklch(0.70 0.08 310)" }}
      >
        {label}
      </div>
      <div
        className="font-body text-xs"
        style={{ color: "oklch(0.55 0.07 310)" }}
      >
        {labelBn}
      </div>
    </div>
  );
}

export default function DayCounter() {
  const stats = useMemo(() => calculateStats(), []);

  return (
    <section
      data-ocid="ananya.daycounter.section"
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-primary mb-3 animate-fade-in-up-delay-2">
          দিনের হিসাব
        </h2>
        <p
          className="font-body text-sm md:text-base animate-fade-in-up-delay-3"
          style={{ color: "oklch(0.65 0.08 310)" }}
        >
          প্রতিটি দিন একটি প্রতিশ্রুতি
        </p>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-4 flex-wrap justify-center mb-10">
        <StatCard
          label="Total"
          labelBn="মোট দিন"
          value={TOTAL_DAYS}
          color="oklch(0.72 0.22 340)"
          index={0}
        />
        <StatCard
          label="Elapsed"
          labelBn="পার হয়েছে"
          value={stats.elapsed}
          color="oklch(0.72 0.22 340)"
          index={1}
        />
        <StatCard
          label="Remaining"
          labelBn="বাকি আছে"
          value={stats.remaining}
          color="oklch(0.82 0.15 350)"
          index={2}
        />
      </div>

      {/* Dot Grid */}
      <div className="card-glass rounded-2xl p-6 md:p-8 glow-box-primary">
        <div className="flex flex-wrap gap-1.5 justify-center mb-6">
          {DAY_KEYS.map((key, i) => {
            const isFilled = i < stats.elapsed;
            return (
              <div
                key={key}
                title={`Day ${i + 1}`}
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  ...(isFilled
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.82 0.18 350), oklch(0.72 0.22 340), oklch(0.60 0.20 295))",
                        boxShadow: "0 0 6px oklch(0.72 0.22 340 / 0.5)",
                        animationName: "dotWave",
                        animationDuration: "0.3s",
                        animationTimingFunction:
                          "cubic-bezier(0.34, 1.56, 0.64, 1)",
                        animationFillMode: "both",
                        animationDelay: `${Math.min(i * 8, 800)}ms`,
                      }
                    : {
                        border: "1px solid oklch(0.72 0.22 340 / 0.18)",
                        background: "oklch(0.18 0.06 300 / 0.3)",
                      }),
                }}
              />
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span
              className="font-body text-xs"
              style={{ color: "oklch(0.60 0.08 310)" }}
            >
              শুরু · মার্চ ৯
            </span>
            <span
              className="font-body text-xs font-semibold"
              style={{ color: "oklch(0.72 0.22 340)" }}
            >
              {stats.percentComplete}% সম্পন্ন
            </span>
            <span
              className="font-body text-xs"
              style={{ color: "oklch(0.60 0.08 310)" }}
            >
              শেষ · সেপ্টেম্বর ৯
            </span>
          </div>
          <div
            className="w-full rounded-full overflow-hidden"
            style={{
              height: "6px",
              background: "oklch(0.25 0.06 305 / 0.8)",
            }}
          >
            <div
              className="h-full rounded-full progress-bar-fill"
              style={{
                width: `${stats.percentComplete}%`,
                background:
                  "linear-gradient(90deg, oklch(0.72 0.22 340), oklch(0.82 0.15 350), oklch(0.65 0.18 290))",
                boxShadow: "0 0 10px oklch(0.72 0.22 340 / 0.6)",
              }}
            />
          </div>
        </div>

        {/* Inspirational footer text */}
        <div className="mt-6 text-center">
          <p
            className="font-body text-sm italic"
            style={{ color: "oklch(0.58 0.08 310)" }}
          >
            {stats.remaining > 0
              ? `আর মাত্র ${stats.remaining} দিন...`
              : "যাত্রা সম্পন্ন হয়েছে ✨"}
          </p>
        </div>
      </div>
    </section>
  );
}
