import type { Weapon } from "~/data/weapons";
import type { Named } from "~/data/named";

/**
 * Check if a list contains an item.
 *
 * @param item Item to check presence of.
 * @param list List to check.
 * @return true if item is contained in list, otherwise false.
 */
export function contains<T extends Named>(
  item: T,
  list: ReadonlyArray<T>,
): boolean {
  return list.find((element) => element.name === item.name) !== undefined;
}

/**
 * Get the subset of weapons which are affordable with money.
 *
 * @param money Amount of money the user has.
 * @param weapons List of weapons.
 * @returnm The subset of weapons which are affordable with money.
 */
export function getAffordable(
  money: number,
  weapons: ReadonlyArray<Weapon>,
): ReadonlyArray<Weapon> {
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
export function invertMany<T extends Named>(
  items: ReadonlyArray<T>,
  list: ReadonlyArray<T>,
): ReadonlyArray<T> {
  const containsAll: boolean = items.every((item) => contains(item, list));
  const filtered: ReadonlyArray<T> = list.filter(
    (element) => !contains(element, items),
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
export function invertOne<T extends Named>(
  item: T,
  list: ReadonlyArray<T>,
): ReadonlyArray<T> {
  return contains(item, list)
    ? list.filter((element) => element.name !== item.name)
    : [...list, item];
}
