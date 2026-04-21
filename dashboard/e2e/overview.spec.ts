import { test, expect } from "@playwright/test";

test.describe("Overview Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders overview page with heading", async ({ page }) => {
    await expect(page.getByTestId("overview-page")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  });

  test("all 8 metric cards are visible", async ({ page }) => {
    const metricIds = [
      "metric-roas",
      "metric-ctr",
      "metric-cpc",
      "metric-pending",
      "metric-spend",
      "metric-revenue",
      "metric-new-creatives",
      "metric-ads-running",
    ];
    for (const id of metricIds) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("ROAS metric card shows a numeric value", async ({ page }) => {
    const roasCard = page.getByTestId("metric-roas");
    const text = await roasCard.textContent();
    expect(text).toMatch(/\d+\.\d+x/);
  });

  test("CPC metric card shows a dollar value", async ({ page }) => {
    const cpcCard = page.getByTestId("metric-cpc");
    const text = await cpcCard.textContent();
    expect(text).toMatch(/\$\d+\.\d+/);
  });

  test("CTR metric card shows a percentage value", async ({ page }) => {
    const ctrCard = page.getByTestId("metric-ctr");
    const text = await ctrCard.textContent();
    expect(text).toMatch(/\d+\.\d+%/);
  });

  test("pipeline section shows pending, live, and top winner columns", async ({ page }) => {
    await expect(page.getByText(/Pending \(\d+\)/)).toBeVisible();
    await expect(page.getByText(/Live \(\d+\)/)).toBeVisible();
    await expect(page.getByText("Top Winner")).toBeVisible();
  });

  test("ad cards are shown in pipeline columns", async ({ page }) => {
    const adCards = page.locator('[data-testid^="ad-card-"]');
    const count = await adCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("view all ads link navigates to /ads", async ({ page }) => {
    await page.getByRole("link", { name: /View all ads/i }).click();
    await expect(page).toHaveURL("/ads");
  });

  test("metric cards show target values", async ({ page }) => {
    const roasCard = page.getByTestId("metric-roas");
    await expect(roasCard.getByText(/Target:/)).toBeVisible();
  });

  // BUG TEST: Check that spend and revenue show correct dollar formatting
  test("spend and revenue metrics display currency correctly", async ({ page }) => {
    const spend = page.getByTestId("metric-spend");
    const revenue = page.getByTestId("metric-revenue");
    const spendText = await spend.textContent();
    const revenueText = await revenue.textContent();
    expect(spendText).toMatch(/\$[\d,]+/);
    expect(revenueText).toMatch(/\$[\d,]+/);
  });
});
