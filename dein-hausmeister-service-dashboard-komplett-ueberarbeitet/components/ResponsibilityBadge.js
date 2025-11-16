export default function ResponsibilityBadge({ value }) {
  if (!value) return null;

  const style =
    value === "Hausmeister"
      ? "badge-green"
      : value === "Handwerker"
      ? "badge-blue"
      : "badge-slate";

  return <span className={`badge ${style}`}>{value}</span>;
}
