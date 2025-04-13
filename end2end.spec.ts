import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { MyAccountPage } from '../pages/myAccount.page';
import { ProductPage } from '../pages/product.page';

test('navigate to homepage, handling newsletter modal, click profile icon, handling modal login (click New customer? Create your account), navigate to registration', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickCerrarModal();
  await homePage.clickIconoPerfil();
  await homePage.clickNewUser();

  await expect(page).toHaveURL('https://automation-portal-bootcamp.vercel.app/register');
  await expect(page.locator('#wrapper > div > div > div')).toHaveText('Register'); 
});

/*
test ('has title', async ({ page }) => {
    const homePage = new HomePage (page);
    await homePage.goto();
});*/

const testEmail = 'test01@test.com';

const authToken = 'mi-token-super-secreto';

test.afterEach(async ({ request }) => {

    const response = await request.get(`https://automation-portal-bootcamp.vercel.app/api/user?email=${testEmail}`);
    const user = await response.json();

    console.log(user?.id); 

    if (user && user.id) {
      const deleteResponse = await request.delete(`https://automation-portal-bootcamp.vercel.app/api/user/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (deleteResponse.ok()) {
        console.log(`Usted elimino su Usuario con ID ${user.id} con email ${testEmail} de manera exitosa. Puede seguir reutilizando esta data`);
      /*
      } else {
        console.error(`Error al quere eliminar el usuario con ID ${user.id}: ${deleteResponse.status} - ${await deleteResponse.text()}`);
      }*/
      }
    }
  });
  

test('register user', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.goTo();
  await registerPage.fillFirstName('adolfo');
  await registerPage.fillLastName('prueba');
  await registerPage.fillEmail(testEmail);
  await registerPage.fillPassword('password123');
  await registerPage.clickRegisterButton();

  //const resultedDialogMessage = await registerPage.waitForAlertAfterSubmit();
  //const expectedDialogMessage = "Registration successful! Redirecting to login...";
  //expect(resultedDialogMessage).toBe(expectedDialogMessage);
  });

  test('login successful', async ({ page }) => {
    const loginPage = new LoginPage(page);
  
    await loginPage.goTo();
    await loginPage.emailInput.fill(testEmail);
    await loginPage.passwordInput.fill('password123');
    await loginPage.loginButton.click();;
      
    await expect(page).toHaveURL('https://automation-portal-bootcamp.vercel.app/login');
    expect(page.locator('#wrapper > div > div > div'));
  });

  test('navigate from my account to home page', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    const homePage = new HomePage (page);
  
    await myAccountPage.goTo();
    await myAccountPage.clickEcomusLogo();
    await myAccountPage.clickCerrarModal();
    await homePage.clickFirstProduct();
  });
  
  test('click first product, select color, select size, input quantity, add to cart', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goTo();
    await productPage.clickSelectColor();
    await productPage.clickSelectSize();
    await productPage.changeQuantity(5);
    await productPage.clickAddToCartButton();
    await productPage.waitForModalShoppingCart();
    console.log('Prueba finalizada')
});
