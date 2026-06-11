import { test, expect } from '@playwright/test';
import { users } from '../test-data/user-data';
import { LoginPage } from '../pages/login-page';

test('user cannot login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    //1. Go to login page
    await loginPage.gotoLoginPage();
    //2. Login with invalid credentials
    await loginPage.login(
        users.invalidUser.username,
        users.invalidUser.password
    );
    //3. Validate error message
    await loginPage.validateErrorMessage(
        'Username and password do not match'
    );
});