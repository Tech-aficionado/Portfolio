/**
 * Section eyebrow rendered in hex — `0x01 / About`.
 *
 * The site already numbered its sections; this makes that numbering hex-native
 * so it rhymes with the 0xshiv domain instead of being generic decimal chrome.
 * Server component: no interactivity, so it stays out of the client bundle.
 */
interface HexMarkerProps {
  /** Decimal section index. Converted to two-digit hex (1 -> 01, 12 -> 0C). */
  index: number;
  /** Label shown after the separator, e.g. "About". */
  label: string;
  /** Colour of the significant digits and label. Defaults to the accent. */
  tone?: "accent" | "muted";
  className?: string;
}

export default function HexMarker({
  index,
  label,
  tone = "accent",
  className = "",
}: HexMarkerProps): React.JSX.Element {
  const hex = index.toString(16).toUpperCase().padStart(2, "0");
  const toneClass = tone === "accent" ? "text-accent" : "text-muted";

  return (
    <span className={`hex-marker ${toneClass} ${className}`}>
      {/* aria-hidden: "0x" is a visual/brand device, not information a screen
          reader needs to announce character by character. */}
      <span className="hex-prefix" aria-hidden="true">
        0x
      </span>
      {hex}
      <span className="mx-2 opacity-40" aria-hidden="true">
        /
      </span>
      {label}
    </span>
  );
}
