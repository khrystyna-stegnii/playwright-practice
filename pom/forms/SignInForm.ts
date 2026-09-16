import { Locator, Page } from '@playwright/test';

export default class SignInForm {
    emailInput: Locator;
    passwordInput: Locator;
    signInButton: Locator;

    constructor(page: Page) {
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.signInButton = page.getByRole('button', { name: 'Login' });
    }

    async signIn(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}