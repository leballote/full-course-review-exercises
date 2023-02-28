import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

//TODO: ask why do we need the pages number
const app = express();

const galeriesBuffer = fs.readFileSync(path.join(__dirname, "data.json"));
const galeries = JSON.parse(galeriesBuffer.toString());

type Image = {
  src: string;
  width: number;
  height: number;
};

app.use(cors());
app.use(express.json());
app.get("/galery/:galeryId/", (req, res) => {
  const { galeryId } = req.params;
  const { count: countString, page: pageString } = req.query;
  const count: number = !Number.isNaN(parseInt(countString as string))
    ? parseInt(countString as string)
    : 10;
  const page: number = !Number.isNaN(parseInt(pageString as string))
    ? parseInt(pageString as string)
    : 1;
  const galery = galeries[galeryId];
  const images = galery.images as Image[];
  const noPages = Math.ceil(images.length / count);
  const [lower, upper] = [(page - 1) * count, (page - 1) * count + count];
  const pageImages = images.slice(lower, upper);

  return res.send({
    images: pageImages,
    page,
    total: noPages,
  });
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
