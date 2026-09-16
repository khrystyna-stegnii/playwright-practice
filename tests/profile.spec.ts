import { test, expect } from '@playwright/test';

test.use({ storageState: '.auth/testUserState.json' });

test('mocked data test', async ({ page }) => {

    const fakeBody = {
    "status": "ok",
    "data": {
        "userId": 390882,
        "photoFilename": "default-user.png",
        "name": "Teddy",
        "lastName": "Bear"
    }
}
  await page.route('**/api/users/profile', route => route.fulfill
    ({ status: 200, contentType: 'application/json', body: JSON.stringify(fakeBody) }));

  await page.goto('/panel/profile');
  await expect(page.locator('.profile_name.display-4')).toHaveText('Teddy Bear');
});
