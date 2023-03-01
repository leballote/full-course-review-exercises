import { ImageList, ImageListItem } from "@mui/material";
import React from "react";

type Image = {
  src: string;
  width: number;
  height: number;
};

type Props = {
  images: Image[];
  onScroll?: React.UIEventHandler<HTMLUListElement>;
  innerRef?: React.RefObject<HTMLUListElement>;
};

const GalleryBody = React.forwardRef<HTMLUListElement, Props>(
  ({ images, onScroll }, ref) => {
    return (
      <ImageList cols={4} onScroll={onScroll} ref={ref}>
        {images.map((image) => {
          return (
            <ImageListItem
              sx={{
                "& picture": {
                  height: "100%",
                },
                "& img": {
                  objectFit: "cover",
                },
              }}
              key={image.src}
              cols={image.width >= 2 * image.height ? 2 : 1}
              rows={image.height >= 2 * image.width ? 2 : 1}
            >
              <picture>
                <img
                  loading="lazy"
                  src={image.src}
                  width="100%"
                  height="100%"
                  alt=""
                />
              </picture>
            </ImageListItem>
          );
        })}
      </ImageList>
    );
  }
);

export default GalleryBody;
