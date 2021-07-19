test(`get category api`, async () => {
  const response = await request.get('/categories').send();
  expect(response.status).toBe(200);
});
