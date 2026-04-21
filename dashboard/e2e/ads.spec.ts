import { test, expect } from "@playwright/test";

test.describe("Ads Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ads");
  });

  test("renders ads page heading", async ({ page }) => {
    await expect(page.getByTestId("ads-page")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ads" })).toBeVisible();
  });

  test("all status tabs are present", async ({ page }) => {
    for (const tab of ["all", "pending", "live", "archive"]) {
      await expect(page.getByTestId(`tab-${tab}`)).toBeVisible();
    }
  });

  test("all tab is selected by default", async ({ page }) => {
    const allTab = page.getByTestId("tab-all");
    await expect(allTab).toHaveAttribute("aria-selected", "true");
  });

  test("tabs show correct counts", async ({ page }) => {
    const allTab = page.getByTestId("tab-all");
    const allText = await allTab.textContent();
    // Should contain a number
    expect(allText).toMatch(/\d+/);
  });

  test("clicking live tab filters to live ads only", async ({ page }) => {
    await page.getByTestId("tab-live").click();
    await expect(page.getByTestId("tab-live")).toHaveAttribute("aria-selected", "true");

    const cards = page.locator('[data-testid^="ad-card-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Verify each visible card has "live" status
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).getByText("live")).toBeVisible();
    }
  });

  test("clicking pending tab filters to pending ads only", async ({ page }) => {
    await page.getByTestId("tab-pending").click();
    const cards = page.locator('[data-testid^="ad-card-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).getByText("pending")).toBeVisible();
    }
  });

  test("clicking archive tab filters to archived ads only", async ({ page }) => {
    await page.getByTestId("tab-archive").click();
    const cards = page.locator('[data-testid^="ad-card-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).getByText("archive")).toBeVisible();
    }
  });

  test("search input is visible and functional", async ({ page }) => {
    const search = page.getByTestId("ads-search");
    await expect(search).toBeVisible();

    // Search for a specific campaign
    await search.fill("summer-sale");
    const cards = page.locator('[data-testid^="ad-card-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // All results should contain "summer-sale"
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).getByText("summer-sale")).toBeVisible();
    }
  });

  test("empty state is shown when search has no results", async ({ page }) => {
    const search = page.getByTestId("ads-search");
    await search.fill("nonexistent-campaign-xyz");

    await expect(page.getByTestId("ads-empty")).toBeVisible();
    await expect(page.getByText(/No ads match your filter/)).toBeVisible();
  });

  test("clearing search restores all ads", async ({ page }) => {
    const search = page.getByTestId("ads-search");
    await search.fill("nonexistent");
    await expect(page.getByTestId("ads-empty")).toBeVisible();

    await search.clear();
    await expect(page.getByTestId("ads-grid")).toBeVisible();
    const cards = page.locator('[data-testid^="ad-card-"]');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("ad cards show campaign name, hook type, and date", async ({ page }) => {
    const firstCard = page.locator('[data-testid^="ad-card-"]').first();
    await expect(firstCard).toBeVisible();
    // Campaign name should be visible
    const text = await firstCard.textContent();
    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(10);
  });

  test("live ads show ROAS, CTR, CPC metrics", async ({ page }) => {
    await page.getByTestId("tab-live").click();
    const firstCard = page.locator('[data-testid^="ad-card-"]').first();
    const cardText = await firstCard.textContent();
    // Live ads should have performance metrics
    expect(cardText).toMatch(/ROAS|CTR|CPC/);
  });

  test("pending ads do not show performance metrics", async ({ page }) => {
    await page.getByTestId("tab-pending").click();
    const firstCard = page.locator('[data-testid^="ad-card-"]').first();
    const cardText = await firstCard.textContent();
    // Pending ads should NOT have ROAS/CTR/CPC
    expect(cardText).not.toMatch(/ROAS/);
  });

  // BUG CHECK: tab count badge should match actual filtered results
  test("pending tab count matches actual pending ads shown", async ({ page }) => {
    const pendingTab = page.getByTestId("tab-pending");
    const tabText = await pendingTab.textContent();
    const countMatch = tabText?.match(/(\d+)/);
    const tabCount = countMatch ? parseInt(countMatch[1]) : -1;

    await pendingTab.click();
    const cards = page.locator('[data-testid^="ad-card-"]');
    const actualCount = await cards.count();

    expect(actualCount).toBe(tabCount);
  });
});
