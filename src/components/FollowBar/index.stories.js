import React from "react";
import { storiesOf } from "@storybook/react";

import UpcomingPrograms from ".";

storiesOf("UpcomingPrograms", module)
  .add("Default", () => <UpcomingPrograms />)
  .add("bottom", () => (
    <UpcomingPrograms
      position="bottom"
      title="Full Stack Web Development (part-time)"
    />
  ));
