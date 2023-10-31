module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/__tests__/__data__/"],
  coveragePathIgnorePatterns: ["<rootDir>/__tests__/__data__/"],
  setupFiles: ["<rootDir>/__tests__/__data__/scss.mock.js"],
  moduleNameMapper: {
    "\\.(scss|css|jpg|png|gif)$": "<rootDir>/__tests__/__data__/scss.mock.js",
  },
  testEnvironment: "jsdom",
};
