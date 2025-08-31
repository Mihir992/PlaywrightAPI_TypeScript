import { test, expect } from '@playwright/test';
import { APIClient } from '../utils/apiClient';
import testData from '../fixtures/testData.json';

test('Login API', async () => {
  const apiclient = new APIClient();
  await apiclient.init();

  const { token, userId } = await apiclient.login(testData.user.username,testData.user.password);
  expect(token).toBeTruthy();
  expect(userId).toBeTruthy();
});