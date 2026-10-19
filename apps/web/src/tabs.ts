import type { KeyboardEvent } from "react";

// One focus stop per tab list. Both arrow axes work when the layout reflows.
export function moveTab(
  event: KeyboardEvent<HTMLButtonElement>,
  ids: string[],
  current: string,
  select: (id: string) => void,
) {
  const index = ids.indexOf(current);
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? ids.length - 1
        : ["ArrowRight", "ArrowDown"].includes(event.key)
          ? (index + 1) % ids.length
          : ["ArrowLeft", "ArrowUp"].includes(event.key)
            ? (index + ids.length - 1) % ids.length
            : -1;
  if (next < 0) return;
  event.preventDefault();
  const buttons =
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
  select(ids[next]);
  buttons?.[next]?.focus();
}
