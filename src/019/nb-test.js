(function (global) {
  let root = document.getElementById("results");
  //this is one way to achieve it. I think, it would be better to change the assert function to accept root as a parameter but don't know if that is an option
  const originalSetTimeout = setTimeout;
  setTimeout = function (fn, ...rest) {
    let temp = root;
    const modFn = function (...args) {
      root = temp;
      return fn(...args);
    };
    return originalSetTimeout(modFn, ...rest);
  };
  const result = (text, pass) => {
    const el = document.createElement("li");
    el.textContent = text;
    pass !== undefined && (el.style.color = pass ? "green" : "red");
    return el;
  };
  const assert = (pass, message) => {
    return root.appendChild(result(message, pass));
  };
  function test(description, testBlock) {
    const parent = root;
    root = assert(undefined, description).appendChild(
      document.createElement("ul")
    );
    testBlock();
    root = parent;
  }
  global.assert = assert;
  global.test = test;
})(window);
