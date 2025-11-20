import { test, expect } from '@playwright/test';

test('navigation to trades route', async ({ page }) => {
  await page.goto('http://localhost:5173/trade-assignment/');

  await expect(page).toHaveTitle(/Trade Assignment/);

  // Click the get started link.
  await page.getByRole('link', { name: 'TRADES' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('Trade List')).toBeVisible();
});

test('edit existing trade information', async ({ page }) => {
  await page.goto('http://localhost:5173/trade-assignment/');

  await page.getByRole('link', { name: 'TRADES' }).click();

  await page.getByRole('button', { name: 'EDIT' }).nth(2).click();

  await page
    .getByRole('textbox', { name: 'CounterParty Id' })
    .fill('CP-EDITED');
  await page.getByRole('textbox', { name: 'Book Id' }).fill('BB-EDITED');

  await page.getByRole('button', { name: 'Update' }).click();

  // Verify that the new trade appears in the trade list
  await expect(page.getByText('CP-EDITED')).toBeVisible();
  await expect(page.getByText('BB-EDITED')).toBeVisible();
});

test('delete existing trade information', async ({ page }) => {
  await page.goto('http://localhost:5173/trade-assignment/');

  await page.getByRole('link', { name: 'TRADES' }).click();

  await page.getByRole('button', { name: 'DELETE' }).nth(2).click();

  await page.getByRole('button', { name: 'Ok' }).click();

  // Verify that the new trade appears in the trade list
  await expect(page.getByText('CP-EDITED')).not.toBeVisible();
  await expect(page.getByText('BB-EDITED')).not.toBeVisible();
});
