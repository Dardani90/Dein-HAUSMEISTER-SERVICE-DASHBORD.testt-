"use client";
import { F, GR, GD, WH, TX, BR } from "../lib/theme";

export default function GBtn({ label, onClick, variant = "fill" }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "13px 0", borderRadius: 13, cursor: "pointer",
        fontFamily: F, fontWeight: 700, fontSize: 14, transition: "all .15s",
        background: variant === "fill" ? `linear-gradient(150deg,${GR},${GD})` : WH,
        color: variant === "fill" ? "#fff" : TX,
        border: variant === "out" ? `1.5px solid ${BR}` : "none",
        boxShadow: variant === "fill" ? `0 4px 14px ${GR}44` : "none",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.opacity = ".95"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.opacity = "1"; }}
    >
      {label}
    </button>
  );
}
