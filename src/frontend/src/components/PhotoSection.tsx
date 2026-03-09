// ── PhotoSection ─────────────────────────────────────────────────────────────
// Displays the watermarked photo in a soft, glowing frame that matches
// the ANONNA site's pink-purple aesthetic.

export default function PhotoSection() {
  return (
    <section
      data-ocid="anonna.photo.section"
      className="w-full flex flex-col items-center animate-fade-in-up-delay-2"
    >
      {/* Outer glow ring */}
      <div
        className="relative"
        style={{
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {/* Animated gradient border frame */}
        <div
          className="p-[2px] rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.82 0.18 350), oklch(0.72 0.22 340), oklch(0.65 0.18 290), oklch(0.72 0.22 340), oklch(0.82 0.18 350))",
            backgroundSize: "300% 300%",
            animation: "gradientShift 6s ease-in-out infinite",
            boxShadow:
              "0 0 40px oklch(0.72 0.22 340 / 0.35), 0 0 80px oklch(0.65 0.18 290 / 0.20), 0 0 120px oklch(0.72 0.22 340 / 0.12)",
          }}
        >
          {/* Glass card inner */}
          <div
            className="rounded-[22px] overflow-hidden card-glass"
            style={{
              padding: "10px",
            }}
          >
            {/* Photo */}
            <img
              src="/assets/generated/anonna-watermarked.jpg"
              alt="ANONNA"
              className="w-full h-auto block rounded-2xl"
              style={{
                display: "block",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Subtle radial glow behind the frame */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, oklch(0.72 0.22 340 / 0.18) 0%, transparent 70%)",
            zIndex: -1,
            transform: "scale(1.2)",
          }}
        />
      </div>

      {/* Caption */}
      <p
        className="mt-5 font-body text-xs tracking-[0.3em] uppercase animate-fade-in-up-delay-3"
        style={{ color: "oklch(0.58 0.10 320)" }}
      >
        ✦ আমার পরিচয় ✦
      </p>
    </section>
  );
}
