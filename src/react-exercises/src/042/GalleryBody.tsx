import { ImageList, ImageListItem } from "@mui/material";
import React from "react";

type Image = {
  src: string;
  width: number;
  height: number;
};

export type GalleryBodySxType = React.ComponentProps<typeof ImageList>["sx"];
type Props = {
  page: string;
  images: Image[];
  onScroll?: React.UIEventHandler<HTMLUListElement>;
  innerRef?: React.RefObject<HTMLUListElement>;
  sx?: GalleryBodySxType;
};

const GalleryBody = React.forwardRef<HTMLUListElement, Props>(
  ({ page, images, onScroll, sx }, ref) => {
    return (
      <ImageList
        cols={4}
        onScroll={onScroll}
        ref={ref}
        sx={sx}
        data-testid={"galleryBody"}
      >
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
                  data-page={page}
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
