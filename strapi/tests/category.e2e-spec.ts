test(`get category api`, async () => {
  const response = await api.category.find().send();
  expect(response.status).toBe(200);
});
