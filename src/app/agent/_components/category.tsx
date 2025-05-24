import type { ReactNode } from "react";
import AgentIcon from "~/app/agent/_components/icon";
import type { Named } from "~/data/named";

export default function AgentCategory({
  category,
  isSelected,
  items,
  onAgentClick,
  onCategoryClick,
}: Readonly<{
  category: string;
  isSelected: (weapon: Named) => boolean;
  items: ReadonlyArray<Named>;
  onAgentClick: (agent: Named) => void;
  onCategoryClick: () => void;
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
            isSelected={isSelected(item)}
            onClick={() => onAgentClick(item)}
          />
        ))}
      </div>
    </>
  );
}
