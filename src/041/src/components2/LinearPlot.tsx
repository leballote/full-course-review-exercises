type Point = [number, number];

type Props = {
  values: Point[];
};

export function LinearPlot({ values }: Props) {
  return <div>{JSON.stringify(values)}</div>;
}
