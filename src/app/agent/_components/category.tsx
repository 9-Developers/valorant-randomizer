import type { ReactNode } from "react";
import AgentIcon from "~/app/agent/_components/icon";

export default function AgentCategory({
  agents,
  category,
  onAgentClick,
  onCategoryClick,
  subset,
}: {
  agents: string[];
  category: string;
  onAgentClick: (agent: string) => void;
  onCategoryClick: () => void;
  subset: string[];
}): ReactNode {
  return (
    <>
      <h2 className="cursor-pointer" onClick={onCategoryClick}>{category}</h2>
      <div className="agent-category">
        {subset.map((agent) => (
          <AgentIcon
            agent={agent}
            key={agent}
            isSelected={agents.includes(agent)}
            onClick={() => onAgentClick(agent)}
          />
        ))}
      </div>
    </>
  );
}
