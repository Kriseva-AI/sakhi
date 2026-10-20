import { test, expect } from "@playwright/test";
// Observe the screen at the navigation boundary, then cancel the synthetic exit.
// No external request or message is made.
test("quick exit covers the screen before external navigation", async ({
  page,
}) => {
  await page.addInitScript(() =>
    window.addEventListener("beforeunload", (event) => {
      (window as any).__exitScreen = document.body.innerText;
      event.preventDefault();
      event.returnValue = "";
    }),
  );
  await page.goto("/en-IN/resources");
  page.on("dialog", (dialog) => dialog.dismiss());
  await page
    .getByRole("button", { name: "Open official website" })
    .first()
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Quick exit to Google", exact: true })
    .click({ noWaitAfter: true });
  await expect
    .poll(() => page.evaluate(() => (window as any).__exitScreen))
    .toContain("Notes");
});
