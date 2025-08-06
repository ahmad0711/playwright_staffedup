export class HomePage {
  constructor(page) {
    this.page = page;

    // --- Existing Login Locators ---
    this.loginButtonNav = page.locator("//div[@class='btnWrap dFlex alignCenter']//button[@id='loginBtns']");
    this.emailInput = page.locator('//input[@id="emailPhone"]');
    this.passwordInput = page.locator('//input[@id="password"]');
    this.submitButton = page.locator('//button[@id="loginSubmitButton"]');
    this.errorMessage = page.locator("//div[@id='loginPopup']//div[@class='bgOverlay']");

    // --- Employer Signup Locators (Simple Flow) ---
    this.signupForFreeButton = page.locator('//button[normalize-space()="Sign Up For FREE!"]');
    this.employerOption = page.locator("//a[normalize-space()='I am an Employer']");

    // --- Pricing Flow Locators ---
    this.pricingLink = page.locator('//li[@id="menu-item-23277"]//a[normalize-space()="Pricing"]');
    this.monthlyTab = page.locator("//a[normalize-space()='Monthly']");
    this.planStarter = page.locator("//button[@aria-label='Pricing Monthly'][normalize-space()='Get Starter']");
    this.planSmarter = page.locator("//button[@aria-label='Pricing Monthly'][normalize-space()='Be Smarter']");
    this.planPro = page.locator("//button[@aria-label='Pricing Monthly'][normalize-space()='Go Pro']");
    this.employerPopup = page.locator("//a[normalize-space()='YES! I am an employer']");
  }

  // --- Common Navigation ---
  async openHome() {
    await this.page.goto('/');
  }

  // --- Login Methods (Already Existing) ---
  async openLoginPopup() {
    await this.loginButtonNav.click();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  // --- Employer Simple Signup Flow ---
  async startEmployerSimpleSignup() {
    await this.loginButtonNav.click();
    await this.signupForFreeButton.click();
    await this.employerOption.click();
  }

  // --- Employer Pricing Signup Flow ---
  async startEmployerPricingSignup(plan) {
    await this.pricingLink.click();
    await this.monthlyTab.click();

    if (plan === 'starter') await this.planStarter.click();
    if (plan === 'smarter') await this.planSmarter.click();
    if (plan === 'pro') await this.planPro.click();

    await this.employerPopup.click();
  }
}
