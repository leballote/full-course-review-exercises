import { useRef } from "react";
import LinearPlotFromSourceExample from "./041/LinearPlotFromSourceExample";
import Gallery from "./042/Gallery";
import useIndexDB from "./044/hooks/useIndexDB";
import "./App.css";

function App() {
  const [hey, setHey] = useIndexDB<any>("hey", { foo: "bar" });
  console.log("hey", hey);

  // const galleryRef = useRef<HTMLUListElement>(null);

  // SUGGESTION: even though you could technically use window or body as scrollers, their API's are slightly difference so I would have to make some edge cases to support those as
  // const bodyRef = useRef<HTMLElement>(document.body);
  // const windowRef = useRef<any>(window);
  // const galleryBodyRef = useRef<HTMLUListElement>(null);
  return (
    <div className="App">
      <h1>{JSON.stringify(hey)}</h1>
      <button
        onClick={() => {
          setHey({ foo: "baz" });
        }}
      >
        SET
      </button>
      {/* <LinearPlotFromSourceExample /> */}
      {/* <Gallery
        scrollerRef={galleryBodyRef}
        galleryBodyRef={galleryBodyRef}
        galleryBodySx={{ height: "600px" }}
      /> */}
    </div>
  );
}

export default App;
