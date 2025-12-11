/**
 * Filters out event handler properties (those starting with "on") from an object.
 * This prevents CSP violations when spreading props onto HTML elements in Svelte 5,
 * as Svelte would otherwise convert them to inline event handlers.
 *
 * @param props - The props object to filter
 * @returns A new object with event handlers removed
 *
 * Note: The return type is Partial<T> because we cannot statically determine at compile
 * time which keys start with "on". This is a pragmatic choice that provides type safety
 * when spreading the result onto HTML elements.
 */
export function filterEventHandlers<T extends Record<string, unknown>>(
  props: T,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !key.startsWith("on")),
  ) as Partial<T>;
}
