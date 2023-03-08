// @vitest-environment jsdom

import { test, expect, describe, it, afterAll, afterEach } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { LinearPlotFromSource } from "../../src/041/LinearPlotFromSource";
import LinearPlotFromSourceExample from "../../src/041/LinearPlotFromSourceExample";
import { waitFor } from "@testing-library/dom";

test("does this work", () => {
  render(<LinearPlotFromSourceExample />);
  console.log(document.body.innerHTML);
});
