export default class SignupApplicantPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      loginBtn: 'text=Login',
      signupFreeBtn: 'text=Sign Up For Free',
      applicantBtn: 'text=I am a Job Seeker',
      phone: 'input#cellPhone[placeholder="Cell Phone"]',
      email: 'input#jsSignupEmail[placeholder="Email"]',
      password: 'input#jsSignuppassword[placeholder="Password"]',
      checkboxWorkLegal: '#legallyUS',
      checkboxTerms: '#tos',
      signupBtn: '#jsSignupSubmitButton',
      errorMessage: '//p[@id="jspassword-error"]',
      passwordError: '#jspassword-error'
    };
  }

  async navigateApplicantSignup() {
    await this.page.goto('/');
    await this.page.click(this.selectors.loginBtn);
    await this.page.click(this.selectors.signupFreeBtn);
    await this.page.click(this.selectors.applicantBtn);
    await this.page.waitForSelector(this.selectors.phone);
  }

  async fillSignupForm(data, checkboxes = true) {
    const uniqueEmail = data.email.replace('@', `+${Date.now()}@`);

    if (data.phone) await this.page.fill(this.selectors.phone, data.phone);
    if (data.email) await this.page.fill(this.selectors.email, uniqueEmail);
    if (data.password) await this.page.fill(this.selectors.password, data.password);

    if (checkboxes) {
      await this.page.check(this.selectors.checkboxWorkLegal);
      await this.page.check(this.selectors.checkboxTerms);
    }
  }

  async submitForm() {
    await this.page.click(this.selectors.signupBtn);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.selectors.errorMessage);
  }

  async getPasswordError() {
    return await this.page.textContent(this.selectors.passwordError);
  }
}
