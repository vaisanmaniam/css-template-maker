export default function GlassBackground() {
  return (
    <div className="glass-bg">
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i}>V</span>
      ))}
    </div>
  );
}
