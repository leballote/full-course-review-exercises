import React from "react";
import styles from "./GalleryBody.module.css";

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
      <ul
        className={styles["gallery-body"]}
        onScroll={onScroll}
        style={{ backgroundColor: "aqua", overflowY: "scroll" }}
        ref={ref}
      >
        {images.map((image) => {
          return (
            <li key={image.src}>
              <picture>
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt=""
                />
              </picture>
            </li>
          );
        })}
      </ul>
    );
  }
);

export default GalleryBody;
