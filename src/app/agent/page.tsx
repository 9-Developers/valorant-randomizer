"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import AgentCategory from "~/app/_components/agent-category";
import { controllers, duelists, initiators, sentinels } from "~/data/agents";
import { invertSelection, toggleAgent } from "~/lib/functions";

const noAgentsSelected = "No Agents Selected";

export default function AgentPage(): ReactNode {
  const [agents, setAgents] = useState([
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ]);
  const [agent, setAgent] = useState(noAgentsSelected);

  // Dumb hack to prevent hydration errors
  useEffect(() => {
    setAgent(
      agents[Math.floor(Math.random() * agents.length)] ?? noAgentsSelected,
    );
  }, [agents]);

  return (
    <>
      <p>
        Get a random agent from the list below. All agents are selected by
        default. Click on a heading (Controllers, Duelists, Initiators, or
        Sentinels) to toggle all agents in that category. Click on an individual
        agent to toggle them.
      </p>

      <hr />

      <div className="container flex flex-row gap-4">
        <div className="random-agent">
          <h2 className="text-center">Random agent</h2>
          <h3 className="text-center">{agent}</h3>
          <Image
            src={"/images/agents/portraits/" + agent + ".webp"}
            alt={agent + " portrait"}
            style={{ objectFit: "contain" }}
            height={256}
            width={256}
          />
        </div>

        <div className="agents-select">
          <AgentCategory
            agents={agents}
            category="Controllers"
            onAgentClick={(agent) => setAgents(toggleAgent(agent, agents))}
            onCategoryClick={() =>
              setAgents(invertSelection(controllers, agents))
            }
            subset={controllers}
          />
          <AgentCategory
            agents={agents}
            category="Duelists"
            onAgentClick={(agent) => setAgents(toggleAgent(agent, agents))}
            onCategoryClick={() => setAgents(invertSelection(duelists, agents))}
            subset={duelists}
          />
          <AgentCategory
            agents={agents}
            category="Initiators"
            onAgentClick={(agent) => setAgents(toggleAgent(agent, agents))}
            onCategoryClick={() =>
              setAgents(invertSelection(initiators, agents))
            }
            subset={initiators}
          />
          <AgentCategory
            agents={agents}
            category="Sentinels"
            onAgentClick={(agent) => setAgents(toggleAgent(agent, agents))}
            onCategoryClick={() =>
              setAgents(invertSelection(sentinels, agents))
            }
            subset={sentinels}
          />
        </div>
      </div>
    </>
  );
}
