import { useEffect, useState } from "react";

export function LinearPlotFromSourceExample() {
  return null;
}

async function getValues() {
  const valuesRaw = await fetch("./values.json");
  return valuesRaw.json();
}

function useValues(): [Array<[number, number]>] {
  const [values, setValues] = useState<number[]>([]);
  async function getAndSetValues() {
    const values = await getValues();
    setValues(values);
  }
  useEffect(() => {
    getAndSetValues();
  }, []);

  return [
    values.map((value, i) => {
      return [i, value];
    }),
  ];
}
