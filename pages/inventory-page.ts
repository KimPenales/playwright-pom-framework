import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
export class InventoryPage extends BasePage {
    //Product locators
    readonly backpackAddToCartButton: Locator;
    readonly bikeLightAddToCartButton: Locator;
    readonly boltTShirtAddToCartButton: Locator;
    //Remove button locators
    readonly removeBackpackButton: Locator;
    readonly removeBikeLightButton: Locator;
    readonly removeBoltTShirtButton: Locator;
    //Cart locators
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.backpackAddToCartButton = 
            page.locator('#add-to-cart-sauce-labs-backpack');
        this.bikeLightAddToCartButton = 
            page.locator('#add-to-cart-sauce-labs-bike-light');
        this.boltTShirtAddToCartButton = 
            page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
        this.removeBackpackButton = 
            page.locator('#remove-sauce-labs-backpack');
        this.removeBikeLightButton = 
            page.locator('#remove-sauce-labs-bike-light');
        this.removeBoltTShirtButton = 
            page.locator('#remove-sauce-labs-bolt-t-shirt');
        this.shoppingCartBadge = 
            page.locator('.shopping_cart_badge');
        this.shoppingCartLink = 
            page.locator('.shopping_cart_link');
    }

    async addMultipleProductsToCart() {
        await this.backpackAddToCartButton.click();
        await this.bikeLightAddToCartButton.click();
        await this.boltTShirtAddToCartButton.click();
        //valpidateRemoveButtons
        await expect(this.removeBackpackButton)
            .toHaveText('Remove');
        await expect(this.removeBikeLightButton)
            .toHaveText('Remove');
        await expect(this.removeBoltTShirtButton)
            .toHaveText('Remove');    
    }
    async validateInventoryPageLoaded() {
        await this.validateUrl(
            /inventory/
        );
    }
    async validateCartBadge(count: string) { 
        await expect(this.shoppingCartBadge)
            .toHaveText(count);
    }
    async openCart() {
        await this.shoppingCartLink.click();
    }
}