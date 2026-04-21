import { test, expect } from "@playwright/test";

test.describe("Performance Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/performance");
  });

  test("renders performance page heading", async ({ page }) => {
    await expect(page.getByTestId("performance-page")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Performance" })).toBeVisible();
  });

  test("4 metric cards are present", async ({ page }) => {
    for (const id of ["perf-metric-roas", "perf-metric-ctr", "perf-metric-cpc", "perf-metric-revenue"]) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test("ROAS trend card shows week-over-week percentage", async ({ page }) => {
    const roasCard = page.getByTestId("perf-metric-roas");
    const text = await roasCard.textContent();
    expect(text).toMatch(/[+-]?\d+%.*prev week/);
  });

  test("ROAS chart container is rendered", async ({ page }) => {
    const chart = page.getByTestId("roas-chart");
    await expect(chart).toBeVisible();
  });

  test("CTR & CPC chart container is rendered", async ({ page }) => {
    const chart = page.getByTestId("ctr-cpc-chart");
    await expect(chart).toBeVisible();
  });

  test("ROAS chart has correct heading", async ({ page }) => {
    await expect(page.getByText(/ROAS Trend/i)).toBeVisible();
  });

  test("top performers table is rendered", async ({ page }) => {
    const table = page.getByTestId("top-performers-table");
    await expect(table).toBeVisible();
  });

  test("top performers table has correct column headers", async ({ page }) => {
    const table = page.getByTestId("top-performers-table");
    for (const col of ["Ad ID", "Campaign", "ROAS", "CTR", "CPC", "Spend", "Conversions"]) {
      await expect(table.getByText(col)).toBeVisible();
    }
  });

  test("top performers table shows 3 rows", async ({ page }) => {
    const rows = page.locator('[data-testid^="top-performer-row-"]');
    await expect(rows).toHaveCount(3);
  });

  test("top performer rows contain numeric ROAS values", async ({ page }) => {
    const firstRow = page.getByTestId("top-performer-row-0");
    const text = await firstRow.textContent();
    expect(text).toMatch(/\d+\.\d+x/);
  });

  test("revenue metric card shows dollar and spend", async ({ page }) => {
    const revenueCard = page.getByTestId("perf-metric-revenue");
    const text = await revenueCard.textContent();
    expect(text).toMatch(/\$[\d,]+/);
    expect(text).toContain("Spend");
  });

  // BUG CHECK: Recharts renders SVG in browser even though SSR width=-1 warnings appear
  test("ROAS chart renders an SVG element", async ({ page }) => {
    const chart = page.getByTestId("roas-chart");
    const svg = chart.locator("svg");
    // Wait for client-side hydration
    await page.waitForTimeout(500);
    const svgCount = await svg.count();
    expect(svgCount).toBeGreaterThan(0);
  });

  test("charts have positive dimensions after hydration", async ({ page }) => {
    await page.waitForTimeout(500);
    const chart = page.getByTestId("roas-chart");
    const boundingBox = await chart.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.width).toBeGreaterThan(0);
    expect(boundingBox!.height).toBeGreaterThan(0);
  });
});
