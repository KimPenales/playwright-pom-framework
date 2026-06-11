import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {

    readonly page: Page;
    //Checkout locators
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    //Button locators
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    //Validation locators
    readonly paymentInformation: Locator;
    readonly successMessage: Locator;
    readonly checkoutHeader: Locator;

    constructor(page: Page) {

        this.page = page;
        this.firstNameInput =
            page.getByPlaceholder('First Name');
        this.lastNameInput =
            page.getByPlaceholder('Last Name');
        this.zipCodeInput =
            page.getByPlaceholder('Zip/Postal Code');
        this.continueButton =
            page.locator('#continue');
        this.finishButton =
            page.locator('#finish');
        this.paymentInformation =
            page.getByText('Payment Information');
        this.successMessage =
            page.getByRole('heading', {name: 'Thank you for your order!' });
        this.checkoutHeader =
            page.getByText('Checkout: Complete!');
    }
    
    async validateCheckoutInformationPageLoaded() {
        await expect(this.page)
            .toHaveURL(/checkout-step-one/);
    }
    async validateCheckoutOverviewPageLoaded() {
        await expect(this.page)
            .toHaveURL(/checkout-step-two/);
    }
    async validateCheckoutCompletePageLoaded() {
        await expect(this.page)
            .toHaveURL(/checkout-complete/)
    }
    async fillCustomerInfo(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }
    async continueCheckout() {
        await this.continueButton.click();
    }
    async finishCheckout() {
        await this.finishButton.click();
    }
    async validatePaymentInformation() {
        await expect(this.paymentInformation)
            .toBeVisible();
    }
    async validateSuccessMessage() {
        await expect(this.successMessage)
            .toBeVisible();
    }
    async validateCheckoutCompleteHeader() {
        await expect(this.checkoutHeader)
            .toBeVisible();
    }
}