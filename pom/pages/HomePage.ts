import { Locator, Page } from '@playwright/test';

export default class HomePage {
    page: Page;
    signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpButton = page.locator('.btn-primary');
    }

    async openPage() {
        await this.page.goto('/');
    }

    async openSignUpForm() {
        await this.signUpButton.click();
    }
}