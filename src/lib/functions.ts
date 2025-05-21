import type { Weapon } from "~/data/weapons";
import type { Named } from "~/data/named";

/**
 * Get the subset of weapons which are affordable with money.
 *
 * @param money Amount of money the user has.
 * @param weapons List of weapons.
 * @returnm The subset of weapons which are affordable with money.
 */
export function getAffordable(money: number, weapons: Weapon[]): Weapon[] {
  return weapons.filter((weapon) => weapon.price <= money);
}

/**
 * Get the image source path for a weapon, or default to Classic.
 *
 * @param weapon Icon to get path for.
 * @return Image source path for a weapon.
 */
export function getImagePath(weapon?: string): string {
  return weapon ? `/images/weapons/${weapon}` : "/images/weapons/Classic.webp";
}

/**
 * Invert the selection of subset.
 *
 * If all items in the subset are contained within selected, then the subset is
 * removed.
 * Otherwise, the missing items in the subset will be added to selection.
 *
 * @param items Items to add or remove.
 * @param list Parent list.
 * @return New selection.
 */
export function invertMany<T extends Named>(items: T[], list: T[]): T[] {
  const containsAll: boolean = items.every(
    (item) => list.find((element) => item.name === element.name) !== undefined,
  );
  const filtered: T[] = list.filter(
    (element) => items.find((item) => element.name === item.name) === undefined,
  );

  if (containsAll) {
    return filtered;
  } else {
    return [...filtered, ...items];
  }
}

/**
 * Toggle item selection.
 *
 * If the item is contained in selected, then remove it, otherwise add it.
 *
 * @param item Item to toggle.
 * @param list Parent list.
 * @return New selection.
 */
export function invertOne<T extends Named>(item: T, list: T[]): T[] {
  return list.find((element) => element.name === item.name) !== undefined
    ? list.filter((element) => element.name !== item.name)
    : [...list, item];
}
