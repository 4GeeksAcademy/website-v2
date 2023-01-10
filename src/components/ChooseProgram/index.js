import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Button, Colors } from "../Styling";
import { Devices } from "../Responsive";
import { Row, Column } from "../Sections";
import { navigate } from "gatsby";
import styled from "styled-components";
import { SessionContext } from "../../session.js";

export const ChooseWrap = styled.div`
  position: relative;
  padding: ${(props) => props.padding};
  cursor: pointer;
  text-align: ${(props) => props.textAlign || "left"};
  margin: ${(props) => props.margin};
  @media ${Devices.xxs} {
  }
  @media ${Devices.xs} {
  }
  @media ${Devices.sm} {
  }
  @media ${Devices.tablet} {
    text-align: ${(props) => props.textAlign_tablet};
  }
  @media ${Devices.md} {
    text-align: ${(props) => props.textAlign_md};
  }
  @media ${Devices.lg} {
  }
  @media ${Devices.xl} {
  }
  @media ${Devices.xxl} {
  }
`;
// @media ${Break.sm} {
//     width: 100%;
//     margin: ${props => props.m_sm};
// }
// @media ${Break.xs} {
//     width: 100%;
//     margin: ${props => props.m_xs};
// }
export const Schedule = styled.small`
  font-size: 12px;
  display: block;
  color: #bdbdbd;
`;
const ChooseProgram = (props) => {
  const { setLocation } = React.useContext(SessionContext);
  const [status, setStatus] = useState({ toggle: false, hovered: false });
  const _Selector = (_p) => (
    <Button
      display={props.displayButton}
      justifyContent={props.buttonJustifyContent}
      variant="full"
      shadow="0px 0px 6px 2px rgba(0, 0, 0, 0.2)"
      textAlign={props.textAlign || "inherit"}
      padding={props.buttonPadding || "10px 30px"}
      width={props.width}
      maxWidth={props.width ? props.width : "250px"}
      onClick={() => _p.setStatus({ toggle: !_p.status.toggle })}
      color={Colors.blue}
      textColor={Colors.white}
    >
      {_p.status.toggle ? props.openLabel : props.closeLabel}
    </Button>
  );
  const Selector = props.selector || _Selector;
  return (
    <ChooseWrap
      onClick={props.goTo ? props.goTo : undefined}
      centered={props.centered}
      padding={props.padding}
      margin={props.margin}
      m_sm={props.m_sm}
      m_xs={props.m_xs}
      textAlign={props.textAlign}
      textAlign_md={props.textAlign_md}
      textAlign_tablet={props.textAlign_tablet}
      onMouseLeave={() => {
        setStatus({ ...status, hovered: false });
        setTimeout(() => {
          // setStatus(_status => ({..._status, toggle: _status.hovered}));
        }, 300);
      }}
      onMouseEnter={() => setStatus({ ...status, hovered: true })}
    >
      <Selector status={status} setStatus={setStatus} />
      {status.toggle && (
        <Row
          display="flex"
          // margin={props.margin}
          margin="0 auto"
          m_sm={props.m_sm}
          m_xs={props.m_xs}
          width="250px"
          width_xs="100%"
          width_sm="100%"
          justifyContent="center"
          marginLeft="0"
          marginRight="0"
          position="absolute"
          right={props.right}
          top={props.top}
          left={props.left}
          zIndex="2"
          background={Colors.white}
          borderRadius={props.borderRadius}
          shadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        >
          {Array.isArray(props.programs) &&
            props.programs
              .filter(
                (item) => !["unlisted", "hidden"].includes(item.visibility)
              )
              .map((item, index) => {
                return (
                  <Button
                    width={props.width}
                    key={index}
                    font='"Lato", sans-serif'
                    colorHover={Colors.lightBlue}
                    onClick={() => {
                      if (item.location_bc_slug && item.location_bc_slug != "")
                        setLocation(item.location_bc_slug);
                      navigate(item.link);
                    }}
                    textColor={Colors.gray}
                    fontSize={"16px"}
                    borderRadius="3px"
                    padding="10px"
                  >
                    {item.text}
                    {item.schedule && item.schedule != "" && (
                      <Schedule>{item.schedule}</Schedule>
                    )}
                  </Button>
                );
              })}
        </Row>
      )}
    </ChooseWrap>
  );
};
ChooseProgram.propTypes = {
  selector: PropTypes.func,
  marginTop: PropTypes.string,
  marginLeft: PropTypes.string,
  borderRadius: PropTypes.string,
  shadow: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
ChooseProgram.defaultProps = {
  selector: null,
  shadow: true,
  marginTop: "5px",
  marginLeft: "0",
  borderRadius: "3px",
};
export default ChooseProgram;
