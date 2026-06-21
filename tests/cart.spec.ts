import { test } from '../fixtures/base-fixture';
import { users } from '../test-data/user-data';
import { addProductsAndGoToCart } from '../utils/cart-helper';

test.describe('Cart Features', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('user can validate products in cart', async ({ inventoryPage, cartPage }) => {
        await addProductsAndGoToCart(
            inventoryPage,
            cartPage
        );
        //Validate added products in cart
        await cartPage.validateProductsInCart();
    });
    test('user can proceed to checkout', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await addProductsAndGoToCart(
            inventoryPage,
            cartPage
        );
        //Proceed to checkout
        await cartPage.proceedToCheckout();
        //Validate checkout page is loaded
        await checkoutPage.validateCheckoutInformationPageLoaded();
    });
    test('user can remove products from cart', async ({ inventoryPage, cartPage }) => {
        await addProductsAndGoToCart(
            inventoryPage,
            cartPage
        );
        //Removed items/products in cart
        await cartPage.removeProductsFromCart();
        //Validate products are removed from cart
        await cartPage.validateProductsRemovedFromCart();
    });
});