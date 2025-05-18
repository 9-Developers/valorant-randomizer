/**
 * Get the image source path for a weapon, or default to Classic.
 *
 * @param weapon Weapon to get path for.
 * @return Image source path for a weapon.
 */
export function getImagePath(weapon?: string): string {
  return weapon ? `/images/weapons/${weapon}` : "/images/weapons/Classic.webp";
}

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
export function invertSelection(subset: string[], agents: string[]): string[] {
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
 * If the agent is contained in agents, then remove it, otherwise add it.
 *
 * @param agent Agent to toggle.
 * @param agents All selected agents.
 * @return New selection.
 */
export function toggleAgent(agent: string, agents: string[]): string[] {
  return agents.includes(agent)
    ? agents.filter((a) => a !== agent)
    : [...agents, agent];
}
