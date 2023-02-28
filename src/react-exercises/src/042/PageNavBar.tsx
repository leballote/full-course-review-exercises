import PageButton from "./PageButton";
import styles from "./PageNavBar.module.css";

type Props = {
  pageIndex: number[];
  isFirstPage?: boolean;
  isLastPage?: boolean;
  onGoPageClick?: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    pageNum: number
  ) => void;
  onPrevClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onNextClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function PageNavBar({
  pageIndex,
  isFirstPage = false,
  isLastPage = false,
  onGoPageClick,
  onPrevClick,
  onNextClick,
}: Props) {
  return (
    <nav className={styles["navbar"]}>
      <button onClick={onPrevClick} disabled={isFirstPage}>
        prev
      </button>
      <ul className={styles["index-buttons"]}>
        {pageIndex.map((num) => {
          return (
            <li key={num}>
              <PageButton pageNum={num} onGoPageClick={onGoPageClick} />
            </li>
          );
        })}
      </ul>
      <button onClick={onNextClick} disabled={isLastPage}>
        next
      </button>
    </nav>
  );
}
