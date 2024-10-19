jest.mock('@brojs/cli', () => ({
    getConfigValue: jest.fn(() => {return {"sdk.api": "http://mocksdk.eastus.azurecontainer.io/api"}}), // You can mock the value as needed
    }));
  