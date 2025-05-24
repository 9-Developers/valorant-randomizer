import type { ReactNode } from "react";
import Image from "next/image";

export default function AgentIcon({
  agent,
  isSelected,
  onClick,
}: Readonly<{
  agent: string;
  isSelected: boolean;
  onClick: () => void;
}>): ReactNode {
  const className =
    "clickable agent " + (isSelected ? "selected" : "unselected");

  return (
    <div className={className} aria-label={agent} onClick={onClick}>
      <Image
        src={"/images/agents/icons/" + agent + ".webp"}
        alt={agent + " icon"}
        style={{ objectFit: "contain" }}
        width={80}
        height={80}
      />
      <div className="agent-name">{agent}</div>
    </div>
  );
}
