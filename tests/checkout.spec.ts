import { test } from '@playwright/test';
import { users } from '../test-data/user-data';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';

test.describe('Checkout Features', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);   
        await loginPage.gotoLoginPage();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    }); 
    test('user can complete checkout flow', async ({ page }) => {
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
        //Cart page is loaded
        await cartPage.validateCartPageLoaded();
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
    test('user cannot checkout without first name', async ({ page }) => {
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
        //Cart page is loaded
        await cartPage.validateCartPageLoaded();
        //Validate added products
        await cartPage.validateProductsInCart();
        //Proceed to checkout
        await cartPage.proceedToCheckout();
        //Validate checkout page is loaded
        await checkoutPage.validateCheckoutInformationPageLoaded();
        //Fill customer info
        await checkoutPage.fillCustomerInfo(
            '',
            'Pogi',
            '143'
        );
        //Continue to checkout
        await checkoutPage.continueCheckout();
        //Validate Error Message
        await checkoutPage.validateErrorMessage('First Name is required');
    });
    test('user cannot checkout without last name', async ({ page }) => {
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
        //Cart page is loaded
        await cartPage.validateCartPageLoaded();
        //Validate added products
        await cartPage.validateProductsInCart();
        //Proceed to checkout
        await cartPage.proceedToCheckout();
        //Validate checkout page is loaded
        await checkoutPage.validateCheckoutInformationPageLoaded();
        //Fill customer info
        await checkoutPage.fillCustomerInfo(
            'Kim',
            '',
            '143'
        );
        //Continue to checkout
        await checkoutPage.continueCheckout();
        //Validate Error Message
        await checkoutPage.validateErrorMessage('Last Name is required');
    });
    test('user cannot checkout without zip code', async ({ page }) => {
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
        //Cart page is loaded
        await cartPage.validateCartPageLoaded();
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
            ''
        );
        //Continue to checkout
        await checkoutPage.continueCheckout();
        //Validate Error Message
        await checkoutPage.validateErrorMessage('Postal Code is required');
    });
});