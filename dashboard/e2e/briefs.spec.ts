import { test, expect } from "@playwright/test";

test.describe("Briefs Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/briefs");
  });

  test("renders briefs page heading", async ({ page }) => {
    await expect(page.getByTestId("briefs-page")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Briefs", exact: true })).toBeVisible();
  });

  test("active briefs section is visible", async ({ page }) => {
    await expect(page.getByText(/Active Briefs/)).toBeVisible();
  });

  test("templates section is visible", async ({ page }) => {
    await expect(page.getByText(/Templates/)).toBeVisible();
  });

  test("active brief cards are rendered", async ({ page }) => {
    const activeBriefs = page.locator('[data-testid^="brief-card-brief-"]');
    const count = await activeBriefs.count();
    expect(count).toBeGreaterThan(0);
  });

  test("brief cards show campaign name", async ({ page }) => {
    const firstBrief = page.locator('[data-testid^="brief-card-"]').first();
    const text = await firstBrief.textContent();
    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(10);
  });

  test("active brief shows objective text", async ({ page }) => {
    // Active briefs contain detailed objective
    const briefCard = page.getByTestId("brief-card-brief-001");
    await expect(briefCard).toBeVisible();
    const text = await briefCard.textContent();
    expect(text).toContain("Acquire");
  });

  test("active brief shows KPI targets", async ({ page }) => {
    const briefCard = page.getByTestId("brief-card-brief-001");
    const text = await briefCard.textContent();
    expect(text).toMatch(/ROAS/);
    expect(text).toMatch(/CTR/);
    expect(text).toMatch(/CPC/);
  });

  test("active brief shows target audience", async ({ page }) => {
    const briefCard = page.getByTestId("brief-card-brief-001");
    await expect(briefCard.getByText(/Target Audience/i)).toBeVisible();
  });

  test("brief hooks are rendered as a list", async ({ page }) => {
    const hooksSection = page.getByTestId("brief-hooks-brief-001");
    await expect(hooksSection).toBeVisible();
    const items = hooksSection.locator("li");
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test("template briefs show template badge", async ({ page }) => {
    const templateCard = page.getByTestId("brief-card-brief-tpl-001");
    await expect(templateCard).toBeVisible();
    // Badge uses lowercase "template" — use exact + span locator to avoid matching subtitle
    await expect(templateCard.locator("span").getByText("template", { exact: true })).toBeVisible();
  });

  test("active brief shows active badge", async ({ page }) => {
    const briefCard = page.getByTestId("brief-card-brief-001");
    await expect(briefCard.getByText("active")).toBeVisible();
  });

  // BUG CHECK: FORGE run date should only appear when present
  test("brief with forge run shows run date", async ({ page }) => {
    const briefCard = page.getByTestId("brief-card-brief-001");
    await expect(briefCard.getByText(/Last FORGE run/)).toBeVisible();
  });

  test("brief without forge run does not show run date label", async ({ page }) => {
    const briefCard = page.getByTestId("brief-card-brief-002");
    const text = await briefCard.textContent();
    expect(text).not.toContain("Last FORGE run");
  });
});
