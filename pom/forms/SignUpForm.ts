import { Locator, Page } from '@playwright/test';

export default class SignUpForm {
    name: Locator;
    lastName: Locator;
    email: Locator;
    password: Locator;
    repeatPassword: Locator;
    signUpButton: Locator;
    invalidFeedback: Locator
    title: Locator;

    constructor(page: Page) {
        this.name = page.locator('#signupName');
        this.lastName = page.locator('#signupLastName');
        this.email = page.locator('#signupEmail');
        this.password = page.locator('#signupPassword');
        this.repeatPassword = page.locator('#signupRepeatPassword');
        this.signUpButton = page.locator('app-signup-modal .btn.btn-primary');
        this.invalidFeedback = page.locator('div.invalid-feedback p');
        this.title = page.locator('.modal-title');
    }

    async fillName(name: string) {
        await this.name.fill(name);
    }

    async fillLastName(lastName: string) {
        await this.lastName.fill(lastName);
    }

    async fillEmail(email: string) {
        await this.email.fill(email);
    }

    async fillPassword(password: string) {
        await this.password.fill(password);
    }

    async fillRepeatPassword(repeatPassword: string) {
        await this.repeatPassword.fill(repeatPassword);
    }   

    async blurName() {
        await this.name.blur();
    }

    async blurLastName() {
        await this.lastName.blur();
    }

    async blurEmail() {
        await this.email.blur();
    }

    async blurPassword() {
        await this.password.blur();
    }

    async blurRepeatPassword() {
        await this.repeatPassword.blur();
    }

    async clearName() {
        await this.name.clear();
    }

    async clearLastName() {
        await this.lastName.clear();
    }

    async clearEmail() {
        await this.email.clear();
    }

    async clearPassword() {
        await this.password.clear();
    }

    async clearRepeatPassword() {
        await this.repeatPassword.clear();
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async focusPassword() {
        await this.password.focus();
    }
    
    async focusRepeatPassword() {
        await this.repeatPassword.focus();
    }

    async signUp(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
        await this.fillName(name);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillRepeatPassword(repeatPassword);
        await this.clickSignUpButton();
    }
}