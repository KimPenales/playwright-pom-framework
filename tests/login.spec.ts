import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login-page';

test('user can login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    //1. Go to login page
    await loginPage.gotoLoginPage();

    //2. Login with valid credentials
    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );
    
    //3. Validate inventory page is loaded
    await expect(page)
        .toHaveURL(/inventory/);
});