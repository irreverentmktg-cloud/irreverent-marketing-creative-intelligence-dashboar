import { test, expect } from "@playwright/test";

test.describe("Brand Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/brand");
  });

  test("renders brand page heading", async ({ page }) => {
    await expect(page.getByTestId("brand-page")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Brand", exact: true })).toBeVisible();
  });

  test("brand voice section is visible", async ({ page }) => {
    await expect(page.getByText(/Brand Voice/i)).toBeVisible();
  });

  test("tone attributes section shows attributes", async ({ page }) => {
    // Tone attribute badges are inside the Tone Attributes section
    const toneSection = page.locator("div").filter({ has: page.getByText("Tone Attributes") }).first();
    await expect(toneSection.getByText("Bold", { exact: true })).toBeVisible();
    await expect(toneSection.getByText("Direct", { exact: true })).toBeVisible();
    await expect(toneSection.getByText("Irreverent", { exact: true })).toBeVisible();
    await expect(toneSection.getByText("Results-focused", { exact: true })).toBeVisible();
  });

  test("avoid section shows items to avoid", async ({ page }) => {
    await expect(page.getByText("Corporate jargon")).toBeVisible();
    await expect(page.getByText("Passive voice")).toBeVisible();
  });

  test("do/don't examples are rendered", async ({ page }) => {
    const examples = page.getByTestId("dos-donts");
    await expect(examples).toBeVisible();
    const items = examples.locator("div");
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test("3 persona cards are rendered", async ({ page }) => {
    const grid = page.getByTestId("personas-grid");
    await expect(grid).toBeVisible();
    const cards = grid.locator('[data-testid^="persona-"]');
    await expect(cards).toHaveCount(3);
  });

  test("Hustler persona card is visible", async ({ page }) => {
    const card = page.getByTestId("persona-the-hustler");
    await expect(card).toBeVisible();
    await expect(card.getByText("The Hustler")).toBeVisible();
  });

  test("Operator persona card is visible", async ({ page }) => {
    const card = page.getByTestId("persona-the-operator");
    await expect(card).toBeVisible();
    await expect(card.getByText("The Operator")).toBeVisible();
  });

  test("Creator persona card is visible", async ({ page }) => {
    const card = page.getByTestId("persona-the-creator");
    await expect(card).toBeVisible();
    await expect(card.getByText("The Creator")).toBeVisible();
  });

  test("each persona shows age range", async ({ page }) => {
    await expect(page.getByText("Age 28–38")).toBeVisible();
    await expect(page.getByText("Age 35–50")).toBeVisible();
    await expect(page.getByText("Age 22–32")).toBeVisible();
  });

  test("each persona shows trigger tags", async ({ page }) => {
    await expect(page.getByText("ROAS numbers")).toBeVisible();
    await expect(page.getByText("Industry benchmarks")).toBeVisible();
    await expect(page.getByText("Easy setup")).toBeVisible();
  });

  test("personas show platform badges", async ({ page }) => {
    // Meta appears in multiple personas
    const metaBadges = page.getByText("Meta");
    const count = await metaBadges.count();
    expect(count).toBeGreaterThan(1);
  });

  // BUG CHECK: Do/don't section contains both positive and negative examples
  test("do/don't section has both green (do) and red (don't) items", async ({ page }) => {
    const examples = page.getByTestId("dos-donts");
    // Check for a known "do" copy
    await expect(examples.getByText(/competitors are already/)).toBeVisible();
    // Check for a known "don't" copy
    await expect(examples.getByText(/comprehensive solution/)).toBeVisible();
  });
});
