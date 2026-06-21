import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';

export async function goToCheckoutInformationPage(
    inventoryPage: InventoryPage,
    cartPage: CartPage,
    checkoutPage: CheckoutPage
) {
    await inventoryPage.validateInventoryPageLoaded();
    await inventoryPage.addMultipleProductsToCart();
    await inventoryPage.validateCartBadge('3');
    await inventoryPage.openCart();

    await cartPage.validateCartPageLoaded();
    await cartPage.validateProductsInCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.validateCheckoutInformationPageLoaded();
}