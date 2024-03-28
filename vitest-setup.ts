import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { beforeAll, afterEach, afterAll } from "vitest";

import { server } from "./mocks/node.js";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  // cleanup は vite.config.ts の test.globals を true にした場合は不要
  cleanup();
});

afterAll(() => {
  server.close();
});
