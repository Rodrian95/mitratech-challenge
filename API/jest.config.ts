import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/src/tests"],
  testMatch: ["**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
