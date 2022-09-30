import React from "react";
import { storiesOf } from "@storybook/react";

import FinancialFilter from ".";

storiesOf("FinancialFilter", module).add("Default", () => (
  <FinancialFilter lang={"us"} />
));
