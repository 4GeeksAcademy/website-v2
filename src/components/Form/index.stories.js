import React from "react";
import { storiesOf } from "@storybook/react";

import { Input, Alert } from ".";

storiesOf("Input", module).add("email", () => (
  <div style={{ width: "500px", margin: "auto" }}>
    <Input
      type="email"
      className="form-control"
      placeholder={"Your email"}
      required={true}
      errorMsg={"Please enter a valid email"}
    />
  </div>
));

storiesOf("Input", module).add("validation function", () => (
  <Input
    type="number"
    className="form-control"
    placeholder={"4 Digit number"}
    pattern={/^\d{1,4}$/}
    required={false}
    errorMsg="Please enter number with 1 or max 4 digits"
  />
));

storiesOf("Alert", module).add("Default", () => (
  <Alert props="red">Hello</Alert>
));
