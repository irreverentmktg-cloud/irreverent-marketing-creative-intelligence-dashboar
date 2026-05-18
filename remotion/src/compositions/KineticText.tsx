import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";

export interface KineticTextProps {
  lines: string[];
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  highlightIndices?: number[];
  backgroundVideoSrc?: string;
}

export const kineticTextDefaultProps: KineticTextProps = {
  lines: ["Stop scrolling.", "This actually works.", "Science-backed.", "Zero BS."],
  accentColor: "#ff4444",
  backgroundColor: "#0a0a0a",
  textColor: "#ffffff",
  highlightIndices: [1],
};

const FRAMES_PER_LINE = 30;

export const KineticText: React.FC<KineticTextProps> = ({
  lines,
  accentColor,
  backgroundColor,
  textColor,
  highlightIndices = [],
  backgroundVideoSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {backgroundVideoSrc && (
        <AbsoluteFill>
          <Video
            src={backgroundVideoSrc}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      )}
      {backgroundVideoSrc && (
        <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.6)" }} />
      )}
      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          gap: 24,
        }}
      >
      {lines.map((line, i) => {
        const startFrame = i * FRAMES_PER_LINE;
        const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = spring({
          frame: frame - startFrame,
          fps,
          from: 40,
          to: 0,
          config: { damping: 16, stiffness: 120 },
        });
        const scale = spring({
          frame: frame - startFrame,
          fps,
          from: 0.88,
          to: 1,
          config: { damping: 18 },
        });

        const isHighlighted = highlightIndices.includes(i);

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateY(${y}px) scale(${scale})`,
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: isHighlighted ? accentColor : textColor,
                fontSize: isHighlighted ? 96 : 80,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: isHighlighted ? -3 : -2,
                textTransform: "uppercase",
                display: "block",
              }}
            >
              {line}
            </span>
            {isHighlighted && (
              <div
                style={{
                  height: 5,
                  backgroundColor: accentColor,
                  borderRadius: 3,
                  marginTop: 12,
                  opacity: interpolate(frame, [startFrame + 10, startFrame + 25], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              />
            )}
          </div>
        );
      })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
