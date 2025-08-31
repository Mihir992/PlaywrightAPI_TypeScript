import { test, expect } from '@playwright/test';
import { APIClient } from '../utils/apiClient';
import testData from '../fixtures/testData.json';

let token: string;
let userId: string;
let api: APIClient;

test.beforeAll(async () =>{
    api = new APIClient();
    await api.init();
    const login = await api.login(testData.user.username, testData.user.password);
    token = login.token;
    userId = login.userId;
});

test('Should get list of books', async () => {
  const response = await api.getBooks();
  expect(response.status()).toBe(200);

  const data = await response.json();
  console.log('Books list:', data.books);  // <-- print books array here
  expect(Array.isArray(data.books)).toBeTruthy();
});

test('Should add a book (with cleanup)', async () => {
  // Clean up in case the book is already there
  await api.deleteBook(userId, testData.sampleIsbn, token).catch(() => {
    // Ignore error if book isn't present
  });

  const addResponse = await api.addBook(userId, testData.sampleIsbn, token);
  expect(addResponse.status()).toBe(201);
  console.log('✅ Book added successfully:', await addResponse.json());
});

test('Should delete a book from the existing list and log its details', async () => {
  // Step 1: Get all books
  const getBooksResponse = await api.getBooks();
  expect(getBooksResponse.status()).toBe(200);

  const booksData = await getBooksResponse.json();

  if (!booksData.books || booksData.books.length === 0) {
    console.log('⚠️ No books available to delete.');
    return; // Exit test early if no books
  }
   // Step 2: Pick a book
  const bookToUse = booksData.books[0];
  console.log('Book selected:', bookToUse);

  // Step 3: Add the book to user's collection
  const addResponse = await api.addBook(userId, bookToUse.isbn, token);
  expect(addResponse.status()).toBe(201);
  console.log(`Book with ISBN '${bookToUse.isbn}' added to user collection.`);

  // Step 4: Delete the book
  const deleteResponse = await api.deleteBook(userId, bookToUse.isbn, token);
  expect(deleteResponse.status()).toBe(204);
  console.log(`🗑️ Book with ISBN '${bookToUse.isbn}' deleted successfully.`);
});
