import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SignupEmployerPage } from '../pages/signupEmployer.page';
import employerData from '../fixtures/employerData.json';

test.describe('Employer Signup Flows', () => {
  test.describe.configure({ mode: 'serial' });

  test('Simple Signup - Valid Data', async ({ page, baseURL }) => {
    const home = new HomePage(page);
    const signup = new SignupEmployerPage(page);

    await home.openHome(baseURL);
    await home.startEmployerSimpleSignup();
    await signup.fillForm(employerData.simple);
    await signup.verifySignupSuccess();
  });

  test('Pricing Signup - Starter Plan', async ({ page, baseURL }) => {
    const home = new HomePage(page);
    const signup = new SignupEmployerPage(page);

    await home.openHome(baseURL);
    await home.startEmployerPricingSignup('starter');
    await signup.fillForm(employerData.plans.starter);
    await signup.verifySignupSuccess();
  });

  test('Pricing Signup - Smarter Plan', async ({ page, baseURL }) => {
    const home = new HomePage(page);
    const signup = new SignupEmployerPage(page);

    await home.openHome(baseURL);
    await home.startEmployerPricingSignup('smarter');
    await signup.fillForm(employerData.plans.smarter);
    await signup.verifySignupSuccess();
  });

  test('Pricing Signup - Pro Plan', async ({ page, baseURL }) => {
    const home = new HomePage(page);
    const signup = new SignupEmployerPage(page);

    await home.openHome(baseURL);
    await home.startEmployerPricingSignup('pro');
    await signup.fillForm(employerData.plans.pro);
    await signup.verifySignupSuccess();
  });

  test('Invalid Signup - Invalid Email', async ({ page, baseURL }) => {
    const home = new HomePage(page);
    const signup = new SignupEmployerPage(page);

    await home.openHome(baseURL);
    await home.startEmployerSimpleSignup();
    await signup.fillForm(employerData.invalid.invalidEmail);
    await signup.verifyError('Users must have a valid email address'); // Update according to actual validation text
  });

});
