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
        await cartPage.validateCartPageLoaded();
    });
});