import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';  
import SignUpForm from '../pom/forms/SignUpForm';

test.describe('Submit the Registration form', () => {
  let homePage: HomePage;
  let signUpForm: SignUpForm;
  
  test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    await homePage.openPage();
    await homePage.openSignUpForm();
    
  });

  test.describe('Modal title', () => {
    test('Verify that the modal title is present', async () => {
      await expect(signUpForm.title).toHaveText('Registration');
    });
  });

  test.describe('Validation of the Name field', () => {
    test('Verify that the Name field should have >= 2 characters', async () => {
      await signUpForm.fillName('K');
      await signUpForm.blurName();
      await expect(signUpForm.invalidFeedback).toHaveText('Name has to be from 2 to 20 characters long');
      await expect(signUpForm.name).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Name field should have <= 20 characters', async () => {
      await signUpForm.fillName('KristinaTestWithLongName');
      await signUpForm.blurName();
      await expect(signUpForm.invalidFeedback).toHaveText('Name has to be from 2 to 20 characters long');
      await expect(signUpForm.name).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Name field can not be empty', async () => {
      await signUpForm.fillName('Kristina');
      await signUpForm.clearName();
      await signUpForm.blurName();
      await expect(signUpForm.invalidFeedback).toHaveText('Name is required');
      await expect(signUpForm.name).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Name field is invalid if non English language is used', async () => {
      await signUpForm.fillName('Христина');
      await signUpForm.blurName();
      await expect(signUpForm.invalidFeedback).toHaveText('Name is invalid');
      await expect(signUpForm.name).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that leading and trailing spaces are trimmed', async () => {
      await signUpForm.fillName('  Kristina  ');
      await signUpForm.blurName();
      await expect(signUpForm.name).toHaveValue('Kristina');
    });
  });

  test.describe('Validation of the Last Name field', () => {
    test('Verify that the Last Name field should have >= 2 characters', async () => {
      await signUpForm.fillLastName('S');
      await signUpForm.blurLastName();
      await expect(signUpForm.invalidFeedback).toHaveText('Last name has to be from 2 to 20 characters long');
      await expect(signUpForm.lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Last Name field should have <= 20 characters', async () => {
      await signUpForm.fillLastName('StegniiTestWithLongName');
      await signUpForm.blurLastName();
      await expect(signUpForm.invalidFeedback).toHaveText('Last name has to be from 2 to 20 characters long');
      await expect(signUpForm.lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Last Name field can not be empty', async () => {
      await signUpForm.fillLastName('Stegnii');
      await signUpForm.clearLastName();
      await signUpForm.blurLastName();
      await expect(signUpForm.invalidFeedback).toHaveText('Last name is required');
      await expect(signUpForm.lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Last Name field is invalid if non English language is used', async () => {
      await signUpForm.fillLastName('Стегній');
      await signUpForm.blurLastName();
      await expect(signUpForm.invalidFeedback).toHaveText('Last name is invalid');
      await expect(signUpForm.lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that leading and trailing spaces are ignored', async () => {
      await signUpForm.fillLastName('  Stegnii  ');
      await signUpForm.blurLastName();
      await expect(signUpForm.lastName).toHaveValue('Stegnii');
    });
  });

  test.describe('Validation of the Email field', () => {
    test('Verify that the Email is invalid if the wrong email format is used without @', async () => {
      await signUpForm.fillEmail('Segniigmail.com');
      await signUpForm.blurEmail();
      await expect(signUpForm.invalidFeedback).toHaveText('Email is incorrect');
      await expect(signUpForm.email).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Email is invalid if the wrong email format is used without domain', async () => {
      await signUpForm.fillEmail('Segnii@');
      await signUpForm.blurEmail();
      await expect(signUpForm.invalidFeedback).toHaveText('Email is incorrect');
      await expect(signUpForm.email).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Email field can not be empty', async () => {
      await signUpForm.fillEmail('');
      await signUpForm.blurEmail();
      await expect(signUpForm.invalidFeedback).toHaveText('Email required');
      await expect(signUpForm.email).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Validation of the Password field', () => {
    test('Verify that the Password field should have >= 8 characters', async () => {
      await signUpForm.fillPassword('Test1');
      await signUpForm.blurPassword();
      await expect(signUpForm.invalidFeedback).toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
      await expect(signUpForm.password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Password field should have <= 15 characters', async () => {
      await signUpForm.fillPassword('Test123456789012345');
      await signUpForm.blurPassword();
      await expect(signUpForm.invalidFeedback).toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
      await expect(signUpForm.password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Password field is invalid if there is no integer', async () => {
      await signUpForm.fillPassword('Testtesttest');
      await signUpForm.blurPassword();
      await expect(signUpForm.invalidFeedback).toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
      await expect(signUpForm.password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Password field is invalid if there is no capital letter', async () => {
      await signUpForm.fillPassword('testtesttest1');
      await signUpForm.blurPassword();
      await expect(signUpForm.invalidFeedback).toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
      await expect(signUpForm.password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Password field is invalid if there is no small letter', async () => {
      await signUpForm.fillPassword('TESTTESTTEST1');
      await signUpForm.blurPassword();
      await expect(signUpForm.invalidFeedback).toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
      await expect(signUpForm.password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Password field can not be empty', async () => {
      await signUpForm.focusPassword();
      await signUpForm.blurPassword();
      await expect(signUpForm.invalidFeedback).toHaveText('Password required');
      await expect(signUpForm.password).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Validation of the Re-enter password field', () => {
    test('Verify that the Re-enter password field can not be empty', async () => {
      await signUpForm.focusRepeatPassword();
      await signUpForm.blurRepeatPassword();
      await expect(signUpForm.invalidFeedback).toHaveText('Re-enter password required');
      await expect(signUpForm.repeatPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Re-enter password should match with the Password', async () => {
      await signUpForm.fillPassword('Test12345678');
      await signUpForm.fillRepeatPassword('Test12345');
      await signUpForm.blurRepeatPassword();
      await expect(signUpForm.invalidFeedback).toHaveText('Passwords do not match');
      await expect(signUpForm.repeatPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Submit the registration form', () => {
    test('Verify that the "Registration" button is disabled if the invalid data is entered, Name field is less than 2 characters', async () => {

      await signUpForm.fillName('K');
      await signUpForm.fillLastName('Stegni');
      await signUpForm.fillEmail(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await signUpForm.fillPassword('Test1245678');
      await signUpForm.fillRepeatPassword('Test1245678');
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test('Verify that the "Registration" button is disabled if the invalid data is entered, Last Name field is more than 20 characters', async () => {
      
      await signUpForm.fillName('Khrystyna');
      await signUpForm.fillLastName('StegniiWithLongNameLongName');
      await signUpForm.fillEmail(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await signUpForm.fillPassword('Test1245678');
      await signUpForm.fillRepeatPassword('Test1245678');
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test('Verify that the "Registration" button is disabled if the invalid data is entered, Email field is left empty', async () => {
      
      await signUpForm.fillName('Khrystyna');
      await signUpForm.fillLastName('Stegnii');
      await signUpForm.fillPassword('Test1245678');
      await signUpForm.fillRepeatPassword('Test1245678');
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test('Verify that the "Registration" button is disabled if the invalid data is entered, Password field is less then 8', async () => {
    
      await signUpForm.fillName('Khrystyna');
      await signUpForm.fillLastName('Stegnii');
      await signUpForm.fillEmail(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await signUpForm.fillPassword('Test12');
      await signUpForm.fillRepeatPassword('Test12');
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test('Verify that the "Registration" button is disabled if the invalid data is entered, Re-enter password does not match', async () => {
        
      await signUpForm.fillName('Khrystyna');
      await signUpForm.fillLastName('Stegnii');
      await signUpForm.fillEmail(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await signUpForm.fillPassword('Test1245678');
      await signUpForm.fillRepeatPassword('Test12456789');
      await expect(signUpForm.signUpButton).toBeDisabled();
    });

    test('Successful registration with all valid data', async ({ page }) => {
      await signUpForm.signUp('Khrystyna', 'Stegnii', `khrystyna.stegnii+${Date.now()}@gmail.com`, 'Test1245678', 'Test1245678');
      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });

    test('Successful registration with min characters for Name and Last Name (2 characters)', async ({ page }) => {
      await signUpForm.signUp('Kh', 'St', `khrystyna.stegnii+${Date.now()}@gmail.com`, 'Test1245678', 'Test1245678');
      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });

    test('Successful registration with max characters for Name and Last Name (20 characters)', async ({ page }) => {
      await signUpForm.signUp('KrystynaTestWithLong', 'StegniiTestWithLongS', `khrystyna.stegnii+${Date.now()}@gmail.com`, 'Test1245678', 'Test1245678');
      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });

    test('Successful registration with Name that contains two words', async ({ page }) => {
      await signUpForm.signUp('Krystyna Mariia', 'Stegnii', `khrystyna.stegnii+${Date.now()}@gmail.com`, 'Test1245678', 'Test1245678');
      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });

    test('Successful registration with Last Name that contains two words', async ({ page }) => {
      await signUpForm.signUp('Krystyna', 'Stegnii Test', `khrystyna.stegnii+${Date.now()}@gmail.com`, 'Test1245678', 'Test1245678');
      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });
  });
});