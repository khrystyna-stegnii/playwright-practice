import test, { expect } from "@playwright/test";
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import GaragePage from '../../pom/pages/GaragePage';


test.describe('Auth for testUser', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.openPage();
        await homePage.openSignInForm();
    })

    test('Log in as user testUser and save storage state', async ({ page }) => {
        await signInForm.signIn(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
        await expect(garagePage.addCarButton).toBeVisible();
        await page.context().storageState({ path: '.auth/testUserState.json' });
        console.log('Preconditions: Storage State for testUser saved!');
    });
});