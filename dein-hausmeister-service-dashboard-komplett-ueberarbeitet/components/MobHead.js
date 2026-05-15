"use client";
import { WH, BR, TX, BL, MU } from "../lib/theme";

export default function MobHead({ back, title, right, onBack }) {
  return (
    <div style={{
      background: WH, padding: "10px 14px", display: "flex", alignItems: "center",
      justifyContent: "space-between", borderBottom: `1px solid ${BR}`, flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {back && (
          <span onClick={onBack} style={{ fontSize: 20, cursor: "pointer", color: BL, lineHeight: 1 }}>‹</span>
        )}
        <span style={{ fontWeight: 700, fontSize: 14, color: TX }}>{title}</span>
      </div>
      {right && <span style={{ color: MU, fontSize: 18 }}>{right}</span>}
    </div>
  );
}
