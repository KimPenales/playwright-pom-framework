import { Page, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async validateUrl(url: RegExp) {
        await expect(this.page)
            .toHaveURL(url);
    }
}