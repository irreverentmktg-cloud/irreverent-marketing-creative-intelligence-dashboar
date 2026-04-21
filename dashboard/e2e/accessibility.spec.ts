import { test, expect } from "@playwright/test";

test.describe("Accessibility & UX", () => {
  test("all pages have exactly one h1", async ({ page }) => {
    const routes = ["/", "/ads", "/briefs", "/performance", "/brand"];
    for (const route of routes) {
      await page.goto(route);
      const h1s = page.locator("h1");
      await expect(h1s).toHaveCount(1);
    }
  });

  test("main navigation has aria-label", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();
  });

  test("metric cards on overview have accessible section labels", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#kpi-heading")).toBeVisible();
    await expect(page.locator("#spend-heading")).toBeVisible();
  });

  test("pages have accessible landmark sections", async ({ page }) => {
    await page.goto("/");
    // main content area
    await expect(page.getByTestId("main-content")).toBeVisible();
    // sidebar
    await expect(page.locator("aside")).toBeVisible();
  });

  test("ad status tabs have correct role attributes", async ({ page }) => {
    await page.goto("/ads");
    const tabList = page.locator('[role="tablist"]');
    await expect(tabList).toBeVisible();
    const tabs = page.locator('[role="tab"]');
    const count = await tabs.count();
    expect(count).toBe(4);
  });

  test("active tab has aria-selected=true", async ({ page }) => {
    await page.goto("/ads");
    const activeTab = page.locator('[role="tab"][aria-selected="true"]');
    await expect(activeTab).toHaveCount(1);
  });

  test("active nav item has aria-current=page", async ({ page }) => {
    await page.goto("/ads");
    const currentLink = page.locator('[aria-current="page"]');
    await expect(currentLink).toHaveCount(1);
    const text = await currentLink.textContent();
    expect(text).toContain("Ads");
  });

  test("briefs page sections have labeled headings", async ({ page }) => {
    await page.goto("/briefs");
    await expect(page.locator("#active-briefs")).toBeVisible();
    await expect(page.locator("#templates-heading")).toBeVisible();
  });

  test("performance page chart sections have headings", async ({ page }) => {
    await page.goto("/performance");
    await expect(page.locator("#roas-chart-heading")).toBeVisible();
    await expect(page.locator("#ctr-cpc-chart-heading")).toBeVisible();
  });

  // IMPROVEMENT AREA: Test keyboard navigation
  test("nav links are keyboard focusable", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    // At least the first focusable element should exist
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
  });

  // IMPROVEMENT AREA: Check for meaningful alt text on images/icons
  test("sidebar brand icon has accessible text nearby", async ({ page }) => {
    await page.goto("/");
    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar.getByText("Creative")).toBeVisible();
  });
});
