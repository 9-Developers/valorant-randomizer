import type { ReactNode } from "react";
import Image from "next/image";

export default function AgentIcon({
  agent,
}: Readonly<{ agent: string }>): ReactNode {
  return (
    // TODO: Is inline-block needed here?
    <div className="inline-block">
      <Image
        src={"/images/agents/icons/" + agent + ".webp"}
        alt={agent}
        style={{ objectFit: "contain" }}
        width={80}
        height={80}
      />
      <span>
        {agent}
      </span>
    </div>
  );
}
