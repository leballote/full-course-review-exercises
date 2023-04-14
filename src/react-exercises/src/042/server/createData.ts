import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

type Image = {
  width: number;
  height: number;
  src: string;
};

type Gallery = {
  id: string;
  images: Image[];
};

function createImage(): Image {
  const width = faker.datatype.number({
    min: 150,
    max: 450,
  });
  const height = faker.datatype.number({
    min: 150,
    max: 450,
  });
  return {
    width,
    height,
    src: faker.image.imageUrl(width, height),
  };
}

function createImages(noImages: number): Image[] {
  const images = [];
  for (let i = 0; i < noImages; i++) {
    images.push(createImage());
  }
  return images;
}

function createGaleries(): Record<string, Gallery> {
  const randomNoImages = () => faker.datatype.number({ min: 50, max: 300 });
  return {
    "1": {
      id: "1",
      images: createImages(randomNoImages()),
    },
    "2": {
      id: "2",
      images: createImages(randomNoImages()),
    },
    "3": {
      id: "3",
      images: createImages(randomNoImages()),
    },
    "4": {
      id: "4",
      images: createImages(randomNoImages()),
    },
  };
}

function writeJson() {
  const fileName = "data.json";
  const galeries = createGaleries();
  console.log("fileName", path.join(__dirname, fileName));
  fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(galeries));
}

writeJson();
