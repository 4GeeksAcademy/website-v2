import React from "react";
import Editor from "react-simple-code-editor";
import styled from "styled-components";
import { Row, Column } from "../components/Sections";
import { Colors } from "../components/Styling";
import { H2 } from "../components/Heading";
import jsyaml from "js-yaml";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-yaml";

const load = (content) => {
  try {
    const yaml = jsyaml.load(content);
    console.log("yaml", yaml);
    if (typeof yaml == "undefined" || !yaml)
      throw new Error(`The file content was impossible to parse`);
    return true;
  } catch (error) {
    return error.message || error;
  }
};

const Button = styled.div`
  background: ${Colors.lightGray};
  cursor: pointer;
  border: 1px solid ${Colors.darkGray};
  padding: 5px;
  font-size: 14px;
`;
const EditPage = (props) => {
  const { pageContext } = props;
  console.log(pageContext);
  const [content, setContent] = React.useState("Hello World");
  const [status, setStatus] = React.useState({ state: "idle", message: "" });
  return (
    <>
      <Row
        display="flex"
        background={Colors.lightGray}
        padding="10px"
        justifyContent="center"
      >
        <H2 fontSize="25px" fs_md="20px">
          Type your YML content and validate it
        </H2>
      </Row>
      {status.state !== "idle" ? (
        <Row
          display="flex"
          justifyContent="center"
          background={
            status.state === "error" ? Colors.lightRed : Colors.lightGreen
          }
          onClick={() => setStatus({ state: "idle", message: "" })}
        >
          {status.message}
        </Row>
      ) : (
        <Row display="flex" justifyContent="center">
          <Button
            variant="full"
            type="button"
            width="100px"
            onClick={() => {
              const success = load(content);
              if (success !== true)
                setStatus({ state: "error", message: success });
              else
                setStatus({
                  state: "success",
                  message: "Everything is amazing 🤣!",
                });
            }}
          >
            Validate
          </Button>
        </Row>
      )}
      <Column size="10" size_sm="12" margin="auto">
        <Editor
          value={content}
          onValueChange={(_content) => {
            setContent(_content);
            setStatus({ state: "idle", message: "" });
          }}
          highlight={(_content) => highlight(_content, languages.yaml)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
          }}
        />
      </Column>
    </>
  );
};
export default EditPage;
