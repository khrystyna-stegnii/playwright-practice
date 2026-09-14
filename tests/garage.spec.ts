import { test, expect } from '../fixtures/userGaragePage.fixture';
import AddCarForm from '../pom/forms/AddCarForm';
import EditCarForm from '../pom/forms/EditCarForm';
import { faker } from '@faker-js/faker';

test.describe('Garage Page', () => {
    let addCarForm: AddCarForm;
    let editCarForm: EditCarForm;

    test.beforeEach(async ({ page, userGaragePage }) => {
        addCarForm = new AddCarForm(page);
        editCarForm = new EditCarForm(page);

        await userGaragePage.openAddCarForm();
    });

    test.describe('Add a car', () => {
        test('Add Audi TT', async ({ userGaragePage }) => {
           await addCarForm.selectBrand('Audi');
           await addCarForm.selectModel('TT');
           const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();
           await addCarForm.enterMileage(randomMileage);
           await addCarForm.clickAddButton();
           await expect(userGaragePage.lastAddedCarName).toHaveText('Audi TT');
           await expect(userGaragePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add BMW X6', async ({ userGaragePage }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await addCarForm.selectBrand('BMW');
            await addCarForm.selectModel('X6');
            await addCarForm.enterMileage(randomMileage);
            await addCarForm.clickAddButton();
            await expect(userGaragePage.lastAddedCarName).toHaveText('BMW X6');
            await expect(userGaragePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add Ford Focus', async ({ userGaragePage }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();
            await addCarForm.selectBrand('Ford');
            await addCarForm.selectModel('Focus');
            await addCarForm.enterMileage(randomMileage);
            await addCarForm.clickAddButton();
            await expect(userGaragePage.lastAddedCarName).toHaveText('Ford Focus');
            await expect(userGaragePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })
    })
})
