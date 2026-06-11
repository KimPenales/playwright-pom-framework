import { test, expect } from '@playwright/test';
import { users } from '../test-data/user-data';
import { LoginPage } from '../pages/login-page';

test('user can login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    //1. Go to login page
    await loginPage.gotoLoginPage();
    //2. Login with valid credentials
    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );
    //3. Validate inventory page is loaded
    await expect(page)
        .toHaveURL(/inventory/);
});