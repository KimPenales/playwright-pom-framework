import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';

export async function addProductsAndGoToCart(
    inventoryPage: InventoryPage,
    cartPage: CartPage
) {
    await inventoryPage.validateInventoryPageLoaded();
    await inventoryPage.addMultipleProductsToCart();
    await inventoryPage.validateCartBadge('3');
    await inventoryPage.openCart();

    await cartPage.validateCartPageLoaded();
}