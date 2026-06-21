import { test } from '../fixtures/base-fixture';
import { users } from '../test-data/user-data';
import { goToCheckoutInformationPage } from '../utils/checkout-helper';
import { invalidCheckoutData } from '../test-data/checkout-data';

test.describe('Checkout Features', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });
    test('user can complete checkout flow', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await goToCheckoutInformationPage(
            inventoryPage,
            cartPage,
            checkoutPage
        );
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
    for (const data of invalidCheckoutData) {
        test(data.testName, async ({ inventoryPage, cartPage, checkoutPage }) => {
            await goToCheckoutInformationPage(
                inventoryPage,
                cartPage,
                checkoutPage
            );

            await checkoutPage.fillCustomerInfo(
                data.firstName,
                data.lastName,
                data.zipCode
            );

            await checkoutPage.continueCheckout();

            await checkoutPage.validateErrorMessage(
                data.errorMessage
            );
        });
    }
});