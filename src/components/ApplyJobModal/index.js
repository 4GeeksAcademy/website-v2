import React, { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { H4 } from "../Heading";

import styled from "styled-components";
import { GridContainer, Div } from "../Sections";
import { Button, Colors } from "../Styling";
import Icon from "../Icon";
import { SessionContext } from "../../session";
import { applyJob } from "../../actions";
import { Input } from "../Form";

const formIsValid = (formData = null) => {
  if (!formData) return null;
  for (let key in formData) {
    if (!formData[key].valid) return false;
  }
  return true;
};

const Form = styled.form`
  padding: 0 0 35px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ModalBox = styled.div`
  position: fixed;
  padding: ${(props) => props.padding};
  left: 50%;
  top: ${(props) => props.top || "50%"};
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: white;
  overflow: hidden;
  display: ${(props) => (props.open ? "block" : "none")};
`;
const ApplyJobModal = (props) => {
  const {
    form_data,
    lang,
    heading,
    top,
    boxPadding,
    open,
    onClose,
    title_job,
    children,
  } = props;
  const { session } = React.useContext(SessionContext);
  const [formStatus, setFormStatus] = useState({
    status: "idle",
    msg: "Resquest",
  });
  const [formData, setVal] = useState({
    full_name: { value: "", valid: false },
    location: { value: "", valid: false },

    email: { value: "", valid: false },
    phone: { value: "", valid: false },

    resume: { value: null, valid: true },
    linkedin: { value: "", valid: true },
    website: { value: "", valid: true },
  });

  const findElement = (inputName, type) => {
    return form_data.form_fields.find((field) => field.name === inputName)[
      type
    ];
  };

  return (
    <ModalBox
      className="set-overflow hideOverflowX__"
      top={top}
      padding={boxPadding}
      open={open}
    >
      <GridContainer
        github="/components/job"
        columns_tablet="12"
        // margin_tablet="70px 0 0 0"
        // margin="70px 0 0 0"
        padding="40px 15px 0 15px"
        padding_tablet="40px 0 0 0"
      >
        <Div flexDirection="column" gridColumn_tablet=" 2 / 12">
          <Button
            style={{ margin: "8px 0 0 0", padding: "0", width: "fit-content" }}
            onClick={onClose}
          >
            <Icon
              icon="arrowLeft2"
              width="32"
              // color={Colors.blue}
              // fill={Colors.blue}
            />
          </Button>

          {formStatus.status === "thank-you" ? (
            <Div
              alignItems="center"
              height="50vh"
              flexDirection="column"
              justifyContent="center"
            >
              <Icon icon="success" />
              <H4
                fontSize="15px"
                lineHeight="26px"
                padding="25px 4%"
                padding_tablet="25px 30%"
                textAlign="center"
                align="center"
              >
                {form_data.apply_job.thankyou}
              </H4>
              <Button
                color={Colors.blue}
                textColor={Colors.white}
                margin="5px 0"
                variant="full"
                onClick={onClose}
                type="button"
                fontSize="12px"
              >
                {form_data.apply_job.close}
              </Button>
            </Div>
          ) : (
            <>
              <H4
                type="h4"
                margin="34px 0"
                textAlign="center"
                // display="none"
                textAlign_tablet="left"
                fontSize="30px"
                lineHeight="36px"
                fontWeight="700"
                display_tablet="block"
              >
                {title_job}
              </H4>
              <Div width="100%" height="1px" background="#C4C4C4" />
              <H4
                type="h4"
                margin="34px 0 22px 0"
                textAlign="left"
                // display="none"
                fontSize="22px"
                display_tablet="block"
              >
                {form_data.apply_job.text}
              </H4>

              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (formStatus.status === "error") {
                    setFormStatus({ status: "idle", msg: "Resquest" });
                  }
                  if (!formIsValid(formData)) {
                    setFormStatus({
                      status: "error",
                      msg: "There are some errors in your form",
                    });
                  } else {
                    setFormStatus({ status: "loading", msg: "Loading..." });
                    applyJob(formData, session)
                      .then((data) => {
                        if (data.error !== false && data.error !== undefined) {
                          setFormStatus({
                            status: "error",
                            msg: "Fix errors",
                          });
                        } else {
                          setFormStatus({
                            status: "thank-you",
                            msg: "Thank you",
                          });
                        }
                      })
                      .catch((error) => {
                        console.log("error", error);
                        setFormStatus({
                          status: "error",
                          msg: error.message || error,
                        });
                      });
                  }
                }}
              >
                <Input
                  type="text"
                  className="form-control"
                  width="100%"
                  placeholder={findElement("full_name", "place_holder")}
                  borderRadius="3px"
                  bgColor={Colors.white}
                  margin="0"
                  onChange={(value, valid) => {
                    setVal({ ...formData, full_name: { value, valid } });
                    if (formStatus.status === "error") {
                      setFormStatus({ status: "idle", msg: "Resquest" });
                    }
                  }}
                  value={formData.full_name.value || ""}
                  errorMsg={findElement("full_name", "error")}
                  required={findElement("full_name", "required")}
                />

                <Input
                  type="text"
                  className="form-control"
                  width="100%"
                  placeholder={findElement("location", "place_holder")}
                  borderRadius="3px"
                  bgColor={Colors.white}
                  margin="0"
                  onChange={(value, valid) => {
                    setVal({ ...formData, location: { value, valid } });
                    if (formStatus.status === "error") {
                      setFormStatus({ status: "idle", msg: "Resquest" });
                    }
                  }}
                  value={formData.location.value || ""}
                  errorMsg={findElement("location", "error")}
                  required={findElement("location", "required")}
                />
                <Div flexDirection="row" gap="24px">
                  <Input
                    type="email"
                    className="form-control"
                    width="100%"
                    placeholder={findElement("email", "place_holder")}
                    borderRadius="3px"
                    bgColor={Colors.white}
                    margin="0"
                    onChange={(value, valid) => {
                      setVal({ ...formData, email: { value, valid } });
                      if (formStatus.status === "error") {
                        setFormStatus({ status: "idle", msg: "Resquest" });
                      }
                    }}
                    value={formData.email.value || ""}
                    errorMsg={findElement("email", "error")}
                    required={findElement("email", "required")}
                  />

                  <Input
                    type="text"
                    className="form-control"
                    width="100%"
                    placeholder={findElement("phone", "place_holder")}
                    borderRadius="3px"
                    bgColor={Colors.white}
                    margin="0"
                    onChange={(value, valid) => {
                      setVal({ ...formData, phone: { value, valid } });
                      if (formStatus.status === "error") {
                        setFormStatus({ status: "idle", msg: "Resquest" });
                      }
                    }}
                    value={formData.phone.value || ""}
                    errorMsg={findElement("phone", "error")}
                    required={findElement("phone", "required")}
                  />
                </Div>

                <Input
                  type="file"
                  // input-file
                  className="form-control"
                  width="100%"
                  borderRadius="3px"
                  bgColor={Colors.white}
                  margin="0"
                  onChange={(value, valid) => {
                    setVal({ ...formData, resume: { value, valid } });
                    if (formStatus.status === "error") {
                      setFormStatus({ status: "idle", msg: "Resquest" });
                    }
                  }}
                  value={formData.resume.value || ""}
                  errorMsg="Please send your resume file"
                  required
                />

                <Input
                  type="text"
                  className="form-control"
                  width="100%"
                  placeholder="https://linkedin.com/in/..."
                  borderRadius="3px"
                  bgColor={Colors.white}
                  margin="0"
                  onChange={(value, valid) => {
                    setVal({ ...formData, linkedin: { value, valid } });
                    if (formStatus.status === "error") {
                      setFormStatus({ status: "idle", msg: "Resquest" });
                    }
                  }}
                  value={formData.linkedin.value || ""}
                />

                <Input
                  type="text"
                  className="form-control"
                  width="100%"
                  placeholder="https://website-exmaple.me"
                  borderRadius="3px"
                  bgColor={Colors.white}
                  margin="0"
                  onChange={(value, valid) => {
                    setVal({ ...formData, website: { value, valid } });
                    if (formStatus.status === "error") {
                      setFormStatus({ status: "idle", msg: "Resquest" });
                    }
                  }}
                  value={formData.website.value || ""}
                />
                <Button
                  height="40px"
                  margin="5px 0 0 auto"
                  type="submit"
                  fontSize="12px"
                  variant="full"
                  color={
                    formStatus.status === "loading"
                      ? Colors.darkGray
                      : Colors.blue
                  }
                  textColor={Colors.white}
                  disabled={formStatus.status === "loading" ? true : false}
                >
                  {formStatus.status === "loading"
                    ? "Loading..."
                    : `${form_data.apply_job.apply_button_text.toUpperCase()}`}
                </Button>
              </Form>
            </>
          )}

          {children}
        </Div>
      </GridContainer>
    </ModalBox>
  );
};
ApplyJobModal.propTypes = {
  open: PropTypes.bool,
};
ApplyJobModal.defaultProps = {
  open: false,
};
export default ApplyJobModal;
