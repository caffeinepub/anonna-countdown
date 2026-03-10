import CalendarGrid from "./components/CalendarGrid";
import DayCounter from "./components/DayCounter";
import FlipCountdown from "./components/FlipCountdown";
import FloatingMusicPlayer from "./components/FloatingMusicPlayer";
import FloatingParticles from "./components/FloatingParticles";
import PhotoSection from "./components/PhotoSection";

// ── Title Section ────────────────────────────────────────────────────────────
function TitleSection() {
  return (
    <header
      data-ocid="ananya.title.section"
      className="text-center pt-4 md:pt-8"
    >
      <h1
        className="font-display font-bold tracking-[0.2em] animate-fade-in-up animate-title-glow select-none"
        style={{
          fontSize: "clamp(4rem, 18vw, 13rem)",
          lineHeight: 0.9,
          background:
            "linear-gradient(135deg, oklch(0.92 0.12 350) 0%, oklch(0.78 0.20 340) 30%, oklch(0.72 0.22 340) 60%, oklch(0.65 0.18 290) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        ANONNA
      </h1>

      <p
        className="font-body mt-4 md:mt-6 tracking-[0.25em] text-sm md:text-base lg:text-lg animate-fade-in-up-delay"
        style={{ color: "oklch(0.65 0.10 310)" }}
      >
        একটি প্রতিশ্রুতি
        <span
          className="mx-3 md:mx-4"
          style={{ color: "oklch(0.55 0.10 330)" }}
        >
          •
        </span>
        একটি অপেক্ষা
      </p>

      <div className="mt-8 md:mt-10 flex items-center justify-center gap-3">
        <div
          style={{
            width: "clamp(60px, 12vw, 100px)",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.22 340 / 0.5))",
          }}
        />
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "oklch(0.72 0.22 340)",
            boxShadow: "0 0 12px oklch(0.72 0.22 340 / 0.8)",
          }}
          className="animate-subtle-pulse"
        />
        <div
          style={{
            width: "clamp(60px, 12vw, 100px)",
            height: "1px",
            background:
              "linear-gradient(90deg, oklch(0.65 0.18 290 / 0.5), transparent)",
          }}
        />
      </div>
    </header>
  );
}

// ── Quote Section ───────────────────────────────────────────────────────────────
function QuoteSection() {
  return (
    <article
      data-ocid="ananya.quote.section"
      className="w-full max-w-2xl mx-auto animate-fade-in-up-delay"
    >
      <div
        className="relative rounded-2xl p-6 md:p-8 lg:p-10 card-glass"
        style={{
          borderLeft: "4px solid",
          borderImage:
            "linear-gradient(180deg, oklch(0.72 0.22 340), oklch(0.65 0.18 290)) 1",
          boxShadow:
            "0 0 40px oklch(0.72 0.22 340 / 0.15), 0 0 80px oklch(0.65 0.18 290 / 0.08), inset 0 1px 0 oklch(0.95 0.03 320 / 0.08)",
        }}
      >
        <div
          className="absolute font-display font-bold select-none pointer-events-none"
          style={{
            top: "-10px",
            left: "16px",
            fontSize: "8rem",
            lineHeight: 1,
            color: "oklch(0.72 0.22 340 / 0.12)",
            fontFamily: "Georgia, serif",
          }}
          role="presentation"
        >
          &ldquo;
        </div>

        <blockquote className="relative z-10" lang="bn">
          <p
            className="font-body leading-loose whitespace-pre-line"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "oklch(0.88 0.05 320)",
              lineHeight: 2,
            }}
          >
            {`কারোর জন্য সারা জীবন অপেক্ষা করা বোকামি।
তাই তাকে কিছু নির্দিষ্ট সময় দিয়ে অপেক্ষা করে
নিজের জীবন সুন্দরভাবে গড়ে তোলাই হচ্ছে মানবিক।
কারণ জীবন বারবার আসে না।`}
          </p>
        </blockquote>

        <div className="mt-5 flex items-center gap-3">
          <div
            style={{
              width: "32px",
              height: "2px",
              background:
                "linear-gradient(90deg, oklch(0.72 0.22 340 / 0.6), transparent)",
              borderRadius: "2px",
            }}
          />
          <span
            className="font-body text-xs tracking-widest"
            style={{ color: "oklch(0.58 0.10 320)" }}
          >
            — অনুভূতির কথা
          </span>
        </div>
      </div>
    </article>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "oklch(0.72 0.22 340)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "oklch(0.65 0.10 310)";
  };

  return (
    <footer className="w-full text-center pb-8 pt-4">
      <div className="flex items-center justify-center gap-2">
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "oklch(0.40 0.08 305 / 0.5)",
          }}
        />
        <p
          className="font-body text-xs tracking-wide"
          style={{ color: "oklch(0.45 0.07 310)" }}
        >
          © {year}. Built with{" "}
          <span style={{ color: "oklch(0.72 0.22 340)" }}>♥</span> using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: "oklch(0.65 0.10 310)" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            caffeine.ai
          </a>
        </p>
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "oklch(0.40 0.08 305 / 0.5)",
          }}
        />
      </div>
    </footer>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="relative overflow-x-hidden min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.13 0.07 295) 0%, oklch(0.17 0.08 310) 35%, oklch(0.16 0.07 330) 65%, oklch(0.14 0.06 350) 100%)",
      }}
    >
      <FloatingParticles />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 20%, oklch(0.72 0.22 340 / 0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, oklch(0.65 0.18 290 / 0.08) 0%, transparent 60%)",
          zIndex: 1,
        }}
        role="presentation"
      />

      <main
        className="relative flex flex-col items-center px-4 sm:px-6 md:px-8 py-12 md:py-16 gap-16 md:gap-24"
        style={{ zIndex: 2 }}
      >
        <TitleSection />
        <QuoteSection />
        <PhotoSection />
        <FlipCountdown />
        <CalendarGrid />
        <DayCounter />
        <Footer />
      </main>

      {/* Floating background music player */}
      <FloatingMusicPlayer />
    </div>
  );
}
