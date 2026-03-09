import { useMemo } from "react";

const START_DATE = new Date("2026-03-09");
const END_DATE = new Date("2026-09-09");

const MONTH_NAMES_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_NAMES_BN = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const DAY_LABELS = [
  { key: "sun", label: "S" },
  { key: "mon", label: "M" },
  { key: "tue", label: "T" },
  { key: "wed", label: "W" },
  { key: "thu", label: "T" },
  { key: "fri", label: "F" },
  { key: "sat", label: "S" },
];

interface DayInfo {
  date: Date;
  dayOfMonth: number;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
  globalIndex: number;
}

interface MonthData {
  year: number;
  month: number;
  days: DayInfo[];
  startDayOfWeek: number;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function normalizeDate(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function generateCalendarData(): MonthData[] {
  const today = normalizeDate(new Date());
  const start = normalizeDate(START_DATE);
  const end = normalizeDate(END_DATE);

  const months: MonthData[] = [];
  const current = new Date(start);
  let globalIndex = 0;

  while (current <= end) {
    const year = current.getFullYear();
    const month = current.getMonth();

    const days: DayInfo[] = [];
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);

    const monthStart =
      current > firstOfMonth ? new Date(current) : firstOfMonth;
    const monthEnd = end < lastOfMonth ? end : lastOfMonth;

    for (
      let d = new Date(monthStart);
      d <= monthEnd;
      d.setDate(d.getDate() + 1)
    ) {
      const thisDate = new Date(d);
      days.push({
        date: thisDate,
        dayOfMonth: thisDate.getDate(),
        isPast: thisDate < today && !isSameDay(thisDate, today),
        isToday: isSameDay(thisDate, today),
        isFuture: thisDate > today,
        globalIndex: globalIndex++,
      });
    }

    if (days.length > 0) {
      months.push({
        year,
        month,
        days,
        startDayOfWeek: days[0].date.getDay(),
      });
    }

    // Move to first day of next month
    current.setMonth(month + 1);
    current.setDate(1);
  }

  return months;
}

interface DateCircleProps {
  day: DayInfo;
}

function DateCircle({ day }: DateCircleProps) {
  const baseStyle: React.CSSProperties = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 600,
    fontFamily: "Outfit, sans-serif",
    position: "relative",
    cursor: "default",
    userSelect: "none",
    flexShrink: 0,
  };

  if (day.isToday) {
    return (
      <div style={{ position: "relative", width: "36px", height: "36px" }}>
        {/* Pulse ring */}
        <div
          className="animate-pulse-glow animate-subtle-pulse"
          style={{
            position: "absolute",
            inset: "-4px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, oklch(0.72 0.22 340 / 0.4), oklch(0.65 0.18 290 / 0.4))",
            zIndex: 0,
          }}
        />
        <div
          style={{
            ...baseStyle,
            background:
              "linear-gradient(135deg, oklch(0.82 0.18 350), oklch(0.72 0.22 340), oklch(0.65 0.20 295))",
            color: "oklch(0.12 0.04 300)",
            fontWeight: 800,
            transform: "scale(1.1)",
            boxShadow:
              "0 0 20px oklch(0.72 0.22 340 / 0.9), 0 0 40px oklch(0.72 0.22 340 / 0.5)",
            zIndex: 1,
          }}
        >
          {day.dayOfMonth}
        </div>
      </div>
    );
  }

  if (day.isPast) {
    return (
      <div
        style={{
          ...baseStyle,
          background:
            "linear-gradient(135deg, oklch(0.72 0.22 340 / 0.85), oklch(0.60 0.20 295 / 0.85))",
          color: "oklch(0.95 0.03 320)",
          animationName: "fillCircle",
          animationDuration: "0.4s",
          animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          animationFillMode: "both",
          animationDelay: `${Math.min(day.globalIndex * 12, 800)}ms`,
          boxShadow: "0 0 8px oklch(0.72 0.22 340 / 0.3)",
        }}
      >
        {day.dayOfMonth}
      </div>
    );
  }

  // Future
  return (
    <div
      style={{
        ...baseStyle,
        border: "1px solid oklch(0.72 0.22 340 / 0.20)",
        color: "oklch(0.55 0.07 310)",
        background: "oklch(0.18 0.06 300 / 0.3)",
      }}
    >
      {day.dayOfMonth}
    </div>
  );
}

export default function CalendarGrid() {
  const months = useMemo(() => generateCalendarData(), []);

  return (
    <section
      data-ocid="ananya.calendar.section"
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-primary mb-3 animate-fade-in-up-delay-2">
          যাত্রার পথচিত্র
        </h2>
        <p
          className="font-body text-sm md:text-base animate-fade-in-up-delay-3"
          style={{ color: "oklch(0.65 0.08 310)" }}
        >
          মার্চ ৯ থেকে সেপ্টেম্বর ৯, ২০২৬
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {months.map((month) => (
          <div
            key={`${month.year}-${month.month}`}
            className="card-glass rounded-2xl p-5 md:p-6 glow-box-primary"
          >
            {/* Month Header */}
            <div className="mb-5 flex items-baseline gap-3">
              <h3
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                  background:
                    "linear-gradient(135deg, oklch(0.82 0.15 350), oklch(0.65 0.18 290))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {MONTH_NAMES_EN[month.month]} {month.year}
              </h3>
              <span
                className="font-body text-sm"
                style={{ color: "oklch(0.60 0.08 310)" }}
              >
                {MONTH_NAMES_BN[month.month]}
              </span>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_LABELS.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-center"
                  style={{
                    height: "28px",
                    fontSize: "10px",
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 600,
                    color: "oklch(0.55 0.08 310)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-y-2">
              {/* Empty cells before start */}
              {Array.from({ length: month.startDayOfWeek }, (_, i) => (
                <div key={`${month.year}-${month.month}-empty-${i}`} />
              ))}

              {/* Day circles */}
              {month.days.map((day) => (
                <div
                  key={day.date.toISOString()}
                  className="flex items-center justify-center"
                  style={{ height: "40px" }}
                >
                  <DateCircle day={day} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 md:gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, oklch(0.72 0.22 340), oklch(0.60 0.20 295))",
            }}
          />
          <span
            className="font-body text-xs"
            style={{ color: "oklch(0.65 0.08 310)" }}
          >
            পার হয়েছে
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="animate-subtle-pulse"
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, oklch(0.82 0.18 350), oklch(0.65 0.20 295))",
              boxShadow: "0 0 10px oklch(0.72 0.22 340 / 0.8)",
            }}
          />
          <span
            className="font-body text-xs"
            style={{ color: "oklch(0.65 0.08 310)" }}
          >
            আজকের দিন
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: "1px solid oklch(0.72 0.22 340 / 0.25)",
            }}
          />
          <span
            className="font-body text-xs"
            style={{ color: "oklch(0.65 0.08 310)" }}
          >
            আসছে
          </span>
        </div>
      </div>
    </section>
  );
}
