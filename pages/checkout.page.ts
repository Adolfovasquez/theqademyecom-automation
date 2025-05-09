import { Page, Locator } from "@playwright/test";
import { CartComponent } from "./cart.component";


export class CheckoutPage {
    readonly page: Page;
    readonly cartComponent: CartComponent;
    readonly checkOutButton: Locator;
    readonly firtsNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly countrySelect: Locator;
    readonly cityInput: Locator;
    readonly addressInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly notesInput: Locator;
    readonly discountCodeInput: Locator;
    readonly discountCodeButton: Locator;
    readonly cardInput: Locator;
    readonly cardDateInput: Locator;
    readonly cardCvcInput: Locator;
    readonly termsCheckboxInput: Locator;
    readonly placeOrderButton: Locator;
    readonly messageOrderPlacedLabel: Locator;
  

    constructor(page:Page){
        this.page = page;
        this.cartComponent =new CartComponent (page);
        this.firtsNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.countrySelect = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.addressInput = page.locator('#address');
        this.phoneInput = page.locator('#phone');
        this.emailInput = page.locator('#email');
        this.notesInput = page.locator('#note');
        this.discountCodeInput = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > div:nth-child(2) > input[type=text]');
        this.discountCodeButton = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > div:nth-child(2) > a');
        this.cardInput = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > div.coupon-box.mb_20 > input[type=text]');
        this.cardDateInput = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > div.box.grid-2 > div:nth-child(1) > input[type=text]');
        this.cardCvcInput = page.locator('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > div.box.grid-2 > div:nth-child(2) > input[type=text]');
        this.termsCheckboxInput = page.locator('#check-agree');
        this.placeOrderButton = page.locator ('#wrapper > section > div > div > div.tf-page-cart-footer > div > form > button');
        this.messageOrderPlacedLabel = page.locator ('#order-message > p');


    }
    async goTo() {
        await this.page.goto('https://automation-portal-bootcamp.vercel.app/checkout');
    }
   
    async fillFirstNameInput(name: string) {
        await this.firtsNameInput.fill(name);
    }
    async fillLastNameInput(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }
    async selectCountry(countrySelect: string) {
        await this.countrySelect.selectOption(countrySelect);
        console.log('País seleccionado exitosamente:', countrySelect);
    }
    async fillCityInput(cityInput: string) {
        await this.cityInput.fill(cityInput);
    }
    async fillAddressInput(addressInput: string) {
        await this.addressInput.fill(addressInput);
    }
    async fillPhoneInput(phoneInput: string) {
        await this.phoneInput.fill(phoneInput);    
    }
    async fillEmailInput(emailInput: string) {
        await this.emailInput.fill(emailInput);
    }
    async fillNotesInput(notesInput: string) {
        await this.notesInput.fill(notesInput);
    }
    async fillDiscountCodeInput(discountCodeInput: string) {
        await this.discountCodeInput.fill(discountCodeInput);
    }
    async clickDiscountCodeButton() {
        await this.discountCodeButton.click();
    }
    async fillCardInput(cardInput: string) {
        await this.cardInput.fill(cardInput);
    }
    async fillCardDateInput(cardDateInput: string) {
        await this.cardDateInput.fill(cardDateInput);
    }                
    async fillCardCvcInput(cardCvcInput: string) {
        await this.cardCvcInput.fill(cardCvcInput);
    }
    async clickTermsAndConditionsCheckbox() {
        await this.termsCheckboxInput.click();
    }
    async clickPlaceOrderButton() {
        await this.placeOrderButton.click();
    }
    async getPlacedOrderMessage() {
        return await this.messageOrderPlacedLabel.innerText();
    }

    async getOrderId(): Promise<string> {
        const msg = await this.getPlacedOrderMessage();
        // Dividimos por ":" y tomamos la última parte, luego eliminamos espacios
        const parts = msg.split(':');
        return parts[parts.length - 1].trim();
    }
         
    async fillFormCheckout(name:string,lastName: string, countrySelect: string, cityInput: string, addressInput: string, phoneInput: string, emailInput: string, notesInput: string, discountCodeInput: string, cardInput: string, cardDateInput: string, cardCvcInput: string, ){
        console.log('Comenzando fillFormCheckout con los siguientes datos:');
        console.log('Nombre:', name);
        console.log('Apellido:', lastName);
        console.log('País seleccionado:', countrySelect);
        console.log('Ciudad:', cityInput);
        console.log('Direccion:', addressInput);
        console.log('Teléfono:', phoneInput);
        console.log('Email:', emailInput);
        console.log('Notas:', notesInput);
        console.log('Código de descuento:', discountCodeInput);
        console.log('Número de tarjeta:', cardInput);
        console.log('Fecha de tarjeta:', cardDateInput);
        console.log('CVC de tarjeta:', cardCvcInput);

        console.log('Llenando campo nombre');
        await this.firtsNameInput.fill(name);
        console.log('Listo.');

        console.log('Llenando campo apellido');
        await this.lastNameInput.fill(lastName);
        console.log('Listo.');

        console.log('Seleccionando país');
        await this.selectCountry(countrySelect);
        console.log('Listo:', countrySelect);

        console.log('Llenando campo ciudad...');
        await this.cityInput.fill(cityInput);
        console.log('Listo.');

        console.log('Llenando campo dirección...');
        await this.addressInput.fill(addressInput);
        console.log('Listo.');

        console.log('Llenando campo teléfono...');
        await this.phoneInput.fill(phoneInput);
        console.log('Listo.');

        console.log('Llenando campo email...');
        await this.emailInput.fill(emailInput);
        console.log('Listo.');

        console.log('Llenando campo notas');
        await this.notesInput.fill(notesInput);
        console.log('Listo.');

        console.log('Llenando campo código de descuento');
        await this.discountCodeInput.fill(discountCodeInput);
        console.log('Listo.');

        console.log('Llenando campo número de tarjeta');
        await this.cardInput.fill(cardInput);
        console.log('Listo.');

        console.log('Llenando campo fecha de tarjeta');
        await this.cardDateInput.fill(cardDateInput);
        console.log('Listo.');

        console.log('Llenando campo CVC');
        await this.cardCvcInput.fill(cardCvcInput);
        console.log('Listo.');

        console.log('fillFormCheckout completado.');
                    
    } 
}