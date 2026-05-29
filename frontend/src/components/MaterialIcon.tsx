"use client";

import React from "react";

interface MaterialIconProps {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
  filled?: boolean;
  size?: number;
}

export function MaterialIcon({
  icon,
  className = "",
  style,
  filled = false,
  size = 24,
}: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
        fontSize: size,
        ...style,
      }}
    >
      {icon}
    </span>
  );
}
