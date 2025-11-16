const STATUS_STYLES = {
  Eingegangen: "badge-amber",
  "In Bearbeitung": "badge-blue",
  Freigegeben: "badge-green",
  Erledigt: "badge-slate"
};

export default function StatusBadge({ status }) {
  const extra = STATUS_STYLES[status] || "badge-slate";
  return <span className={`badge ${extra}`}>{status}</span>;
}
