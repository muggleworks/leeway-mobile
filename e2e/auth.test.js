describe('App Launched', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have text "continue with"', async () => {
    await expect(element(by.text('continue with'))).toBeVisible();
  });
});
