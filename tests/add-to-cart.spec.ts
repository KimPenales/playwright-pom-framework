import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login-page';

import { InventoryPage } from '../pages/inventory-page';

test('user can add multiple products to cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    //1. Go to login page
    await loginPage.gotoLoginPage();

    //2. Login with valid credentials
    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

    //3. Validate inventory page is loaded
    await inventoryPage.validateInventoryPageLoaded();

    //4. Add products
    await inventoryPage.addMultipleProductsToCart();

    //5. Validate remove buttons
    await inventoryPage.validateRemoveButtons();

    //6. Validate cart count
    await inventoryPage.validateCartBadge('3');

    //7. Open cart
    await inventoryPage.openCart();

    //8. Validate cart page is loaded
    await inventoryPage.validateCartPageLoaded();
});