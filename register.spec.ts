import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

const testEmail = 'test02@test.com';
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
      } else {
        console.error(`Error al quere eliminar el usuario con ID ${user.id}: ${deleteResponse.status} - ${await deleteResponse.text()}`);
      }
    }
  });

test('debería mostrar un alert luego de registrar', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.goTo();
  await registerPage.fillFirstName('adolfo');
  await registerPage.fillLastName('prueba');
  await registerPage.fillEmail(testEmail);
  await registerPage.fillPassword('password123');
  await registerPage.clickRegisterButton();

  const resultedDialogMessage = await registerPage.waitForAlertAfterSubmit();
  const expectedDialogMessage = "Registration successful! Redirecting to login...";
  expect(resultedDialogMessage).toBe(expectedDialogMessage);
});

