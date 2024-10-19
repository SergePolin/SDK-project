module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest", // Transpile TypeScript and JSX using Babel
    "^.+\\.jsx?$": "babel-jest",  // Transpile JavaScript and JSX
    "^.+\\.svg$": "jest-transform-stub",  // Use jest-transform-stub for SVGs
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@brojs/cli)" // Exclude @brojs/cli from being ignored in transformation
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // Support these file types
  testEnvironment: "jsdom", // Required for running React components tests
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS and SCSS files
  },
  collectCoverage: true,
  coverageDirectory: 'coverage', // Directory for the reports
  coverageReporters: ['html', 'text'], // Types of reports to generate
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Which files to include
    '!src/index.tsx', // Exclude certain files (like the main entry file)
  ],
  setupFiles: ['<rootDir>/jest.setup.js'], 
};
