import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("sidebar is present on every page", async ({ page }) => {
    const routes = ["/", "/ads", "/briefs", "/performance", "/brand"];
    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByTestId("sidebar")).toBeVisible();
    }
  });

  test("all nav links are present in sidebar", async ({ page }) => {
    await page.goto("/");
    const links = ["overview", "ads", "briefs", "performance", "brand"];
    for (const link of links) {
      await expect(page.getByTestId(`nav-${link}`)).toBeVisible();
    }
  });

  test("active nav link is highlighted on each page", async ({ page }) => {
    const routes: { href: string; testId: string }[] = [
      { href: "/", testId: "nav-overview" },
      { href: "/ads", testId: "nav-ads" },
      { href: "/briefs", testId: "nav-briefs" },
      { href: "/performance", testId: "nav-performance" },
      { href: "/brand", testId: "nav-brand" },
    ];
    for (const { href, testId } of routes) {
      await page.goto(href);
      const link = page.getByTestId(testId);
      await expect(link).toHaveAttribute("aria-current", "page");
    }
  });

  test("clicking sidebar nav links navigates correctly", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("nav-ads").click();
    await expect(page).toHaveURL("/ads");
    await page.getByTestId("nav-performance").click();
    await expect(page).toHaveURL("/performance");
    await page.getByTestId("nav-briefs").click();
    await expect(page).toHaveURL("/briefs");
    await page.getByTestId("nav-brand").click();
    await expect(page).toHaveURL("/brand");
    await page.getByTestId("nav-overview").click();
    await expect(page).toHaveURL("/");
  });

  test("pipeline status section is visible in sidebar", async ({ page }) => {
    await page.goto("/");
    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar.getByText("Pipeline Status")).toBeVisible();
    await expect(sidebar.getByText("SCRAPER")).toBeVisible();
    await expect(sidebar.getByText("FORGE")).toBeVisible();
    await expect(sidebar.getByText("PUBLISHER")).toBeVisible();
    await expect(sidebar.getByText("LOOPER")).toBeVisible();
  });

  test("page title is set correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Creative Intelligence Dashboard/);
  });

  // IMPROVEMENT VERIFIED: LOOPER shows last-run date
  test("each pipeline tool shows a last-run date", async ({ page }) => {
    await page.goto("/");
    for (const tool of ["scraper", "forge", "publisher", "looper"]) {
      const lastRun = page.getByTestId(`pipeline-lastrun-${tool}`);
      await expect(lastRun).toBeVisible();
      const text = await lastRun.textContent();
      expect(text).toMatch(/Last run \d{4}-\d{2}-\d{2}/);
    }
  });

  test("LOOPER shows idle status badge", async ({ page }) => {
    await page.goto("/");
    const sidebar = page.getByTestId("sidebar");
    // LOOPER is set to idle (ok: false)
    const looperSection = sidebar.locator("div").filter({ hasText: "LOOPER" }).first();
    await expect(looperSection.getByText("idle")).toBeVisible();
  });

  test("active pipeline tools show active status badge", async ({ page }) => {
    await page.goto("/");
    const sidebar = page.getByTestId("sidebar");
    // At least one "active" badge exists (SCRAPER/FORGE/PUBLISHER are all active)
    await expect(sidebar.getByText("active").first()).toBeVisible();
  });
});
