import { useRef } from "react";
import LinearPlotFromSourceExample from "./041/LinearPlotFromSourceExample";
import Gallery from "./042/Gallery";
import useIndexDB from "./044/hooks/useIndexDB";
import useLocalStorage from "./044/hooks/useLocalStorage";
import useSessionStorage from "./044/hooks/useSessionStorage";
// import "./App.css";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import SamplePage from "./041/SamplePage";
import { Provider } from "react-redux";
import { store } from "./app/store";

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

function Main() {
  return (
    <div>
      <h1>React exercises</h1>
      <ul>
        <li>
          <Link to="041">041</Link>
        </li>
        <li>
          <Link to="042">042</Link>
        </li>
        <li>
          <Link to="044">044</Link>
        </li>
      </ul>
    </div>
  );
}

function App() {
  // type Posibility = "plot" | "gallery" | "hooks";
  // const toRender = "hooks" as Posibility;
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="041" element={<SamplePage />} />
            <Route path="042" element={<ExampleGallery />} />
            <Route path="044" element={<ExampleHooks />} />
          </Routes>
          <div>
            <Link to="/">back</Link>
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
