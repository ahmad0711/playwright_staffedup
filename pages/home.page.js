export class HomePage {
  constructor(page) {
    this.page = page;
    this.loginButtonNav = page.locator('//div[@class="btnWrap dFlex alignCenter"]//button[@id="loginBtns"]'); // button to open popup
    this.emailInput = page.locator('//input[@id="emailPhone"]');        // inside popup
    this.passwordInput = page.locator('//input[@id="password"]');
    this.submitButton = page.locator('//button[@id="loginSubmitButton"]');
     this.errorMessage = page.locator("//div[@id='loginPopup']//div[@class='bgOverlay']"); // adjust selector
  }

  async openHome(BASE_URL) {
    await this.page.goto(BASE_URL);
  }

  async openLoginPopup() {
    await this.loginButtonNav.click();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
