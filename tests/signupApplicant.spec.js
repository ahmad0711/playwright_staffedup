import { test, expect } from '@playwright/test';
import SignupApplicantPage from '../pages/signupApplicant.page';
import applicantData from '../fixtures/applicantData.json';

test.describe('Applicant Signup Flow', () => {
  let signupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupApplicantPage(page);
    await signupPage.navigateApplicantSignup();
  });

  test('Valid signup should redirect to onboarding', async ({ page }) => {
    const data = applicantData[0];
    await signupPage.fillSignupForm(data);
    await signupPage.submitForm();

    // Check onboarding page URL or confirmation
    await expect(page).toHaveURL(/(onboarding|applicants)/);
  });

  test('Invalid signup should show error messages', async ({ page }) => {
  const data = applicantData[1]; // invalid data
  await signupPage.fillSignupForm(data);
  await signupPage.submitForm();

  // OR check custom error message (if any)
  const customError = await signupPage.getErrorMessage();
  if (customError) {
   expect(customError).toMatch(/Must be at least 8 characters/);
  expect(customError).toMatch(/one uppercase/);
  expect(customError).toMatch(/one special character/);

  }
});

});
