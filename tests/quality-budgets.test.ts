import { it, expect } from "vitest";
import { assessBudgets } from "../scripts/quality-budgets.mjs";
const budget = {
  performance: 90,
  accessibility: 95,
  "best-practices": 95,
  lcp_ms: 3000,
  cls: 0.1,
  tbt_ms: 300,
  page_bytes: 1500000,
};
const measured = () => ({
  categories: {
    performance: { score: 0.97 },
    accessibility: { score: 1 },
    "best-practices": { score: 1 },
  },
  audits: {
    "largest-contentful-paint": { numericValue: 2300 },
    "cumulative-layout-shift": { numericValue: 0 },
    "total-blocking-time": { numericValue: 10 },
    "total-byte-weight": { numericValue: 700000 },
  },
});
it("permits a measured build within the declared budgets", () =>
  expect(assessBudgets(measured(), budget).passed).toBe(true));
it("blocks a low accessibility score", () => {
  const lhr = measured();
  lhr.categories.accessibility.score = 0.94;
  expect(assessBudgets(lhr, budget).passed).toBe(false);
});
it("blocks slow or overweight builds", () => {
  const lhr = measured();
  lhr.audits["largest-contentful-paint"].numericValue = 3100;
  lhr.audits["total-byte-weight"].numericValue = 1600000;
  expect(assessBudgets(lhr, budget).failures).toHaveLength(2);
});
it("fails closed when measurements are absent", () =>
  expect(assessBudgets({}, budget).failures).toHaveLength(7));
it("does not silently disable the gate when budget configuration is incomplete", () =>
  expect(assessBudgets(measured(), {}).failures).toHaveLength(7));
it("rejects a nonnumeric budget instead of treating it as passing", () =>
  expect(assessBudgets(measured(), { ...budget, lcp_ms: NaN }).passed).toBe(
    false,
  ));
