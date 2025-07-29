import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import credentials from '../fixtures/credentials.json';

const BASE_URL = 'https://wpdev.staffedup.com/';

test.describe('Login from homepage popup', () => {
  
  test('Valid login - Admin', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHome(BASE_URL);
    await homePage.openLoginPopup();
    await homePage.login(credentials.admin.email, credentials.admin.password);
    await expect(page).toHaveURL(/\/admin\//);
  });

  test('Valid login - Enterprise', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHome(BASE_URL);
    await homePage.openLoginPopup();
    await homePage.login(credentials.enterprise.email, credentials.enterprise.password);
    await expect(page).toHaveURL(/\/enterprise\//);
  });

  test('Valid login - Employer', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHome(BASE_URL);
    await homePage.openLoginPopup();
    await homePage.login(credentials.employer.email, credentials.employer.password);
    await expect(page).toHaveURL(/\/dashboard\//);
  });

  test('Valid login - Applicant', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHome(BASE_URL);
    await homePage.openLoginPopup();
    await homePage.login(credentials.applicant.email, credentials.applicant.password);
    await expect(page).toHaveURL(/\/applicants\//);
  });

  test('Invalid login - wrong credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHome(BASE_URL);
    await homePage.openLoginPopup();
    await homePage.login(credentials.invalid.email, credentials.invalid.password);
    await expect(homePage.errorMessage).toBeVisible();
  });

});
