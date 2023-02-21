import style from "./Point.module.css";

type Props = {
  point: [number, number];
};

console.log(typeof style);

export function Point(props: Props) {
  return (
    <div style={{  }} className={style.point}>
      hi
    </div>
  );
}
