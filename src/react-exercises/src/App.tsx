import { useRef } from "react";
import LinearPlotFromSourceExample from "./041/LinearPlotFromSourceExample";
import Gallery from "./042/Gallery";

function App() {
  const galleryRef = useRef<HTMLUListElement>(null);
  const galleryBodyRef = useRef<HTMLUListElement>(null);
  return (
    <div className="App">
      {/* <LinearPlotFromSourceExample /> */}
      <Gallery scrollerRef={galleryBodyRef} galleryBodyRef={galleryBodyRef} />
    </div>
  );
}

export default App;
