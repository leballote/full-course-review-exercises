import GalleryBody from "../../042/GalleryBody";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "041/GalleryBody",
  component: GalleryBody,
} as ComponentMeta<typeof GalleryBody>;

const Template: ComponentStory<typeof GalleryBody> = (args) => (
  <GalleryBody {...args} />
);

export const RandomDimensions = Template.bind({});

RandomDimensions.args = {
  sx: { width: "700px", overflowY: "hidden" },
  images: [
    {
      height: 185,
      width: 237,
      src: "https://loremflickr.com/185/237",
    },
    {
      height: 431,
      width: 152,
      src: "https://loremflickr.com/431/152",
    },
    {
      height: 405,
      width: 423,
      src: "https://loremflickr.com/405/423",
    },
    {
      height: 249,
      width: 282,
      src: "https://loremflickr.com/249/282",
    },
    {
      height: 355,
      width: 414,
      src: "https://loremflickr.com/355/414",
    },
    {
      height: 166,
      width: 303,
      src: "https://loremflickr.com/166/303",
    },
    {
      height: 333,
      width: 368,
      src: "https://loremflickr.com/333/368",
    },
    {
      height: 444,
      width: 350,
      src: "https://loremflickr.com/444/350",
    },
    {
      height: 344,
      width: 437,
      src: "https://loremflickr.com/344/437",
    },
    {
      height: 185,
      width: 237,
      src: "https://loremflickr.com/185/237",
    },
    {
      height: 431,
      width: 152,
      src: "https://loremflickr.com/431/152",
    },
    {
      height: 162,
      width: 322,
      src: "https://loremflickr.com/162/322",
    },
    {
      height: 376,
      width: 225,
      src: "https://loremflickr.com/376/225",
    },
    {
      height: 279,
      width: 330,
      src: "https://loremflickr.com/279/330",
    },
    {
      height: 165,
      width: 403,
      src: "https://loremflickr.com/165/403",
    },
    {
      height: 286,
      width: 381,
      src: "https://loremflickr.com/286/381",
    },
    {
      height: 251,
      width: 232,
      src: "https://loremflickr.com/251/232",
    },
    {
      height: 292,
      width: 161,
      src: "https://loremflickr.com/292/161",
    },
    {
      height: 321,
      width: 366,
      src: "https://loremflickr.com/321/366",
    },
    {
      height: 356,
      width: 399,
      src: "https://loremflickr.com/356/399",
    },
    {
      height: 370,
      width: 343,
      src: "https://loremflickr.com/370/343",
    },
    {
      height: 367,
      width: 237,
      src: "https://loremflickr.com/367/237",
    },
  ],
};

export const ManyBroadImages = Template.bind({});

ManyBroadImages.args = {
  sx: { width: "700px", overflowY: "hidden" },
  images: [
    {
      height: 440,
      width: 141,
      src: "https://loremflickr.com/440/141",
    },
    {
      height: 420,
      width: 152,
      src: "https://loremflickr.com/420/152",
    },
    {
      height: 350,
      width: 120,
      src: "https://loremflickr.com/350/120",
    },
    {
      height: 249,
      width: 282,
      src: "https://loremflickr.com/249/282",
    },
    {
      height: 355,
      width: 414,
      src: "https://loremflickr.com/355/414",
    },
    {
      height: 350,
      width: 150,
      src: "https://loremflickr.com/350/150",
    },
    {
      height: 400,
      width: 200,
      src: "https://loremflickr.com/400/200",
    },
    {
      height: 444,
      width: 350,
      src: "https://loremflickr.com/444/350",
    },
    {
      height: 344,
      width: 437,
      src: "https://loremflickr.com/344/437",
    },
    {
      height: 185,
      width: 237,
      src: "https://loremflickr.com/185/237",
    },
    {
      height: 431,
      width: 152,
      src: "https://loremflickr.com/431/152",
    },
    {
      height: 162,
      width: 322,
      src: "https://loremflickr.com/162/322",
    },
    {
      height: 376,
      width: 225,
      src: "https://loremflickr.com/376/225",
    },
    {
      height: 279,
      width: 330,
      src: "https://loremflickr.com/279/330",
    },
    {
      height: 420,
      width: 120,
      src: "https://loremflickr.com/420/120",
    },
    {
      height: 425,
      width: 170,
      src: "https://loremflickr.com/425/170",
    },
    {
      height: 415,
      width: 189,
      src: "https://loremflickr.com/415/189",
    },
    {
      height: 370,
      width: 161,
      src: "https://loremflickr.com/370/161",
    },
    {
      height: 321,
      width: 366,
      src: "https://loremflickr.com/321/366",
    },
    {
      height: 356,
      width: 399,
      src: "https://loremflickr.com/356/399",
    },
    {
      height: 370,
      width: 151,
      src: "https://loremflickr.com/370/151",
    },
    {
      height: 403,
      width: 201,
      src: "https://loremflickr.com/403/201",
    },
  ],
};

export const ManyHighImages = Template.bind({});
ManyHighImages.args = {
  sx: { width: "700px", overflowY: "hidden" },
  images: [
    {
      height: 440,
      width: 141,
      src: "https://loremflickr.com/141/440",
    },
    {
      height: 420,
      width: 152,
      src: "https://loremflickr.com/152/420",
    },
    {
      height: 350,
      width: 120,
      src: "https://loremflickr.com/120/350",
    },
    {
      height: 249,
      width: 282,
      src: "https://loremflickr.com/282/249",
    },
    {
      height: 355,
      width: 414,
      src: "https://loremflickr.com/414/355",
    },
    {
      height: 350,
      width: 150,
      src: "https://loremflickr.com/150/350",
    },
    {
      height: 400,
      width: 200,
      src: "https://loremflickr.com/200/400",
    },
    {
      height: 444,
      width: 350,
      src: "https://loremflickr.com/350/444",
    },
    {
      height: 344,
      width: 437,
      src: "https://loremflickr.com/437/344",
    },
    {
      height: 185,
      width: 237,
      src: "https://loremflickr.com/237/185",
    },
    {
      height: 431,
      width: 152,
      src: "https://loremflickr.com/152/431",
    },
    {
      height: 162,
      width: 322,
      src: "https://loremflickr.com/322/162",
    },
    {
      height: 376,
      width: 225,
      src: "https://loremflickr.com/225/376",
    },
    {
      height: 279,
      width: 330,
      src: "https://loremflickr.com/330/279",
    },
    {
      height: 420,
      width: 120,
      src: "https://loremflickr.com/120/420",
    },
    {
      height: 425,
      width: 170,
      src: "https://loremflickr.com/170/425",
    },
    {
      height: 415,
      width: 189,
      src: "https://loremflickr.com/189/415",
    },
    {
      height: 370,
      width: 161,
      src: "https://loremflickr.com/161/370",
    },
    {
      height: 321,
      width: 366,
      src: "https://loremflickr.com/366/321",
    },
    {
      height: 356,
      width: 399,
      src: "https://loremflickr.com/399/356",
    },
    {
      height: 370,
      width: 151,
      src: "https://loremflickr.com/151/370",
    },
    {
      height: 403,
      width: 201,
      src: "https://loremflickr.com/201/403",
    },
  ],
};
