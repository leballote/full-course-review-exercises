import { store } from "./app/store";
import { Provider } from "react-redux";
import { LinearPlotFromSource } from "./components2/LinearPlotFromSource";

function sourceFn(emitter: any, END: any, getValues: any) {
  const maxSecs = 1000;
  let secs = 0;
  const interval = setInterval(() => {
    if (secs++ >= maxSecs) {
      emitter(END);
    } else {
      emitter([[secs, Math.random()], ...getValues()]);
    }
  }, 100);

  return () => {
    clearInterval(interval);
  };
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LinearPlotFromSource source={{ sourceFn }} />
      </div>
    </Provider>
  );
}

export default App;
