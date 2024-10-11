module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest", // Transpile TypeScript and JSX using Babel
    "^.+\\.jsx?$": "babel-jest",  // Transpile JavaScript and JSX
    "^.+\\.svg$": "jest-transform-stub",  // Use jest-transform-stub for SVGs
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // Support these file types
  testEnvironment: "jsdom", // Required for running React components tests
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS and SCSS files
  },
};
