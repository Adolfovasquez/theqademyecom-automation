import { Page, Locator } from '@playwright/test';


export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#register-form > div:nth-child(1) > input');
    this.lastNameInput = page.locator('#register-form > div:nth-child(2) > input');
    this.emailInput = page.locator('#register-form > div:nth-child(3) > input');
    this.passwordInput = page.locator('#register-form > div:nth-child(4) > input');
    this.registerButton = page.locator('#register-form > div.mb_20 > button');


}

    async goTo() {
        await this.page.goto('https://automation-portal-bootcamp.vercel.app/register');
    }

    async fillFirstName(firstname: string) {
        await this.firstNameInput.fill(firstname);
    }

    async fillLastName(lastname: string) {
        await this.lastNameInput.fill(lastname);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }
    
    async clickRegister() {
        await this.registerButton.click();
    }
}