import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface UGCHookProps {
  hookText: string;
  brandName: string;
  ctaText: string;
  backgroundColor: string;
  accentColor: string;
  textColor: string;
}

export const ugcHookDefaultProps: UGCHookProps = {
  hookText: "This changed everything about my morning routine.",
  brandName: "NEKTAR®",
  ctaText: "Try it free →",
  backgroundColor: "#0a0a0a",
  accentColor: "#c8ff00",
  textColor: "#ffffff",
};

export const UGCHook: React.FC<UGCHookProps> = ({
  hookText,
  brandName,
  ctaText,
  backgroundColor,
  accentColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const brandOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const brandY = spring({ frame, fps, from: -30, to: 0, config: { damping: 15 } });

  const hookOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const hookY = spring({
    frame: frame - 20,
    fps,
    from: 60,
    to: 0,
    config: { damping: 12 },
  });

  const ctaOpacity = interpolate(frame, [90, 115], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaY = spring({
    frame: frame - 90,
    fps,
    from: 40,
    to: 0,
    config: { damping: 15 },
  });

  const barScale = interpolate(frame, [40, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, transparent 60%, ${accentColor}22 100%)`,
        }}
      />

      {/* Brand name */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: brandOpacity,
          transform: `translateY(${brandY}px)`,
        }}
      >
        <span
          style={{
            color: accentColor,
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {brandName}
        </span>
      </div>

      {/* Hook text */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            opacity: hookOpacity,
            transform: `translateY(${hookY}px)`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: textColor,
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.1,
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: -1,
            }}
          >
            {hookText}
          </p>
          <div
            style={{
              height: 6,
              backgroundColor: accentColor,
              marginTop: 28,
              borderRadius: 3,
              transform: `scaleX(${barScale})`,
              transformOrigin: "left center",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        <div
          style={{
            backgroundColor: accentColor,
            color: "#000000",
            paddingLeft: 48,
            paddingRight: 48,
            paddingTop: 24,
            paddingBottom: 24,
            borderRadius: 60,
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          {ctaText}
        </div>
      </div>
    </AbsoluteFill>
  );
};
