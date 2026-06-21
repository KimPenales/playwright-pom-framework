import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { users } from '../test-data/user-data';
import { CartPage } from '../pages/cart-page';

test.describe('Inventory Features', () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('user can add multiple products to cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        
        //Inventory page is loaded
        await inventoryPage.validateInventoryPageLoaded();
        //Add products
        await inventoryPage.addMultipleProductsToCart();
        //Validate cart count
        await inventoryPage.validateCartBadge('3');
        //Open cart
        await inventoryPage.openCart();
    });
});