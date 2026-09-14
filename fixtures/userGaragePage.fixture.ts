import { test as base, expect } from '@playwright/test';
import GaragePage from '../pom/pages/GaragePage';

type GarageFixtures = {
    userGaragePage: GaragePage;
};

export const test = base.extend<GarageFixtures>({
    storageState: '.auth/testUserState.json',

    userGaragePage: async ({ page }, use) => {
        await page.goto('/');
        await use(new GaragePage(page));
    },
});

export { expect };
