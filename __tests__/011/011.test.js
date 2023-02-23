/**
 * @jest-environment jsdom
 */

import { querySelectorAll } from "../../dist/011/script";

describe("Example 1", () => {
  test("Simple case (not nesting in either side of the < symbol)", async () => {
    document.body.innerHTML = `
    <section>
      <div id="1" class="note">
        <input type="checkbox" class="is-complete" checked />
      </div>
      <div id="2" class="note"></div>
      <div id="3" class="note">
        <input type="checkbox" class="is-complete" checked />
      </div>
      <div id="4" class="note"></div>
      <div id="5" class="note">
        <input type="checkbox" class="is-complete" checked />
      </div>
    </section>`;

    const nodes = querySelectorAll("div.note < input.is-complete[checked]");
    expect(nodes).toHaveLength(3);
    expect(nodes[0].id).toBe("1");
    expect(nodes[1].id).toBe("3");
    expect(nodes[2].id).toBe("5");
  });

  test("divs with two inputs", async () => {
    document.body.innerHTML = `
    <section>
      <div id="1" class="note">
        <input type="checkbox" class="is-complete" checked />
      </div>
      <div id="2" class="note"></div>
      <div id="3" class="note">
        <input type="checkbox" class="is-complete" checked />
        <input type="checkbox" class="is-complete" checked />
      </div>
      <div id="4" class="note"></div>
      <div id="5" class="note">
        <input type="checkbox" class="is-complete" checked />
      </div>
    </section>`;
    const nodes = querySelectorAll("div.note < input.is-complete[checked]");
    expect(nodes).toHaveLength(3);
    expect(nodes[0].id).toBe("1");
    expect(nodes[1].id).toBe("3");
    expect(nodes[2].id).toBe("5");
  });

  test("It should give only the direct parent", async () => {
    document.body.innerHTML = ` <section>
      <div class="note">
        <div id="1" class="note">
          <input type="checkbox" class="is-complete" checked />
        </div>
      </div>
      <div id="2" class="note"></div>
      <div id="3" class="note">
        <input type="checkbox" class="is-complete" checked />
        <input type="checkbox" class="is-complete" checked />
      </div>
      <div id="4" class="note"></div>
      <div id="5" class="note">
        <input type="checkbox" class="is-complete" checked />
      </div>
    </section>`;
    const nodes = querySelectorAll("div.note < input.is-complete[checked]");
    expect(nodes).toHaveLength(3);
    expect(nodes[0].id).toBe("1");
    expect(nodes[1].id).toBe("3");
    expect(nodes[2].id).toBe("5");
  });

  test("still works when not used the new selector", async () => {
    document.body.innerHTML = `
    <section>
      <ul class="class-1" id="1">
        <li id="2">some text 1</li>
        <li id="3">some text 2</li>
        <li id="4">some text 3</li>
        <li id="5">some text 4</li>
      </ul>
    </section>`;
    const nodes = querySelectorAll("ul > li");
    expect(nodes).toHaveLength(4);
    expect(nodes[0].id).toBe("2");
    expect(nodes[1].id).toBe("3");
    expect(nodes[2].id).toBe("4");
    expect(nodes[3].id).toBe("5");
  });

  test("It should work with nested elements in the children section", async () => {
    document.body.innerHTML = `
    <section>
      <div class="note">
        <div id="1" class="note">
          <input type="checkbox" class="is-complete" checked />
        </div>
      </div>
      <div id="2" class="note"></div>
      <div id="3" class="note">
        <span><input type="checkbox" class="is-complete" checked /></span>
        <input type="checkbox" class="is-complete" checked />
      </div>
      <div id="4" class="note"></div>
      <div id="5" class="note">
        <span><input type="checkbox" class="is-complete" checked /></span>
      </div>
    </section>`;
    const nodes = querySelectorAll(
      "div.note < span input.is-complete[checked]"
    );
    expect(nodes).toHaveLength(2);
    expect(nodes[0].id).toBe("3");
    expect(nodes[1].id).toBe("5");
  });

  test("Should select only direct parents", () => {
    document.body.innerHTML = `
    <section>
      <div id="5" class="note">
        <div class="something">
          <span><input type="checkbox" class="is-complete" checked /></span>
        </div>
      </div>
    </section>
  `;
    const nodes = querySelectorAll(
      "div.note < span input.is-complete[checked]"
    );
    expect(nodes).toHaveLength(0);
  });
});
