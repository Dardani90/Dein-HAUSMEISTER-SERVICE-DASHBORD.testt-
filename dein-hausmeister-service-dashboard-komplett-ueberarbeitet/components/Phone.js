import { BG, TX } from "../lib/theme";

export default function Phone({ children, dark }) {
  return (
    <div style={{
      width: 300, height: 620, borderRadius: 40, border: "7px solid #111",
      background: dark ? "#000" : BG, overflow: "hidden", flexShrink: 0,
      boxShadow: "0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column", position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 82, height: 20, background: "#111", borderRadius: "0 0 12px 12px", zIndex: 30,
      }}/>
      <div style={{
        height: 32, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 18px", flexShrink: 0, position: "relative", zIndex: 20,
      }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: dark ? "#fff" : TX, letterSpacing: -0.3 }}>9:41</span>
        <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
          {[5, 8, 11, 14].map((h, i) => (
            <div key={i} style={{
              width: 2.5, height: h, background: dark ? "#fff" : TX,
              borderRadius: 1, opacity: i === 3 ? 0.35 : 1,
            }}/>
          ))}
          <div style={{ width: 2, height: 2 }}/>
          <div style={{
            width: 12, height: 6, border: `1.5px solid ${dark ? "#fff" : TX}`,
            borderRadius: 2, display: "flex", alignItems: "center", paddingLeft: 1,
          }}>
            <div style={{ width: "60%", height: 3.5, background: dark ? "#fff" : TX, borderRadius: 0.5 }}/>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}
