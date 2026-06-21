import { test } from '@playwright/test';
import { users } from '../test-data/user-data';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';

test.describe('Checkout Features', () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);   
        await loginPage.gotoLoginPage();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    }); 
    test('user can complete checkout flow', async ({page}) => {
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
        //Validate added products
        await cartPage.validateProductsInCart();
        //Proceed to checkout
        await cartPage.proceedToCheckout();
        //Validate checkout page is loaded
        await checkoutPage.validateCheckoutInformationPageLoaded();
        //Fill customer info
        await checkoutPage.fillCustomerInfo(
            'Kim',
            'Pogi',
            '143'
        );
        //Continue to checkout
        await checkoutPage.continueCheckout();
        //Checkout overview page is loaded
        await checkoutPage.validateCheckoutOverviewPageLoaded();
        //Validate payment information
        await checkoutPage.validatePaymentInformation();
        //Finish checkout
        await checkoutPage.finishCheckout();
        //Checkout complete page is loaded
        await checkoutPage.validateCheckoutCompletePageLoaded();
        //Validate success message
        await checkoutPage.validateSuccessMessage();
        //Validate checkout complete header
        await checkoutPage.validateCheckoutCompleteHeader();
    });
});