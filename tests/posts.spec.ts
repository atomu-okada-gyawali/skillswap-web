import { test, expect } from "@playwright/test";

test.describe("Posts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/explore", { waitUntil: "networkidle" });
  });

  test.skip(" Create post form validates required fields", async ({ page }) => {
    await page.getByRole("button", { name: /Create Post/ }).click();
    await expect(
      page.getByRole("heading", { name: "Create New Post" }),
    ).toBeVisible();

    const submitButton = page.locator('button:has-text("Post")').first();
    await submitButton.click();

    await expect(page.getByText("Title is required")).toBeVisible();
    await expect(page.getByText("Description is required")).toBeVisible();
  });

  test.skip("Close button closes create post modal", async ({ page }) => {
    await page.getByRole("button", { name: /Create Post/ }).click();
    await expect(
      page.getByRole("heading", { name: "Create New Post" }),
    ).toBeVisible();

    const closeButton = page.locator('[role="dialog"] button').first();
    await closeButton.click();

    await expect(
      page.getByRole("heading", { name: "Create New Post" }),
    ).not.toBeVisible();
  });
});
