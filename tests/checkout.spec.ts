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
        //9. Validate added products
        await cartPage.validateProductsInCart();
        //10. Proceed to checkout
        await cartPage.proceedToCheckout();
        //11. Validate checkout page is loaded
        await checkoutPage.validateCheckoutInformationPageLoaded();
        //12. Fill customer info
        await checkoutPage.fillCustomerInfo(
            'Kim',
            'Pogi',
            '143'
        );
        //13. Continue to checkout
        await checkoutPage.continueCheckout();
        //14. Validate checkout overview page is loaded
        await checkoutPage.validateCheckoutOverviewPageLoaded();
        //15. Validate payment information
        await checkoutPage.validatePaymentInformation();
        //16. Finish checkout
        await checkoutPage.finishCheckout();
        //17. Validate checkout complete page is loaded
        await checkoutPage.validateCheckoutCompletePageLoaded();
        //18. Validate success message
        await checkoutPage.validateSuccessMessage();
        //19. Validate checkout complete header
        await checkoutPage.validateCheckoutCompleteHeader();
    });
});