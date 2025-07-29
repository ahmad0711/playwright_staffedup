import { test, expect } from '@playwright/test';

test('Open StaffedUp Dev homepage and verify title', async ({ page }) => {
  // Go to Dev environment
  await page.goto('https://wpdev.staffedup.com/');  // replace if exact dev URL is different

  // Verify title contains 'StaffedUp'
  await expect(page).toHaveTitle(/StaffedUp/);

  // Verify "Sign Up" button is visible
//   await expect(page.locator('text=Sign Up')).toBeVisible();
});
