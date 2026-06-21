import { test } from '@playwright/test';
import { users } from '../test-data/user-data';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';

test.describe('Cart Features', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('user can validate products in cart', async ({ page }) => {
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
        //Validate added products in cart
        await cartPage.validateProductsInCart();
    });
    test('user can proceed to checkout', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        //Inventory page is loaded
        await inventoryPage.validateInventoryPageLoaded();
        //Add products
        await inventoryPage.addMultipleProductsToCart();
        //Validate cart count
        await inventoryPage.validateCartBadge('3');
        //Open cart
        await inventoryPage.openCart();
        //Validate added products in cart
        await cartPage.validateProductsInCart();
        //Proceed to checkout
        await cartPage.proceedToCheckout();
        //Validate checkout page is loaded
        await checkoutPage.validateCheckoutInformationPageLoaded();
    });
    test('user can remove products from cart', async ({page}) => {
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
        //Remove items/prodcuts from cart
        await cartPage.removeProductsFromCart();
    });
});