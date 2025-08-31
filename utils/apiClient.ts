import { request, APIRequestContext, APIResponse, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export class APIClient {
  private requestContext!: APIRequestContext;

  constructor() { }

  async init() {
    this.requestContext = await request.newContext({
      baseURL: process.env.BASE_URL,
    });
  }

  async login(userName: string, password: string) {
    const response = await this.requestContext.post('/Account/v1/Login', {
      data: { userName: userName, password },
    });

    console.log('Login response status:', response.status());
    const text = await response.text();
    console.log('Login response text:', text);

    if (!response.ok()) {
      throw new Error(`Login failed [${response.status()}]: ${text}`);
    }

    let body;
    try {
      body = JSON.parse(text); // parse manually so you can catch errors
    } catch (error) {
      throw new Error(`Failed to parse JSON. Response text: ${text}`);
    }

    return {
      token: body.token,
      userId: body.userId,
    };
  }


  async getBooks() {
    return await this.requestContext.get('/BookStore/v1/Books');
  }

  async addBook(userId: string, isbn: string, token: string) {
    return await this.requestContext.post('/BookStore/v1/Books', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        collectionOfIsbns: [{ isbn }],
      },
    });
  }

  async deleteBook(userId: string, isbn: string, token: string) {
    return await this.requestContext.delete('/BookStore/v1/Book', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        isbn,
      },
    });
  }
}
