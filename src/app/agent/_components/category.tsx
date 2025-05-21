import type { ReactNode } from "react";
import AgentIcon from "~/app/agent/_components/icon";
import type { Named } from "~/data/named";

export default function AgentCategory({
  category,
  items,
  onAgentClick,
  onCategoryClick,
  selected,
}: Readonly<{
  category: string;
  items: Named[];
  onAgentClick: (agent: Named) => void;
  onCategoryClick: () => void;
  selected: Named[];
}>): ReactNode {
  return (
    <>
      <h2 className="clickable" onClick={onCategoryClick}>
        {category}
      </h2>
      <div className="agent-category">
        {items.map((item) => (
          <AgentIcon
            agent={item.name}
            key={item.name}
            isSelected={
              selected.find((element) => element.name === item.name) !==
              undefined
            }
            onClick={() => onAgentClick(item)}
          />
        ))}
      </div>
    </>
  );
}
