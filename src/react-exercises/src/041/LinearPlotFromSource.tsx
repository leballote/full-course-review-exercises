import { LinearPlot } from "./LinearPlot";
import { useAppSelector } from "../app/hooks";

type Point = [number, number];

type Props = {
  plotId: string;
  initialValues?: Point[];
};

export function LinearPlotFromSource({ plotId, initialValues = [] }: Props) {
  const values =
    useAppSelector((state) => state.graphs[plotId]?.values) ?? initialValues;

  return <LinearPlot values={values} />;
}
