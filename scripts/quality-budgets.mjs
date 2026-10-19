export function assessBudgets(lhr, budgets) {
  const measured = {
    performance: lhr.categories?.performance?.score * 100,
    accessibility: lhr.categories?.accessibility?.score * 100,
    "best-practices": lhr.categories?.["best-practices"]?.score * 100,
    lcp_ms: lhr.audits?.["largest-contentful-paint"]?.numericValue,
    cls: lhr.audits?.["cumulative-layout-shift"]?.numericValue,
    tbt_ms: lhr.audits?.["total-blocking-time"]?.numericValue,
    page_bytes: lhr.audits?.["total-byte-weight"]?.numericValue,
  };
  const failures = [];
  for (const key of Object.keys(measured)) {
    if (!Object.hasOwn(budgets, key)) failures.push(`${key}: budget missing`);
  }
  for (const [key, limit] of Object.entries(budgets)) {
    const value = measured[key];
    if (!Number.isFinite(limit) || limit < 0)
      failures.push(`${key}: invalid budget`);
    else if (!Number.isFinite(value))
      failures.push(`${key}: measurement missing`);
    else if (
      ["performance", "accessibility", "best-practices"].includes(key)
        ? value < limit
        : value > limit
    )
      failures.push(`${key}: ${value} outside budget ${limit}`);
  }
  return { measured, failures, passed: failures.length === 0 };
}
