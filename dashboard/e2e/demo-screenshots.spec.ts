import { test } from "@playwright/test";
import path from "path";

const OUT = path.join(__dirname, "../demo-screenshots");

test.describe("Demo Screenshots", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("01 – Overview: full dashboard", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `${OUT}/01-overview.png`, fullPage: true });
  });

  test("02 – Overview: KPI metric cards close-up", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const section = page.locator("section").filter({ has: page.locator("#kpi-heading") });
    await section.screenshot({ path: `${OUT}/02-overview-kpi-cards.png` });
  });

  test("03 – Overview: pipeline status columns", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const section = page.locator("section").filter({ has: page.locator("#pipeline-heading") });
    await section.screenshot({ path: `${OUT}/03-overview-pipeline-columns.png` });
  });

  test("04 – Sidebar: pipeline status with last-run dates", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const sidebar = page.getByTestId("sidebar");
    await sidebar.screenshot({ path: `${OUT}/04-sidebar-pipeline-status.png` });
  });

  test("05 – Ads: all ads with pagination", async ({ page }) => {
    await page.goto("/ads");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `${OUT}/05-ads-all-with-pagination.png`, fullPage: true });
  });

  test("06 – Ads: live tab filtered", async ({ page }) => {
    await page.goto("/ads");
    await page.waitForLoadState("networkidle");
    await page.getByTestId("tab-live").click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/06-ads-live-tab.png`, fullPage: true });
  });

  test("07 – Ads: search debounce in action", async ({ page }) => {
    await page.goto("/ads");
    await page.waitForLoadState("networkidle");
    await page.getByTestId("ads-search").fill("summer-sale");
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/07-ads-search-filtered.png`, fullPage: true });
  });

  test("08 – Ads: empty search state", async ({ page }) => {
    await page.goto("/ads");
    await page.waitForLoadState("networkidle");
    await page.getByTestId("ads-search").fill("nonexistent-xyz");
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/08-ads-empty-state.png`, fullPage: true });
  });

  test("09 – Ads: page 2 of pagination", async ({ page }) => {
    await page.goto("/ads");
    await page.waitForLoadState("networkidle");
    await page.getByTestId("pagination-next").click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/09-ads-page-2.png`, fullPage: true });
  });

  test("10 – Briefs: active briefs", async ({ page }) => {
    await page.goto("/briefs");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `${OUT}/10-briefs-active.png`, fullPage: true });
  });

  test("11 – Briefs: templates section (fixed badge)", async ({ page }) => {
    await page.goto("/briefs");
    await page.waitForLoadState("networkidle");
    const templates = page.locator("section").filter({ has: page.locator("#templates-heading") });
    await templates.screenshot({ path: `${OUT}/11-briefs-templates.png` });
  });

  test("12 – Performance: metric summary + charts", async ({ page }) => {
    await page.goto("/performance");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800); // let Recharts hydrate client-side
    await page.screenshot({ path: `${OUT}/12-performance-full.png`, fullPage: true });
  });

  test("13 – Performance: ROAS chart close-up", async ({ page }) => {
    await page.goto("/performance");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);
    const chart = page.getByTestId("roas-chart");
    await chart.screenshot({ path: `${OUT}/13-performance-roas-chart.png` });
  });

  test("14 – Performance: top performers table", async ({ page }) => {
    await page.goto("/performance");
    await page.waitForLoadState("networkidle");
    const table = page.locator("section").filter({ has: page.locator("#top-performers") });
    await table.screenshot({ path: `${OUT}/14-performance-top-performers.png` });
  });

  test("15 – Brand: voice and do/don't examples", async ({ page }) => {
    await page.goto("/brand");
    await page.waitForLoadState("networkidle");
    const voice = page.locator("section").filter({ has: page.locator("#voice-heading") });
    await voice.screenshot({ path: `${OUT}/15-brand-voice.png` });
  });

  test("16 – Brand: persona cards with Create Brief CTA", async ({ page }) => {
    await page.goto("/brand");
    await page.waitForLoadState("networkidle");
    const personas = page.locator("section").filter({ has: page.locator("#personas-heading") });
    await personas.screenshot({ path: `${OUT}/16-brand-personas-with-cta.png` });
  });

  test("17 – Brand: full page", async ({ page }) => {
    await page.goto("/brand");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `${OUT}/17-brand-full.png`, fullPage: true });
  });

  test("18 – Brand CTA: clicking persona links to briefs", async ({ page }) => {
    await page.goto("/brand");
    await page.waitForLoadState("networkidle");
    // Hover the CTA to show interactive state
    await page.getByTestId("persona-brief-cta-the-hustler").hover();
    await page.screenshot({ path: `${OUT}/18-brand-cta-hover.png` });
  });
});
