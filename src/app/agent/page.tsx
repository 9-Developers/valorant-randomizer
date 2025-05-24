"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import AgentCategory from "~/app/agent/_components/category";
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
  }, [selected]);

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
          <h2
            className="clickable text-center"
            onClick={() =>
              setAgent(
                selected[Math.floor(Math.random() * selected.length)] ??
                  noAgentsSelected,
              )
            }
          >
            Random agent
          </h2>
          <h3 className="text-center">{agent.name}</h3>
          <Image
            src={"/images/agents/portraits/" + agent.name + ".webp"}
            alt={agent.name + " portrait"}
            style={{ objectFit: "contain" }}
            height={256}
            width={256}
          />
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
