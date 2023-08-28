import React, { useState } from "react";
import { Container, Row, Column, Grid, Div, GridContainer } from "../Sections";
import { Colors, RoundImage, Anchor, Button } from "../Styling";
import { H2, H3, H4, H5, Separator, Paragraph } from "../Heading";
import { Devices } from "../Responsive";
import Icon from "../Icon";
import { newsletterSignup } from "../../actions";
import { SessionContext } from "../../session";
import { Input } from "../Form";
import { Link } from "gatsby";
import styled from "styled-components";

const formIsValid = (formData = null) => {
  if (!formData) return null;
  for (let key in formData) {
    if (!formData[key].valid) return false;
  }
  return true;
};
const positions = [
  {
    position: "1 / 5",
  },
  {
    position: "5 / 8",
  },
  {
    position: "8 / 11",
  },
  {
    position: "11 / 13",
  },
];

const Form = styled.form`
  margin: 0 11px 0 0;
  width: 100%;
  display: flex;
  @media ${Devices.xs} {
  }
  @media ${Devices.md} {
  }
`;

const Footer = ({ yml }) => {
  const { session } = React.useContext(SessionContext);
  let socials = session && session.location ? session.location.socials : [];

  const [formStatus, setFormStatus] = useState({
    status: "idle",
    msg: "Resquest",
  });
  const [formData, setVal] = useState({
    email: { value: "", valid: false },
    consent: { value: true, valid: true },
  });

  return (
    <>
      <GridContainer margin="44px 0" margin_tablet="0 0 40px 0">
        <Div background="#EBEBEB" height="1px" />
      </GridContainer>
      <GridContainer
        github="/components/footer"
        gridTemplateRows_tablet="2"
        columns_tablet="12"
        padding="0 17px"
        margin="0 0 60px 0"
      >
        <Div
          justifyContent="center"
          alignItems="center"
          height="43px"
          width="100%"
          width_tablet="143px"
          height_tablet="100%"
          borderRadius="3px"
          gridArea_tablet="1/1/2/3"
        >
          <RoundImage
            url="/images/4geeksacademy-logo.png"
            height="43px"
            width="143px"
            backgroundColor="transparent"
            position="center"
            bsize="contain"
          />
        </Div>
        <Div
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="43px"
          width="100%"
          width_tablet="100%"
          height_tablet="100%"
          borderRadius="3px"
          gridArea_tablet="1/10/2/13"
        >
          <H4 margin="0 0 10px 0" display="none" display_md="block">
            {yml.newsletter.heading}
          </H4>
          <Div>
            {(yml.socials || socials).map((ln, i) => {
              if (!ln.icon) return null;
              return (
                <Anchor
                  key={i}
                  cursor="pointer"
                  to={ln.link}
                  // textAlign="left"
                  margin="0 0 5px 0"
                  fontSize="13px"
                  // lineHeight="22px"
                  fontWeight="400"
                  // textTransform="uppercase"
                  color={Colors.black}
                >
                  <Icon
                    icon={ln.icon}
                    style={{ margin: "0 15px 0 0" }}
                    color={Colors.black}
                    fill={Colors.black}
                    height="32px"
                    width="32px"
                  />
                </Anchor>
              );
            })}
          </Div>
        </Div>

        <Div
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="0 40px"
          height="43px"
          width="100%"
          borderRadius="3px"
          width_tablet="100%"
          height_tablet="100%"
          gridArea_tablet="1/3/2/10"
          borderRight_tablet={`1px solid ${Colors.lightGray}`}
        >
          {formStatus.status === "thank-you" ? (
            <Div alignItems="center">
              <Icon icon="success" />{" "}
              <H4
                fontSize="15px"
                lineHeight="22px"
                margin="10px 0 10px 10px"
                align="center"
              >
                {yml.newsletter.thankyou}
              </H4>
            </Div>
          ) : (
            <>
              <H4
                margin="0 0 10px 0"
                textAlign="left"
                display="none"
                display_tablet="block"
              >
                {yml.newsletter.heading}
              </H4>
              <Div justifyContent="center" width="100%">
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
                      newsletterSignup(formData, session)
                        .then((data) => {
                          if (
                            data.error !== false &&
                            data.error !== undefined
                          ) {
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
                    type="email"
                    className="form-control"
                    width="100%"
                    placeholder="Email *"
                    borderRadius="3px"
                    bgColor={Colors.white}
                    margin="0"
                    onChange={(value, valid) => {
                      setVal({ ...formData, email: { value, valid } });
                      if (formStatus.status === "error") {
                        setFormStatus({ status: "idle", msg: "Resquest" });
                      }
                    }}
                    value={formData.email.value}
                    errorMsg="Please specify a valid email"
                    required
                  />
                  {/* <button type="submit">{formStatus.status === "loading" ? "Loading..." : "text"}</button> */}
                  <Button
                    height="40px"
                    margin="0 0 0 10px"
                    type="submit"
                    fontSize="22px"
                    variant="full"
                    borderRadius="3px"
                    color={
                      formStatus.status === "loading"
                        ? Colors.darkGray
                        : Colors.black
                    }
                    textColor={Colors.white}
                    disabled={formStatus.status === "loading" ? true : false}
                  >
                    {formStatus.status === "loading" ? (
                      "Loading..."
                    ) : (
                      <Icon
                        icon="send"
                        height="16px"
                        width="16px"
                        color={Colors.white}
                        fill={Colors.white}
                      />
                    )}
                  </Button>
                </Form>
              </Div>
            </>
          )}
        </Div>
        {yml.footer.map((item, i) => {
          return (
            <Div
              key={i}
              flexDirection="column"
              gridColumn_tablet={positions[i].position}
            >
              <H3
                color={Colors.darkGray}
                margin="54px 0 11px 0"
                textAlign="left"
                fontSize="15px"
                fontWeight="900"
                lineHeight="19px"
              >
                {item.heading}
              </H3>
              <ul
                style={{
                  columnCount: item.items.length > 5 ? 2 : 1,
                  columnGap: "10px",
                }}
              >
                {item.items.map((ln, i) => {
                  return (
                    <Anchor
                      key={i}
                      cursor="pointer"
                      to={ln.link}
                      margin="0 0 5px 0"
                      fontSize="13px"
                      fontWeight="400"
                      style={{
                        textTransform: "uppercase",
                        lineHeight: "22px",
                        textAlign: "left",
                      }}
                      color={Colors.black}
                    >
                      {ln.name}
                    </Anchor>
                  );
                })}
              </ul>
            </Div>
          );
        })}
      </GridContainer>
      <GridContainer
        columns_tablet="12"
        margin_tablet="27px 0 60px 0"
        display="none"
        display_tablet="grid"
      >
        <Div
          gridArea_tablet="1/7/1/13"
          justifyContent="end"
          alignItems="center"
        >
          <H4
            fontSize="13px"
            lineHeight="22px"
            width="fit-content"
            color={Colors.darkGray}
          >
            We accept:{" "}
          </H4>
          <RoundImage
            url="/images/bitcoin.png"
            height="10px"
            width="65px"
            bsize="contain"
            margin="0 15px"
          />
          <RoundImage
            url="/images/ethereum.png"
            height="20px"
            width="65px"
            bsize="contain"
          />
        </Div>
      </GridContainer>
      <GridContainer
        columns_tablet="12"
        background={Colors.lightGray}
        padding="11px 17px 29px 17px"
        padding_tablet="31px 0"
      >
        <Div
          gridArea_tablet="1/6/1/13"
          justifyContent="end"
          alignItems="center"
          flexDirection="column"
          flexDirection_tablet="row"
          width="100%"
          width_tablet="100%"
          height_tablet="100%"
        >
          {yml.policy ? (
            yml.policy.map((item, i) => (
              <Link key={i} to={item.link}>
                <H4
                  border={i % 2 == 1 && "1px solid"}
                  borderWidth={i % 2 == 1 && "0px 1px 0px 1px"}
                  key={item.name}
                  fontSize="13px"
                  lineHeight="16px"
                  width="fit-content"
                  color={Colors.darkGray}
                  padding="0 15px"
                >
                  {item.name}
                </H4>
              </Link>
            ))
          ) : (
            <>
              <Link to="/us/privacy-policy">
                <H4
                  fontSize="13px"
                  padding="0 15px"
                  lineHeight="16px"
                  width="fit-content"
                  color={Colors.darkGray}
                >
                  Privacy Policy
                </H4>
              </Link>
              <Link to="/us/cookies">
                <H4
                  border="1px solid"
                  padding="0 15px"
                  borderWidth="0px 1px 0px 1px"
                  fontSize="13px"
                  lineHeight="16px"
                  width="fit-content"
                  color={Colors.darkGray}
                >
                  Cookies
                </H4>
              </Link>
              <Link to="/us/terms-conditions">
                <H4
                  fontSize="13px"
                  padding="0 15px"
                  lineHeight="16px"
                  width="fit-content"
                  color={Colors.darkGray}
                >
                  Terms and Conditions
                </H4>
              </Link>
            </>
          )}
        </Div>
        <Div
          gridArea_tablet="1/1/1/6"
          justifyContent="center"
          alignItems="center"
          height_tablet="100%"
        >
          <H4
            fontSize="13px"
            lineHeight="22px"
            textAlign_tablet="left"
            color={Colors.darkGray}
          >
            @ 4Geeks Academy LLC 2019
          </H4>
        </Div>
      </GridContainer>
    </>
  );
};

export default Footer;
