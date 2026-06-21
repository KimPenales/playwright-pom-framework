import { Page, Locator, expect } from '@playwright/test';
export class CartPage {

    readonly page: Page;
    //Product locators
    readonly backpackProduct: Locator;
    readonly bikeLightProduct: Locator;
    readonly boltShirtProduct: Locator;
    //Remove button locators
    readonly removeBackpackButton: Locator;
    readonly removeBikeLightButton: Locator;
    readonly removeBoltShirtButton: Locator;
    //Checkout locator
    readonly checkoutButton: Locator;

    constructor(page: Page) {

        this.page = page;
        this.backpackProduct =
            page.getByRole('link', {
                name: 'Sauce Labs Backpack'
            });
        this.bikeLightProduct =
            page.getByRole('link', {
                name: 'Sauce Labs Bike Light'
            });
        this.boltShirtProduct =
            page.getByRole('link', {
                name: 'Sauce Labs Bolt T-Shirt'
            });
        this.removeBackpackButton =
            page.locator('#remove-sauce-labs-backpack');
        this.removeBikeLightButton =
            page.locator('#remove-sauce-labs-bike-light');
        this.removeBoltShirtButton =
            page.locator('#remove-sauce-labs-bolt-t-shirt');

        this.checkoutButton =
            page.locator('#checkout');
    }

    async validateProductsInCart() {
        await expect(this.backpackProduct)
            .toBeVisible();

        await expect(this.bikeLightProduct)
            .toBeVisible();

        await expect(this.boltShirtProduct)
            .toBeVisible();
    }
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
    async removeProductsFromCart() {
        await this.removeBackpackButton.click();
        await this.removeBikeLightButton.click();
        await this.removeBoltShirtButton.click();
    }
    async validateCartPageLoaded() {
        await expect(this.page)
            .toHaveURL(/cart/);
    }
    async validateProductsRemovedFromCart() {
        await expect(this.backpackProduct).not.toBeVisible();
        await expect(this.bikeLightProduct).not.toBeVisible();
        await expect(this.boltShirtProduct).not.toBeVisible();
    }
}