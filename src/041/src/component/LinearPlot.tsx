import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Point,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

type Props = {
  values: Array<[number, number]>;
};

export function LinearPlot({ values }: Props) {
  values = values.slice(0, 100);

  return (
    <Line
      // width="500px"
      options={{
        animation: false,
      }}
      data={{
        labels: values.map((point) => point[0]),
        datasets: [
          {
            label: "Acquisitions by year",
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            data: values.map((point) => point[1]),
          },
        ],
      }}
    />
  );
}
