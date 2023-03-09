import { LinearPlot } from "../../041/LinearPlot";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { data100, data300, data50 } from "./linearPlotDataStoryData";

export default {
  title: "041/LinearPlot",
  component: LinearPlot,
} as ComponentMeta<typeof LinearPlot>;

const Template: ComponentStory<typeof LinearPlot> = (args) => (
  <LinearPlot {...args} />
);

export const SmallPlot = Template.bind({});

SmallPlot.args = {
  values: [
    [1, 1],
    [2, 1],
    [3, 3],
  ],
};

export const MediumPlot = Template.bind({});
MediumPlot.args = {
  values: data50,
};

export const BigPlot = Template.bind({});
BigPlot.args = {
  values: data100,
};

export const Over100Points = Template.bind({});
Over100Points.args = {
  values: data300,
};
