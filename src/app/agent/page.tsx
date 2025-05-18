"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import AgentCategory from "~/app/_components/agent-category";
import { controllers, duelists, initiators, sentinels } from "~/data/agents";

// TODO: Handle case where all agents are unselected.
export default function AgentPage(): ReactNode {
  const [agents, setAgents] = useState([
    ...controllers,
    ...duelists,
    ...initiators,
    ...sentinels,
  ]);
  const [agent, setAgent] = useState(agents[0]);

  // Dumb hack to prevent hydration errors
  useEffect(() => {
    setAgent(agents[Math.floor(Math.random() * agents.length)] ?? "");
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

/* ************************************************************************** *
 *                             Private functions                              *
 * ************************************************************************** */

/**
 * Invert the selection of subset.
 *
 * If all items in the subset are contained within agents, then the subset is removed.
 * Otherwise, the missing items in the subset will be added to agents.
 *
 * @param subset Subset of agents to add or remove.
 * @param agents All selected agents.
 * @return New selection.
 */
function invertSelection(subset: string[], agents: string[]): string[] {
  const containsAll: boolean = subset.every((agent) => agents.includes(agent));
  const filtered: string[] = agents.filter((agent) => !subset.includes(agent));

  if (containsAll) {
    return filtered;
  } else {
    return [...filtered, ...subset];
  }
}

/**
 * Toggle agent selection.
 *
 * If agent is contained in agents then remove it, otherwise add it.
 *
 * @param agent Agent to toggle.
 * @param agents All selected agents.
 * @return New selection.
 */
function toggleAgent(agent: string, agents: string[]): string[] {
  return agents.includes(agent)
    ? agents.filter((a) => a !== agent)
    : [...agents, agent];
}
