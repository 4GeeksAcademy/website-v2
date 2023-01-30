import React, { useState, useContext, useEffect } from "react";
import { H4, Paragraph } from "../Heading";
import { Colors, Button, Link } from "../Styling";
import { Div } from "../Sections";
import { SessionContext } from "../../session";

const CustomBar = ({ isContentBarActive, contentBar }) => {
  return (
    <Div
      id="custom-bar"
      key="custom-bar"
      display={isContentBarActive ? "flex" : "none"}
      style={{ top: "0px" }}
      width="100%"
      height="auto"
      minHeight="50px"
      padding="10px 20px"
      alignItems="center"
      background="#0097CD"
      position="fixed"
      zIndex="99"
    >
      {contentBar.message && (
        <Paragraph
          dangerouslySetInnerHTML={{ __html: contentBar.message }}
          color={Colors.white}
          textAlign="center"
          padding="0 10px"
          padding_tablet="0 12%"
          fontSize="15px"
          lineHeight="22px"
        />
      )}
      {contentBar.button?.label !== undefined &&
        contentBar.button?.label !== "" && (
          <Div alignItems="center" justifyContent="between">
            <Link to={contentBar.button.path || "#"}>
              <Button
                variant="full"
                style={{ height: "34px", padding: "16px 20px" }}
                width="100%"
                width_tablet="max-content"
                color={Colors.black}
                textColor={Colors.white}
              >
                {contentBar.button.label}
              </Button>
            </Link>
          </Div>
        )}
    </Div>
  );
};

export default CustomBar;
