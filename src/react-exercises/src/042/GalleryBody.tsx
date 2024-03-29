import { ImageList, ImageListItem } from "@mui/material";
import React from "react";

type Image = {
  src: string;
  height: number;
  width: number;
};

export type GalleryBodySxType = React.ComponentProps<typeof ImageList>["sx"];
type Props = {
  pageNo: number;
  images: Image[];
  onScroll?: React.UIEventHandler<HTMLUListElement>;
  innerRef?: React.RefObject<HTMLUListElement>;
  sx?: GalleryBodySxType;
};

const GalleryBody = React.forwardRef<HTMLUListElement, Props>(
  ({ pageNo: page, images, onScroll, sx }, ref) => {
    return (
      <ImageList
        cols={4}
        onScroll={onScroll}
        ref={ref}
        sx={sx}
        data-testid="galleryBody"
        rowHeight={200}
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
              cols={image.height >= 2 * image.width ? 2 : 1}
              rows={image.width >= 2 * image.height ? 2 : 1}
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
