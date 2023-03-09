import PageNavbar from "../../042/PageNavbar";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "041/PageNavbar",
  component: PageNavbar,
} as ComponentMeta<typeof PageNavbar>;

const Template: ComponentStory<typeof PageNavbar> = (args) => (
  <PageNavbar {...args} />
);

export const NotFirstNorLast = Template.bind({});

NotFirstNorLast.args = {
  pageIndex: [1, 2, 3, 4, 5, 6, 7, 10],
  currentIndex: 5,
};

export const FirstPage = Template.bind({});

FirstPage.args = {
  pageIndex: [1, 2, 3, 4, 5, 6, 7, 10],
  currentIndex: 1,
};

export const LastPage = Template.bind({});

LastPage.args = {
  pageIndex: [1, 2, 3, 4, 5, 6, 7, 10],
  currentIndex: 10,
};

export const LongBar = Template.bind({});

LongBar.args = {
  pageIndex: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ],
  currentIndex: 5,
};
