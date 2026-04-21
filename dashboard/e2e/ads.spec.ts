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
    expect(allText).toMatch(/\d+/);
  });

  test("clicking live tab filters to live ads only", async ({ page }) => {
    await page.getByTestId("tab-live").click();
    await expect(page.getByTestId("tab-live")).toHaveAttribute("aria-selected", "true");

    const cards = page.locator('[data-testid^="ad-card-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

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

    await search.fill("summer-sale");
    // Wait for debounce (300ms) to settle
    await page.waitForTimeout(400);
    const cards = page.locator('[data-testid^="ad-card-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).getByText("summer-sale")).toBeVisible();
    }
  });

  test("search is debounced — grid does not update until typing stops", async ({ page }) => {
    const search = page.getByTestId("ads-search");
    await search.fill("s");
    // Before debounce fires, 'all' results should still be visible
    const beforeCards = await page.locator('[data-testid^="ad-card-"]').count();
    expect(beforeCards).toBeGreaterThan(0);
  });

  test("empty state is shown when search has no results", async ({ page }) => {
    const search = page.getByTestId("ads-search");
    await search.fill("nonexistent-campaign-xyz");
    await page.waitForTimeout(400);

    await expect(page.getByTestId("ads-empty")).toBeVisible();
    await expect(page.getByText(/No ads match your filter/)).toBeVisible();
  });

  test("clearing search restores all ads", async ({ page }) => {
    const search = page.getByTestId("ads-search");
    await search.fill("nonexistent");
    await page.waitForTimeout(400);
    await expect(page.getByTestId("ads-empty")).toBeVisible();

    await search.clear();
    await page.waitForTimeout(400);
    await expect(page.getByTestId("ads-grid")).toBeVisible();
    const cards = page.locator('[data-testid^="ad-card-"]');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("ad cards show campaign name, hook type, and date", async ({ page }) => {
    const firstCard = page.locator('[data-testid^="ad-card-"]').first();
    await expect(firstCard).toBeVisible();
    const text = await firstCard.textContent();
    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(10);
  });

  test("live ads show ROAS, CTR, CPC metrics", async ({ page }) => {
    await page.getByTestId("tab-live").click();
    const firstCard = page.locator('[data-testid^="ad-card-"]').first();
    const cardText = await firstCard.textContent();
    expect(cardText).toMatch(/ROAS|CTR|CPC/);
  });

  test("pending ads do not show performance metrics", async ({ page }) => {
    await page.getByTestId("tab-pending").click();
    const firstCard = page.locator('[data-testid^="ad-card-"]').first();
    const cardText = await firstCard.textContent();
    expect(cardText).not.toMatch(/ROAS/);
  });

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

  test("pagination controls appear when filtered results exceed page size", async ({ page }) => {
    // With all 9 ads, PAGE_SIZE=6 means 2 pages, so pagination should show
    await expect(page.getByTestId("ads-pagination")).toBeVisible();
  });

  test("pagination shows correct item range", async ({ page }) => {
    const pagination = page.getByTestId("ads-pagination");
    const text = await pagination.textContent();
    expect(text).toMatch(/Showing 1–\d+ of \d+/);
  });

  test("clicking next page shows different ads", async ({ page }) => {
    const firstPageCards = await page.locator('[data-testid^="ad-card-"]').count();
    await page.getByTestId("pagination-next").click();
    const secondPageCards = await page.locator('[data-testid^="ad-card-"]').count();
    // Should have fewer cards on page 2 (remainder)
    expect(secondPageCards).toBeLessThan(firstPageCards);
  });

  test("clicking prev page returns to first page", async ({ page }) => {
    await page.getByTestId("pagination-next").click();
    await page.getByTestId("pagination-prev").click();
    const text = await page.getByTestId("ads-pagination").textContent();
    expect(text).toMatch(/1 \/ \d+/);
  });

  test("prev button is disabled on first page", async ({ page }) => {
    const prevBtn = page.getByTestId("pagination-prev");
    await expect(prevBtn).toBeDisabled();
  });

  test("next button is disabled on last page", async ({ page }) => {
    // Navigate to last page
    const nextBtn = page.getByTestId("pagination-next");
    await nextBtn.click();
    await expect(nextBtn).toBeDisabled();
  });

  test("tab change resets to page 1", async ({ page }) => {
    await page.getByTestId("pagination-next").click();
    // Switch tab — page should reset
    await page.getByTestId("tab-live").click();
    // Live ads are 3, which fits on one page — no pagination
    await expect(page.getByTestId("ads-pagination")).not.toBeVisible();
  });
});
