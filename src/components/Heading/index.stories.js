import React from "react";
import { storiesOf } from "@storybook/react";

import { Title } from ".";

storiesOf("Title", module).add("Default", () => (
  <Title>Full Stack Web Development</Title>
));
