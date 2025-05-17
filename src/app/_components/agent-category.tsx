import type { ReactNode } from "react";
import AgentIcon from "~/app/_components/agent-icon";

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
      <button onClick={onCategoryClick}>
        <h2>{category}</h2>
      </button>
      <div className="container flex flex-wrap gap-4">
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
