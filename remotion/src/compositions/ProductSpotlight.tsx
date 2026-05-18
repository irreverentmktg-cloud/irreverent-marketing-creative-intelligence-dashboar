import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface ProductSpotlightProps {
  productImageSrc: string;
  headline: string;
  subtext: string;
  ctaText: string;
  backgroundColor: string;
  accentColor: string;
  textColor: string;
  badgeText?: string;
}

export const productSpotlightDefaultProps: ProductSpotlightProps = {
  productImageSrc: "",
  headline: "Feel the difference in 7 days.",
  subtext: "Advanced formula. Zero compromise.",
  ctaText: "Shop Now →",
  backgroundColor: "#f5f0eb",
  accentColor: "#2d6a4f",
  textColor: "#1a1a1a",
  badgeText: "NEW",
};

export const ProductSpotlight: React.FC<ProductSpotlightProps> = ({
  productImageSrc,
  headline,
  subtext,
  ctaText,
  backgroundColor,
  accentColor,
  textColor,
  badgeText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const imageScale = spring({
    frame,
    fps,
    from: 0.85,
    to: 1,
    config: { damping: 18, stiffness: 80 },
  });
  const imageOpacity = interpolate(frame, [5, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headlineX = spring({
    frame: frame - 30,
    fps,
    from: -80,
    to: 0,
    config: { damping: 14 },
  });
  const headlineOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtextOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [85, 110], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaY = spring({
    frame: frame - 85,
    fps,
    from: 30,
    to: 0,
    config: { damping: 15 },
  });

  const badgeRotate = spring({
    frame,
    fps,
    from: -20,
    to: 0,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        opacity: bgOpacity,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        padding: 80,
      }}
    >
      {/* Product image */}
      <div
        style={{
          position: "relative",
          opacity: imageOpacity,
          transform: `scale(${imageScale})`,
        }}
      >
        {productImageSrc ? (
          <Img
            src={productImageSrc}
            style={{ width: 480, height: 480, objectFit: "contain" }}
          />
        ) : (
          <div
            style={{
              width: 480,
              height: 480,
              backgroundColor: accentColor + "22",
              borderRadius: 24,
              border: `3px dashed ${accentColor}66`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{ color: accentColor, fontSize: 28, fontWeight: 600 }}
            >
              Product Image
            </span>
          </div>
        )}
        {badgeText && (
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: accentColor,
              color: "#fff",
              fontSize: 28,
              fontWeight: 900,
              padding: "10px 20px",
              borderRadius: 8,
              letterSpacing: 2,
              transform: `rotate(${badgeRotate}deg)`,
            }}
          >
            {badgeText}
          </div>
        )}
      </div>

      {/* Text block */}
      <div style={{ textAlign: "center", maxWidth: 800 }}>
        <h1
          style={{
            color: textColor,
            fontSize: 56,
            fontWeight: 900,
            margin: 0,
            lineHeight: 1.15,
            opacity: headlineOpacity,
            transform: `translateX(${headlineX}px)`,
          }}
        >
          {headline}
        </h1>
        <p
          style={{
            color: textColor,
            fontSize: 32,
            fontWeight: 400,
            margin: "20px 0 0",
            opacity: subtextOpacity,
            letterSpacing: 0.5,
          }}
        >
          {subtext}
        </p>
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        <div
          style={{
            backgroundColor: accentColor,
            color: "#ffffff",
            fontSize: 36,
            fontWeight: 700,
            padding: "22px 56px",
            borderRadius: 60,
            letterSpacing: 1,
          }}
        >
          {ctaText}
        </div>
      </div>
    </AbsoluteFill>
  );
};
