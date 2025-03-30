import { test } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

test('registro de usuario', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goTo();

  await registerPage.fillFirstName('Prueba');
  await registerPage.fillLastName('test');
  await registerPage.fillEmail('qademy@test.com');
  await registerPage.fillPassword('123test');
  await registerPage.clickRegister();
});