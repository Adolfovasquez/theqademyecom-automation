import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { MyAccount } from './pages/my-account.page';
import { ProductPage } from './pages/product.page';
import { CartComponent } from './pages/cart.component';
import { CheckoutPage } from './pages/checkout.page';

const testEmail = 'test01@test.com';
const authToken = 'mi-token-super-secreto';

test.afterEach(async ({ request }) => {
  // Buscar usuario por email
  const response = await request.get(
    `https://automation-portal-bootcamp.vercel.app/api/user?email=${testEmail}`
  );
  const user = await response.json();

  console.log('Usuario encontrado:', user.id);

  let responseDelete;
  if (user.id) {
    responseDelete = await request.delete(
      `https://automation-portal-bootcamp.vercel.app/api/user/${user.id}`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    console.log('Usuario eliminado:', await responseDelete.json());
  } else {
    console.log('No se encontró el usuario para eliminar');
  }
});

test('e2e', async ({ page }) => {
const homePage = new HomePage(page);
const loginPage = new LoginPage(page);
const registerPage = new RegisterPage(page);
const myAccount = new MyAccount(page);
const productPage = new ProductPage(page);
const cartComponent = new CartComponent (page);
const checkoutPage = new CheckoutPage (page);
await homePage.goto();
await homePage.clikKeepMeUpdatedModalCloseButton();
await homePage.clickProfileIcon();
await loginPage.clickNewCustomerButton();
await registerPage.fillFormRegister('adolfo', 'vasquez', testEmail, '123456');
await loginPage.login(testEmail, '123456');
await myAccount.clickTopLogo();
await homePage.clikKeepMeUpdatedModalCloseButton();
await homePage.clickFirstRaquet();
await productPage.selectColorFromPicker('blue');
await productPage.setItemQuantity(3);
await productPage.selectSizeFromPicker('s');
await productPage.clickAddToCartButton();
await productPage.cartModal.clickCheckOutButton();
await checkoutPage.fillFormCheckout('adolfo', 'vasquez', 'United States', 'Corrientes', '3876281517', testEmail, 'prueba de adolfo', '1234', '4242424242424242', '07/28', '789');
await checkoutPage.clickDiscountCodeButton();
await checkoutPage.clickTermsAndConditionsCheckbox();
await checkoutPage.clickPlaceOrderButton();
});