import { WH, BR, TX, BG, MU, GR } from "../lib/theme";

export default function WebBar({ title, avatar }) {
  return (
    <div style={{
      height: 52, background: WH, borderBottom: `1px solid ${BR}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 22px", flexShrink: 0,
    }}>
      <div style={{ color: TX, fontWeight: 700, fontSize: 15 }}>{title}</div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{
          background: BG, border: `1px solid ${BR}`, borderRadius: 8,
          padding: "5px 12px", fontSize: 11, color: MU, cursor: "pointer",
        }}>🔔</div>
        <div style={{
          width: 30, height: 30, borderRadius: 99, background: GR,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 12, fontWeight: 800,
        }}>{avatar}</div>
      </div>
    </div>
  );
}
