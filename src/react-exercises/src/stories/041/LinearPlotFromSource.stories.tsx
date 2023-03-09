import { LinearPlotFromSource } from "../../041/LinearPlotFromSource";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { data100, data300, data50 } from "./linearPlotDataStoryData";

export default {
  title: "041/LinearPlotFromSource",
  component: LinearPlotFromSource,
} as ComponentMeta<typeof LinearPlotFromSource>;

const Template: ComponentStory<typeof LinearPlotFromSource> = (args) => (
  <LinearPlotFromSource {...args} />
);

export const IntervalExample = Template.bind({});

function sourceFn(emitter: any, END: any, getValues: any) {
  const maxSecs = 1000;
  let secs = 0;
  const interval = setInterval(() => {
    if (secs++ >= maxSecs) {
      emitter(END);
    } else {
      emitter([[secs, Math.random()], ...getValues()]);
    }
  }, 800);

  return () => {
    clearInterval(interval);
  };
}

IntervalExample.args = {
  intialValues: [],
  source: {
    sourceFn,
  },
};
