import { expect } from '@playwright/test';

export class SignupEmployerPage {
  constructor(page) {
    this.page = page;

    // --- Employer Signup Page Locators ---
    this.fullNameField = page.locator("//input[@id='signupName']");
    this.emailField = page.locator("//input[@id='signupEmail']");

    // Business name input
    this.businessNameField = page.locator("//input[@id='signupBusiness']");

    // First Google Places suggestion
    this.businessDropdownFirstItem = page.locator("(//div[contains(@class,'pac-item')])[1]");

    // Auto-filled business address
    this.businessAddressField = page.locator("//input[@id='signupAddress']");

    this.passwordField = page.locator("//input[@id='signuppassword']");
    this.signupButton = page.locator("//span[@id='cp_button']");

    // Success/Validation
    this.dashboardUrlRegex = /.*dashboard/;
    this.errorMessage = page.locator("//p[normalize-space()='Users must have a valid email address']");
  }

async fillForm(data) {
  
  await this.fullNameField.fill(data.fullName);
  await this.emailField.fill(data.email);

  await this.page.waitForTimeout(4000)

  // Type business name
  await this.businessNameField.fill(data.businessName);

  // Wait until Google suggestions appear (pac-item)
  await this.businessDropdownFirstItem.waitFor({ state: 'visible', timeout: 50000 });


  // Verify suggestion text matches input
  const suggestionText = await this.businessDropdownFirstItem.innerText();
  if (!suggestionText.toLowerCase().includes(data.businessName.toLowerCase())) {
    throw new Error(`Dropdown first item "${suggestionText}" does not match expected "${data.businessName}"`);
  }

  // Click suggestion
  await this.businessDropdownFirstItem.click();

  // Ensure address field is auto-filled
  await expect(this.businessAddressField).toHaveValue(/.+/, { timeout: 5000 });

  await this.passwordField.fill(data.password);
  await this.signupButton.click();
}

async verifySignupSuccess() {
  // Wait longer for redirect after signup
  await expect(this.page).toHaveURL(this.dashboardUrlRegex, { timeout: 15000 });
}

  async verifyError(expectedText) {
    await expect(this.errorMessage).toContainText(expectedText);
  }
}
