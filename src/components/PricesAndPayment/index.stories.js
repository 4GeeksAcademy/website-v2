import React from "react";
import { storiesOf } from "@storybook/react";

import PricesAndPayment from ".";

storiesOf("PricesAndPayment", module).add("Default", () => (
  <PricesAndPayment lang={"us"} />
));
