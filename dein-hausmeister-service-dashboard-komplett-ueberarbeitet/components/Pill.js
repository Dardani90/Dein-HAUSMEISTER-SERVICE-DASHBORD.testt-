"use client";
import { statusStyle } from "../lib/theme";

export default function Pill({ s, small }) {
  const { c, bg } = statusStyle(s);
  return (
    <span style={{
      background: bg, color: c, borderRadius: 20,
      padding: small ? "2px 8px" : "3px 11px",
      fontSize: small ? 10 : 11,
      fontWeight: 700,
      whiteSpace: "nowrap",
    }}>
      {s}
    </span>
  );
}
