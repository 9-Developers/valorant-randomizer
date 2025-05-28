"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import AgentCategory from "~/app/agent/_components/category";
import MajorButton from "~/app/_components/major-button"
import MinorButton from "~/app/_components/minor-button"
import { agents, noAgentsSelected } from "~/data/agents";
import { contains, invertMany, invertOne } from "~/lib/functions";
import { agentCategories } from "~/data/category";

export default function AgentPage(): ReactNode {
  const [selected, setSelected] = useState(agents);
  const [agent, setAgent] = useState(noAgentsSelected);

  useEffect(() => {
    setAgent(
      selected[Math.floor(Math.random() * selected.length)] ?? noAgentsSelected,
    );
  }, []);

  function rollRandomAgent(
    selected: ReadonlyArray<Agent>,
  ): Agent {
    return selected[Math.floor(Math.random() * selected.length)] ?? noAgentsSelected;
  }

  return (
    <div className="content">
      <p className="info">
        Get a random agent from the list below.
        <br />
        All agents are selected by default. Click on a heading (Controllers,
        Duelists, Initiators, or Sentinels) to toggle all agents in that
        category. Click on an individual agent to toggle them.
        <br />
        Click on the &#34;Random agent&#34; heading to get a new random agent.
      </p>

      <hr />

      <div className="agents">
        <div className="random-agent">
          <MajorButton
            text="Randomize"
            action={() => setAgent(rollRandomAgent(selected))}
          /><br />

          <Image
            src={"/images/agents/portraits/" + agent.name + ".webp"}
            alt={agent.name + " portrait"}
            style={{ objectFit: "contain" }}
            height={256}
            width={256}
          />

          <h3 className="text-center">{agent.name}</h3>
        </div>

        <div className="agents-select">
          {agentCategories.map((category) => (
            <AgentCategory
              key={category.category}
              category={category.category}
              isSelected={(agent) => contains(agent, selected)}
              items={category.items}
              onAgentClick={(agent) => setSelected(invertOne(agent, selected))}
              onCategoryClick={() =>
                setSelected(invertMany(category.items, selected))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
