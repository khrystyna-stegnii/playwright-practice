import { Locator, Page } from '@playwright/test';

export default class GaragePage {     
    addCarButton: Locator;
    lastAddedCarCard: Locator;
    lastAddedCarName: Locator;
    lastAddedCarMileage: Locator;
    editLastAddedCarButton: Locator;
    confirmRemovingCarButton: Locator;

    constructor(page: Page) {
        this.addCarButton = page.getByRole('button', { name: 'Add car' });
        this.lastAddedCarCard = page.locator('.car-item').first();
        this.lastAddedCarName = this.lastAddedCarCard.locator('.car_name');
        this.lastAddedCarMileage = this.lastAddedCarCard.locator('[name=miles]');
        this.editLastAddedCarButton = this.lastAddedCarCard.locator('.icon-edit');
        this.confirmRemovingCarButton = page.locator('.btn-danger', { hasText: 'Remove' });
    }

     async openAddCarForm() {
        await this.addCarButton.click();
    }

    async openEditLastAddedCarForm() {
        await this.editLastAddedCarButton.click();
    }

    async confirmRemovingCar() {
        await this.confirmRemovingCarButton.click();
    }
}