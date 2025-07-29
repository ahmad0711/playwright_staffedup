export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('//input[@id="emailPhone"]'); // adjust selector if different
    this.passwordInput = page.locator('//input[@id="password"]');
    this.loginButton = page.locator('//button[@id="loginSubmitButton"]');
    this.errorMessage = page.locator('//div[@id="loginPopup"]//div[@class="bgOverlay"]');
  }

  async gotoLogin(baseURL) {
    await this.page.goto(`${baseURL}/login`);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
