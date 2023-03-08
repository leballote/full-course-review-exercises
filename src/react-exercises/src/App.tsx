import { useRef } from "react";
import LinearPlotFromSourceExample from "./041/LinearPlotFromSourceExample";
import Gallery from "./042/Gallery";
import useIndexDB from "./044/hooks/useIndexDB";
import useLocalStorage from "./044/hooks/useLocalStorage";
import useSessionStorage from "./044/hooks/useSessionStorage";
import "./App.css";

function ExampleHooks() {
  const [hey, setHey] = useIndexDB<any>("hey", { foo: "bar" });
  // const [hey, setHey] = useIndexDB<any>("indexDB2", "state2", "hey", {
  //   foo: "bar",
  // });

  return (
    <div>
      <h1>{JSON.stringify(hey)}</h1>
      <button
        onClick={() => {
          setHey({ foo: "baz" });
        }}
      >
        SET BAZ
      </button>
      <button
        onClick={() => {
          setHey({ foo: "bar" });
        }}
      >
        SET BAR
      </button>
    </div>
  );
}

function ExamplePlot() {
  return (
    <div className="App">
      <LinearPlotFromSourceExample />
    </div>
  );
}

function ExampleGallery() {
  // SUGGESTION: even though you could technically use window or body as scrollers, their API's are slightly difference so I would have to make some edge cases to support those as
  // const bodyRef = useRef<HTMLElement>(document.body);
  // const windowRef = useRef<any>(window);
  // const galleryRef = useRef<HTMLUListElement>(null);

  const galleryBodyRef = useRef<HTMLUListElement>(null);
  return (
    <Gallery
      baseURL="http://localhost:3000"
      scrollerRef={galleryBodyRef}
      galleryBodyRef={galleryBodyRef}
      galleryBodySx={{ height: "600px" }}
    />
  );
}

function App() {
  type Posibility = "plot" | "gallery" | "hooks";
  const toRender = "hooks" as Posibility;
  return (
    <>
      {toRender == "gallery" ? <ExampleGallery /> : null}
      {toRender == "plot" ? <ExamplePlot /> : null}
      {toRender == "hooks" ? <ExampleHooks /> : null}
    </>
  );
}

export default App;
