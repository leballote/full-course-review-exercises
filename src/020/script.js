// elements

const serpinskiInputRange = document.getElementsByClassName(
  "serpinski-input-n-range"
)[0];
const serpinskiInputNumber = document.getElementsByClassName(
  "serpinski-input-n-number"
)[0];
const serpinskiInputColorPicker = document.getElementsByClassName(
  "serpinski-input-color"
)[0];

const serpinskiTriangleContainer = document.getElementById(
  "serpinski-triangle-container"
);

const serpinskiDrawButton = document.getElementById("serpinski-draw-button");

//state variables
serpinskiInputRange.value = 1;
serpinskiInputNumber.value = 1;
serpinskiInputColorPicker.value = "#000000";
let prevInputNumberValue = serpinskiInputNumber.value;

const serpinskiOptions = {
  x: 0,
  y: 0,
  size: 100,
  diagSize: 100,
};
(async () =>
  await drawAndMountSerpinskiTriangle(
    serpinskiInputNumber.value,
    serpinskiOptions
  ))();

//event listeners
serpinskiInputRange.addEventListener("input", (ev) => {
  const n = ev.currentTarget.value;
  serpinskiInputNumber.value = n;
});

serpinskiInputRange.addEventListener("change", () => {
  serpinskiDrawButton.click();
});

serpinskiInputNumber.addEventListener("input", (ev) => {
  let n = ev.currentTarget.value;
  // const min = Number(ev.currentTarget.min);
  const max = Number(ev.currentTarget.max);
  if (n < 0 || max < n) {
    serpinskiInputRange.value = prevInputNumberValue;
    serpinskiInputNumber.value = prevInputNumberValue;
  } else {
    serpinskiInputRange.value = Math.max(n, 1);
    prevInputNumberValue = n;
  }
});

serpinskiInputNumber.addEventListener("change", () => {
  serpinskiDrawButton.click();
});

serpinskiDrawButton.addEventListener("click", () => {
  let n = serpinskiInputNumber.value;
  drawAndMountSerpinskiTriangle(n, serpinskiOptions);
});

serpinskiInputColorPicker.addEventListener("change", (ev) => {
  console.log("called");
  const stylesheet = document.styleSheets[0];
  let elementRules;

  // looping through all its rules and getting your rule
  for (let i = 0; i < stylesheet.cssRules.length; i++) {
    if (stylesheet.cssRules[i].selectorText === ".up-triangle") {
      elementRules = stylesheet.cssRules[i];
      console.log(elementRules);
    }
  }

  elementRules.style.setProperty("background-color", ev.currentTarget.value);
});

async function drawTriangle({ x, y, root }) {
  const triangle = document.createElement("div");
  triangle.classList.add("triangle");
  triangle.style.left = `${x}%`;
  triangle.style.top = `${y}%`;
  root.appendChild(triangle);
  return triangle;
}

//functions
async function drawUpTriangle({ x, y, root }) {
  const triangle = await drawTriangle({
    x,
    y,
    root,
  });
  triangle.classList.add("up-triangle");
}

async function drawSerpinskiTriangle(
  n,
  { x = 0, y = 0, size, diagSize, root } = {}
) {
  if (n <= 1) {
    const serpinskiTriangle = drawUpTriangle({
      x,
      y,
      root,
    });
    return serpinskiTriangle;
  } else {
    drawSerpinskiTriangle(n - 1, {
      x: x + size / 4,
      y: y,
      size: size / 2,
      diagSize: diagSize / 2,
      root,
    });
    drawSerpinskiTriangle(n - 1, {
      x: x,
      y: y + diagSize / 2,
      size: size / 2,
      diagSize: diagSize / 2,
      root,
    });
    drawSerpinskiTriangle(n - 1, {
      x: x + size / 2,
      y: y + diagSize / 2,
      size: size / 2,
      diagSize: diagSize / 2,
      root,
    });
  }
}

async function drawAndMountSerpinskiTriangle(
  n,
  { x = 0, y = 0, size, diagSize }
) {
  serpinskiTriangleContainer.style.setProperty("--m", `${2 ** (n - 1)}`);
  const root = new DocumentFragment();
  await drawSerpinskiTriangle(n, {
    x,
    y,
    size,
    diagSize,
    root,
  });

  requestAnimationFrame(() => {
    serpinskiTriangleContainer.replaceChildren(root);
  });
}
