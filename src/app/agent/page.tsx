import type { ReactNode } from "react";
import AgentIcon from "~/app/_components/agent-icon";
import { controllers, duelists, initiators, sentinels } from "~/data/agents";

export default function AgentPage(): ReactNode {
  return (
    <>
      <h2>Controllers</h2>
      <div className="container flex flex-wrap gap-4">
        {controllers.map((controller) => (<AgentIcon agent={controller} key={controller} />))}
      </div>

      <h2>Duelists</h2>
      <div className="container flex flex-wrap gap-4">
        {duelists.map((duelist) => (<AgentIcon agent={duelist} key={duelist} />))}
      </div>

      <h2>Initiators</h2>
      <div className="container flex flex-wrap gap-4">
        {initiators.map((initiator) => (<AgentIcon agent={initiator} key={initiator} />))}
      </div>

      <h2>Sentinels</h2>
      <div className="container flex flex-wrap gap-4">
        {sentinels.map((sentinel) => (<AgentIcon agent={sentinel} key={sentinel} />))}
      </div>
    </>
  );
}
