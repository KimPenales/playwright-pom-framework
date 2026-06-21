import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
export class CheckoutPage extends BasePage {
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
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
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
        this.errorMessage = 
            page.locator('[data-test="error"]');
    }
    
    async validateCheckoutInformationPageLoaded() {
        await this.validateUrl(
            /checkout-step-one/
        );
    }
    async validateCheckoutOverviewPageLoaded() {
        await this.validateUrl(
            /checkout-step-two/
        );
    }
    async validateCheckoutCompletePageLoaded() {
        await this.validateUrl(
            /checkout-complete/
        );
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
    async validateErrorMessage(message: string) {
        await expect(this.errorMessage)
            .toContainText(message);
    }
}