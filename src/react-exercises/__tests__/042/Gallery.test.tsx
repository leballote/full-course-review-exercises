import { useRef } from "react";
import React from "react";
import {
  test,
  expect,
  describe,
  it,
  afterAll,
  afterEach,
  vi,
  beforeAll,
} from "vitest";
import {
  fireEvent,
  getByTestId,
  render,
  waitFor,
} from "@testing-library/react";

import {
  setup as setupDevServer,
  teardown as teardownDevServer,
} from "jest-dev-server";

import Gallery from "../../src/042/Gallery";
import { SpawndChildProcess } from "spawnd";

let s: SpawndChildProcess[];
beforeAll(async () => {
  s = await setupDevServer({
    command: `cd src/042/server && npm run dev`,
    port: 3010,
  });
});

afterAll(async () => {
  await teardownDevServer(s);
});

const baseURL = "http://localhost:3010";
function Example() {
  const galleryBodyRef = useRef<HTMLUListElement>(null);

  return (
    <Gallery
      baseURL={baseURL}
      scrollerRef={galleryBodyRef}
      galleryBodyRef={galleryBodyRef}
      galleryBodySx={{ height: "600px" }}
    />
  );
}

test("Initial render loading and then the gallery, and the navbar", async () => {
  const el = render(<Example />);
  await waitFor(() => {
    const gallery = getByTestId(el.container, "gallery");
    return gallery;
  });
  const gallery = getByTestId(el.container, "gallery");
  const prevButton = getByTestId(el.container, "prevButton");
  const nextButton = getByTestId(el.container, "nextButton");
  expect(gallery).toBeTruthy();
  expect(prevButton).toBeTruthy();
  expect(nextButton).toBeTruthy();
});

test("The first render renders the images corresponding to the first page (page 1)", async () => {
  const el = render(<Example />);
  await waitFor(() => {
    const gallery = getByTestId(el.container, "gallery");
    return gallery;
  });
  //TODO: there is a typo: gallerey should be gallerey; correct in the backend
  const pageRaw = await fetch(`${baseURL}/gallerey/1?count=10&page=1`);
  const pageJson = await pageRaw.json();
  //since images don't have ids I just see that the srcs are the same
  pageJson.images.forEach(
    (image: { width: number; height: number; src: string }) => {
      const selected = document.querySelector(`[src="${image.src}"]`);
      expect(selected).toBeTruthy();
    }
  );
});

test("Clicking next button should render the next set of images", async () => {
  const el = render(<Example />);
  await waitFor(() => {
    const gallery = getByTestId(el.container, "gallery");
    return gallery;
  });
  const gallery = getByTestId(el.container, "gallery");
  const nextButton = getByTestId(gallery, "nextButton");
  fireEvent.click(nextButton);
  await waitFor(() => {
    const page2 = document.querySelector(`[data-page="2"]`);
    expect(page2).toBeTruthy();
  });
  const pageRaw = await fetch(`${baseURL}/gallerey/1?count=10&page=2`);
  const pageJson = await pageRaw.json();
  pageJson.images.forEach(
    (image: { width: number; height: number; src: string }) => {
      const selected = document.querySelector(`[src="${image.src}"]`);
      expect(selected).toBeTruthy();
    }
  );
});

test("Clicking in some page should render that page", async () => {
  const el = render(<Example />);
  await waitFor(() => {
    const gallery = getByTestId(el.container, "gallery");
    return gallery;
  });
  const gallery = getByTestId(el.container, "gallery");
  const pageButton = getByTestId(gallery, "pageButton5");
  fireEvent.click(pageButton);
  await waitFor(() => {
    const page5 = document.querySelector(`[data-page="5"]`);
    expect(page5).toBeTruthy();
  });
  const pageRaw = await fetch(`${baseURL}/gallerey/1?count=10&page=5`);
  const pageJson = await pageRaw.json();
  pageJson.images.forEach(
    (image: { width: number; height: number; src: string }) => {
      const selected = document.querySelector(`[src="${image.src}"]`);
      expect(selected).toBeTruthy();
    }
  );
});

test("Clicking prev button should render the previous set of images", async () => {
  const el = render(<Example />);
  await waitFor(() => {
    const gallery = getByTestId(el.container, "gallery");
    return gallery;
  });
  const gallery = getByTestId(el.container, "gallery");
  const pageButton = getByTestId(gallery, "pageButton5");
  const prevButton = getByTestId(gallery, "prevButton");
  fireEvent.click(pageButton);
  await waitFor(() => {
    const page5 = document.querySelector(`[data-page="5"]`);
    expect(page5).toBeTruthy();
  });
  fireEvent.click(prevButton);
  await waitFor(() => {
    const page4 = document.querySelector(`[data-page="4"]`);
    expect(page4).toBeTruthy();
  });
  const pageRaw = await fetch(`${baseURL}/gallerey/1?count=10&page=4`);
  const pageJson = await pageRaw.json();
  pageJson.images.forEach(
    (image: { width: number; height: number; src: string }) => {
      const selected = document.querySelector(`[src="${image.src}"]`);
      expect(selected).toBeTruthy();
    }
  );
});

test("Clicking prev button should render the previous set of images", async () => {
  const fetchSpy = vi.spyOn(global, "fetch");
  expect(fetchSpy.mock.calls).toEqual([]);
  const el = render(<Example />);
  await waitFor(() => {
    const gallery = getByTestId(el.container, "gallery");
    return gallery;
  });
  const galleryBody = getByTestId(el.container, "galleryBody");
  expect(fetchSpy.mock.calls).toEqual([
    [`${baseURL}/gallerey/1?page=1&count=10`],
  ]);
  galleryBody.scrollTop = galleryBody.scrollHeight;
  fireEvent.scroll(galleryBody);
  waitFor(() => {
    expect(fetchSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
  });
  expect(fetchSpy.mock.calls.at(-1)).toEqual([
    `${baseURL}/gallerey/1?page=2&count=10`,
  ]);
});
