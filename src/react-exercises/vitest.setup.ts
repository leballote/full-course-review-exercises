import "vitest-canvas-mock";
import "vitest-canvas-mock";

import { vi } from "vitest";

const ResizeObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);
