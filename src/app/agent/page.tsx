"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import AgentCategory from "~/app/agent/_components/category";
import {
  controllers,
  duelists,
  initiators,
  noAgentsSelected,
  sentinels,
} from "~/data/agents";
import { invertMany, invertOne } from "~/lib/functions";

export default function AgentPage(): ReactNode {
  const [selected, setSelected] = useState([
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ]);
  const [agent, setAgent] = useState(noAgentsSelected);

  // Dumb hack to prevent hydration errors
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
          <AgentCategory
            selected={selected}
            category="Controllers"
            onAgentClick={(agent) => setSelected(invertOne(agent, selected))}
            onCategoryClick={() =>
              setSelected(invertMany(controllers, selected))
            }
            items={controllers}
          />
          <AgentCategory
            selected={selected}
            category="Duelists"
            onAgentClick={(agent) => setSelected(invertOne(agent, selected))}
            onCategoryClick={() => setSelected(invertMany(duelists, selected))}
            items={duelists}
          />
          <AgentCategory
            selected={selected}
            category="Initiators"
            onAgentClick={(agent) => setSelected(invertOne(agent, selected))}
            onCategoryClick={() =>
              setSelected(invertMany(initiators, selected))
            }
            items={initiators}
          />
          <AgentCategory
            selected={selected}
            category="Sentinels"
            onAgentClick={(agent) => setSelected(invertOne(agent, selected))}
            onCategoryClick={() => setSelected(invertMany(sentinels, selected))}
            items={sentinels}
          />
        </div>
      </div>
    </div>
  );
}
