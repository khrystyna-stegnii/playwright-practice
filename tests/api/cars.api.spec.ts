import { test, expect } from '@playwright/test';
import AuthController from '../../controllers/AuthController';


test.describe('Add a car via API', () => {

  test.beforeEach(async ({ request }) => {
    const authController = new AuthController();
    const signInResponse = await authController.signIn(request, process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    expect(signInResponse.status()).toBe(200);
  });
  
  test('add Audi TT car', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 2022
      }
    });
    expect(response.ok()).toBeTruthy(); 
    const responseBody = await response.json()
    expect(response.status()).toBe(201);
    expect(responseBody.data.carBrandId).toBe(1);
    expect(responseBody.data.carModelId).toBe(1);
    expect(responseBody.data.mileage).toBe(2022);
  });

   test('add BMW X5 car', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 2,
        carModelId: 8,
        mileage: 3333
      }
    });
    expect(response.ok()).toBeTruthy(); 
    const responseBody = await response.json()
    expect(response.status()).toBe(201);
    expect(responseBody.data.carBrandId).toBe(2);
    expect(responseBody.data.carModelId).toBe(8);
    expect(responseBody.data.mileage).toBe(3333);
  });

   test('car can not be added with negative mileage', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 2,
        carModelId: 8,
        mileage: -3333
      }
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Mileage has to be from 0 to 999999');
  });

  test('car can not be added with mileage exceeding the limit', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 2,
        carModelId: 8,
        mileage: 1000000
      }
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Mileage has to be from 0 to 999999');
  });

});