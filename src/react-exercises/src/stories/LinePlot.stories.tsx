import { LinearPlot } from "../041/LinearPlot";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "041/LinearPlot",
  component: LinearPlot,
} as ComponentMeta<typeof LinearPlot>;

const Template: ComponentStory<typeof LinearPlot> = (args) => (
  <LinearPlot {...args} />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  values: [
    [1, 1],
    [2, 1],
    [3, 3],
  ],
};
