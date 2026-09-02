import { test, expect } from '@playwright/test';

test.describe('Submit the Registration form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

  test.describe('Modal title', () => {
    test('Verify that the modal title is present', async ({ page }) => {
      await expect(page.locator('.modal-title')).toHaveText('Registration');
    });
  });

  test.describe('Validation of the Name field', () => {
    test('Verify that the Name field should have >= 2 characters', async ({ page }) => {
      await page.locator('#signupName').fill('K');
      await page.locator('#signupName').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Name has to be from 2 to 20 characters long');
      await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Name field should have <= 20 characters', async ({ page }) => {
      await page.locator('#signupName').fill('KristinaTestWithLongName');
      await page.locator('#signupName').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Name has to be from 2 to 20 characters long');
      await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Name field can not be empty', async ({ page }) => {
      await page.locator('#signupName').fill('Kristina');
      await page.locator('#signupName').clear();
      await page.locator('#signupName').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Name is required');
      await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Name field is invalid if non English language is used', async ({ page }) => {
      await page.locator('#signupName').fill('Христина');
      await page.locator('#signupName').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Name is invalid');
      await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that leading and trailing spaces are trimmed', async ({ page }) => {
      await page.locator('#signupName').fill('  Kristina  ');
      await page.locator('#signupName').blur();
      await expect(page.locator('#signupName')).toHaveValue('Kristina');
    });
  });

  test.describe('Validation of the Last Name field', () => {
    test('Verify that the Last Name field should have >= 2 characters', async ({ page }) => {
      await page.locator('#signupLastName').fill('S');
      await page.locator('#signupLastName').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Last name has to be from 2 to 20 characters long');
      await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Last Name field should have <= 20 characters', async ({ page }) => {
      await page.locator('#signupLastName').fill('StegniiTestWithLongName');
      await page.locator('#signupLastName').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Last name has to be from 2 to 20 characters long');
      await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Last Name field can not be empty', async ({ page }) => {
      await page.locator('#signupLastName').fill('Stegnii');
      await page.locator('#signupLastName').clear();
      await page.locator('#signupLastName').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Last name is required');
      await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Last Name field is invalid if non English language is used', async ({ page }) => {
      await page.locator('#signupLastName').fill('Стегній');
      await page.locator('#signupLastName').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Last name is invalid');
      await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that leading and trailing spaces are ignored', async ({ page }) => {
      await page.locator('#signupLastName').fill('  Stegnii  ');
      await page.locator('#signupLastName').blur();
      await expect(page.locator('#signupLastName')).toHaveValue('Stegnii');
    });
  });

  test.describe('Validation of the Email field', () => {
    test('Verify that the Email is invalid if the wrong email format is used without @', async ({ page }) => {
      await page.locator('#signupEmail').fill('Segniigmail.com');
      await page.locator('#signupEmail').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Email is incorrect');
      await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Email is invalid if the wrong email format is used without domain', async ({ page }) => {
      await page.locator('#signupEmail').fill('Segnii@');
      await page.locator('#signupEmail').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Email is incorrect');
      await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Email field can not be empty', async ({ page }) => {
      await page.locator('#signupEmail').focus();
      await page.locator('#signupEmail').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Email required');
      await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Validation of the Password field', () => {
    test('Verify that the Password field should have >= 8 characters', async ({ page }) => {
      await page.locator('#signupPassword').fill('Test1');
      await page.locator('#signupPassword').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
      await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Password field should have <= 15 characters', async ({ page }) => {
      await page.locator('#signupPassword').fill('Test123456789012345');
      await page.locator('#signupPassword').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
      await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Password field is invalid if there is no integer', async ({ page }) => {
      await page.locator('#signupPassword').fill('Testtesttest');
      await page.locator('#signupPassword').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
      await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Password field is invalid if there is no capital letter', async ({ page }) => {
      await page.locator('#signupPassword').fill('testtesttest1');
      await page.locator('#signupPassword').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
      await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Password field is invalid if there is no small letter', async ({ page }) => {
      await page.locator('#signupPassword').fill('TESTTESTTEST1');
      await page.locator('#signupPassword').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
      await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Password field can not be empty', async ({ page }) => {
      await page.locator('#signupPassword').focus();
      await page.locator('#signupPassword').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Password required');
      await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Validation of the Re-enter password field', () => {
    test('Verify that the Re-enter password field can not be empty', async ({ page }) => {
      await page.locator('#signupRepeatPassword').focus();
      await page.locator('#signupRepeatPassword').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Re-enter password required');
      await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Verify that the Re-enter password should match with the Password', async ({ page }) => {
      await page.locator('#signupPassword').fill('Test12345678');
      await page.locator('#signupRepeatPassword').fill('Test12345');
      await page.locator('#signupRepeatPassword').blur();
      await expect(page.locator('div.invalid-feedback p')).toHaveText('Passwords do not match');
      await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Submit the registration form', () => {
    test('Verify that the "Registration" button is disabled if the invalid data is entered, Name field is less than 2 characters', async ({ page }) => {
      await page.locator('#signupName').fill('K');
      await page.locator('#signupLastName').fill('Stegni');
      await page.locator('#signupEmail').fill(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await page.locator('#signupPassword').fill('Test1245678');
      await page.locator('#signupRepeatPassword').fill('Test1245678');
      await expect(page.locator('app-signup-modal .btn.btn-primary')).toBeDisabled();
    });

    test('Verify that the "Registration" button is disabled if the invalid data is entered, Last Name field is more than 20 characters', async ({ page }) => {
      await page.locator('#signupName').fill('Khrystyna');
      await page.locator('#signupLastName').fill('StegniiWithLongNameLongName');
      await page.locator('#signupEmail').fill(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await page.locator('#signupPassword').fill('Test1245678');
      await page.locator('#signupRepeatPassword').fill('Test1245678');
      await expect(page.locator('app-signup-modal .btn.btn-primary')).toBeDisabled();
    });

    test('Verify that the "Registration" button is disabled if the invalid data is entered, Email field is left empty', async ({ page }) => {
      await page.locator('#signupName').fill('Khrystyna');
      await page.locator('#signupLastName').fill('StegniiWithLongNameLongName');
      await page.locator('#signupPassword').fill('Test1245678');
      await page.locator('#signupRepeatPassword').fill('Test1245678');
      await expect(page.locator('app-signup-modal .btn.btn-primary')).toBeDisabled();
    });

    test('Verify that the "Registration" button is disabled if the invalid data is entered, Password field is less then 8', async ({ page }) => {
      await page.locator('#signupName').fill('Khrystyna');
      await page.locator('#signupLastName').fill('Stegnii');
      await page.locator('#signupEmail').fill(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await page.locator('#signupPassword').fill('Test12');
      await page.locator('#signupRepeatPassword').fill('Test12');
      await expect(page.locator('app-signup-modal .btn.btn-primary')).toBeDisabled();
    });

    test('Verify that the "Registration" button is disabled if the invalid data is entered, Re-enter password does not match', async ({ page }) => {
      await page.locator('#signupName').fill('Khrystyna');
      await page.locator('#signupLastName').fill('Stegnii');
      await page.locator('#signupEmail').fill(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await page.locator('#signupPassword').fill('Test1245678');
      await page.locator('#signupRepeatPassword').fill('Test12456789');
      await expect(page.locator('app-signup-modal .btn.btn-primary')).toBeDisabled();
    });

    test('Successful registration with all valid data', async ({ page }) => {
      await page.locator('#signupName').fill('Khrystyna');
      await page.locator('#signupLastName').fill('Stegnii');
      await page.locator('#signupEmail').fill(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await page.locator('#signupPassword').fill('Test1245678');
      await page.locator('#signupRepeatPassword').fill('Test1245678');
      await page.locator('app-signup-modal .btn.btn-primary').click();
      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });

    test('Successful registration with min characters for Name and Last Name (2 characters)', async ({ page }) => {
      await page.locator('#signupName').fill('Kh');
      await page.locator('#signupLastName').fill('St');
      await page.locator('#signupEmail').fill(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await page.locator('#signupPassword').fill('Test1245678');
      await page.locator('#signupRepeatPassword').fill('Test1245678');
      await page.locator('app-signup-modal .btn.btn-primary').click();
      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });

    test('Successful registration with max characters for Name and Last Name (20 characters)', async ({ page }) => {
      await page.locator('#signupName').fill('KrystynaTestWithLong');
      await page.locator('#signupLastName').fill('StegniiTestWithLongS');
      await page.locator('#signupEmail').fill(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await page.locator('#signupPassword').fill('Test1245678');
      await page.locator('#signupRepeatPassword').fill('Test1245678');
      await page.locator('app-signup-modal .btn.btn-primary').click();
      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });

    test('Successful registration with Name that contains two words', async ({ page }) => {
      await page.locator('#signupName').fill('Krystyna Mariia');
      await page.locator('#signupLastName').fill('Stegnii');
      await page.locator('#signupEmail').fill(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await page.locator('#signupPassword').fill('Test1245678');
      await page.locator('#signupRepeatPassword').fill('Test1245678');
      await page.locator('app-signup-modal .btn.btn-primary').click();
      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });

    test('Successful registration with Last Name that contains two words', async ({ page }) => {
      await page.locator('#signupName').fill('Krystyna');
      await page.locator('#signupLastName').fill('Stegnii Test');
      await page.locator('#signupEmail').fill(`khrystyna.stegnii+${Date.now()}@gmail.com`);
      await page.locator('#signupPassword').fill('Test1245678');
      await page.locator('#signupRepeatPassword').fill('Test1245678');
      await page.locator('app-signup-modal .btn.btn-primary').click();
      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });
  });
});