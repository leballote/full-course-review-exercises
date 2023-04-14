import { LinearPlotFromSource } from "./LinearPlotFromSource";
import LinearPlotFromSourceExample from "./LinearPlotFromSourceExample";

export default function SamplePage() {
  return (
    <div>
      <h1>Sample Page</h1>
      <div>
        <LinearPlotFromSource plotId="example1" />
      </div>
      <div>
        <LinearPlotFromSource plotId="example2" />
      </div>
    </div>
  );
}
