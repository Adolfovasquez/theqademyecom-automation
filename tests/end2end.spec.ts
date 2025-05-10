import { test, expect, mergeExpects } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { MyAccount } from '../pages/my-account.page';
import { ProductPage } from '../pages/product.page';
import { CartComponent } from '../pages/cart.component';
import { CheckoutPage } from '../pages/checkout.page';

const testEmail = 'adolfo@vasquez.com';
const authToken = 'mi-token-super-secreto';

test.afterEach(async ({ request }) => {
  try {
    // Buscar usuarios por email
    const response = await request.get(
      `https://automation-portal-bootcamp.vercel.app/api/user?email=${testEmail}`
    );

    if (!response.ok()) {
      console.error('Error buscando usuarios:', response.status());
      return;
    }

    const users = await response.json();
    console.log('Usuarios encontrados:', users);

    const usersArray = Array.isArray(users) ? users : users?.id ? [users] : [];

    if (usersArray.length > 0) {
      
      const deletePromises = usersArray.map(user => {
        return request.delete(
          `https://automation-portal-bootcamp.vercel.app/api/user/${user.id}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        ).then(responseDelete => {
          if (responseDelete.ok()) {
            console.log(`Usuario eliminado: ${user.email} (ID: ${user.id})`);
          } else {
            console.error(`Error eliminando usuario (ID: ${user.id}):`, responseDelete.status());
          }
        });
      });

      await Promise.all(deletePromises);
    } else {
      console.log('No se encontraron usuarios para eliminar.');
    }
  } catch (error) {
    console.error('Error en afterEach:', error);
  }
});

test('e2e', async ({ page, request }) => {
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
await checkoutPage.fillFormCheckout(
  'adolfo', 
  'vasquez', 
  'United States', 
  'Corrientes', 
  'avenida siempre viva 123', 
  '3876281517', 
  testEmail, 
  'prueba de adolfo', 
  '1234', 
  '4242424242424242', 
  '07/28', 
  '789');
await checkoutPage.clickDiscountCodeButton();
await checkoutPage.clickTermsAndConditionsCheckbox();
await checkoutPage.clickPlaceOrderButton();
const messageOfOrderPlaced = await checkoutPage.getPlacedOrderMessage()
expect(messageOfOrderPlaced).toContain('Order saved successfully! Your order ID is:')

const orderId = await checkoutPage.getOrderId();
console.log(orderId)
const orderResponse = await request.get(
  `https://automation-portal-bootcamp.vercel.app/api/orders/${orderId}`,
);
expect(orderResponse.ok()).toBeTruthy();

const order = await orderResponse.json();
console.log(order)
const expectedOrder = {
  id: expect.any(String),
  createdAt: expect.any(String), 
  firstName: 'adolfo',
  lastName: 'vasquez',
  country: 'United States',
  city: 'Corrientes',
  address: 'avenida siempre viva 123',
  phone: '3876281517',
  email: 'adolfo@vasquez.com',
  cardNumber: '4242424242424242',
  expiry: '07/28',
  cvc: '789',
  items: [
    {
      id: expect.any(String),
      title: 'Franklin Signature Pickleball Paddle',
      price: 100,
      quantity: 4,
      orderId: expect.any(String),
    }
  ]
};

expect(order).toEqual(expectedOrder);
});