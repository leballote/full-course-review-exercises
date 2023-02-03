class LoadingBar {
  constructor({
    foregroundChar = "=",
    backgroundChar = "-",
    foregroundModifier = "",
    backgroundModifier = "",
    size = 40,
  } = {}) {
    this.size = size;
    this.foregroundModifier = foregroundModifier;
    this.backgroundModifier = backgroundModifier;
    this.foregroundChar = foregroundChar;
    this.backgroundChar = backgroundChar;
  }

  getLoadingString({ percentage }) {
    const noForegroundChars = Math.floor((this.size * percentage) / 100);
    const string = ` [${this.foregroundModifier}${this.foregroundChar.repeat(
      noForegroundChars
    )}${"\x1b[0m"}${this.backgroundModifier}${this.backgroundChar.repeat(
      this.size - noForegroundChars
    )}]`;
    return string;
  }
}

const bar = new LoadingBar();

console.log(bar.getLoadingString({ percentage: 50 }));
