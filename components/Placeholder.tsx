// Illustrated stand-ins for photos the client hasn't supplied yet.
// Replace each with next/image once real photos are in /public/images.

type Art = "terraces" | "stream" | "trees" | "pit";

export default function Placeholder({ art, label, className = "" }: { art: Art; label: string; className?: string }) {
  return (
    <div className={`ph ph-${art} ${className}`} role="img" aria-label={`Photo placeholder: ${label}`}>
      <em>[{label}]</em>
    </div>
  );
}
