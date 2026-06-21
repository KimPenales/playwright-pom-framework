import { test } from '../fixtures/base-fixture';
import { users } from '../test-data/user-data';

test.describe('Inventory Features', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('user can add multiple products to cart', async ({ inventoryPage }) => {
        //Inventory page is loaded
        await inventoryPage.validateInventoryPageLoaded();
        //Add products
        await inventoryPage.addMultipleProductsToCart();
        //Validate cart count
        await inventoryPage.validateCartBadge('3');
    });
});