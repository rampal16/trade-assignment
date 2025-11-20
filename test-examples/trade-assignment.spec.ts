import { test, expect } from '@playwright/test';

test('navigation to trades route', async ({ page }) => {
  await page.goto('http://localhost:5173/trade-assignment/');

  await expect(page).toHaveTitle(/Trade Assignment/);

  // Click the get started link.
  await page.getByRole('link', { name: 'TRADES' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('Trade List')).toBeVisible();
});

test('add new trade to the list', async ({ page }) => {
  await page.goto('http://localhost:5173/trade-assignment/');

  await page.getByRole('link', { name: 'TRADES' }).click();

  await page.getByRole('button', { name: 'ADD NEW TRADE' }).click();

  await page.getByRole('textbox', { name: 'Trade Id' }).fill('T12345');
  await page.getByRole('textbox', { name: 'Version' }).fill('55');
  await page.getByRole('textbox', { name: 'CounterParty Id' }).fill('CP22');
  await page.getByRole('textbox', { name: 'Book Id' }).fill('BB11');

  await page.getByTestId('CalendarIcon').nth(0).click();
  await page.getByRole('gridcell', { name: '22' }).click();

  await page.waitForTimeout(4000);

  await page.getByTestId('CalendarIcon').nth(1).click();
  await page.getByRole('gridcell', { name: '28' }).click();

  await page.getByRole('textbox', { name: 'Expired' }).fill('Y');

  await page.getByRole('button', { name: 'Save' }).click();

  // Verify that the new trade appears in the trade list
  await expect(page.getByText('T12345')).toBeVisible();
  await expect(page.getByText('CP22')).toBeVisible();
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
