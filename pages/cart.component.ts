import { Page, Locator, expect } from "@playwright/test"; 


export class CartComponent {
    readonly page: Page;
    readonly checkOutButton: Locator;
   

    constructor(page:Page){
        this.page = page;
        this.checkOutButton = page.locator(
            'div.tf-mini-cart-view-checkout > a.tf-btn.btn-fill.animate-hover-btn.radius-3.w-100.justify-content-center > span'
        );
    }
    async goTo() {
        await this.page.goto('https://automation-portal-bootcamp.vercel.app/register');
    }
   
    async clickCheckOutButton(){
        await this.checkOutButton.click();
    
    }

    async closeCartModalIfVisible() {
        const closeButton = this.page.locator('#shoppingCart > div > div > div.header > span');
        if (await closeButton.isVisible()) {
            await closeButton.click();
            console.log('Modal de carrito cerrado.');
        }
    }         
}