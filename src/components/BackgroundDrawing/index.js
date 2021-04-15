import React from "react";
import styled from "styled-components";

const Colors = {
  blue: "#0097CD",
  grey: "#F5F5F5",
  black: "#000000",
  red: "#CD0000",
  yellow: "#FFB718"
};
const Drawing = styled.div`
  position: relative;
  max-width: 1300px;
  margin: auto;
  height: 400px;
`;
const Content = styled.div`
  z-index: 2;
`;
const Figure = styled.div`
  z-index: -1;
  position: absolute;
  background-color: ${(props) => Colors[props.color]};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  transform: scale(${(props) => props.scale}, ${(props) => props.scale});
  opacity: ${(props) => props.opacity};
`;
const Circle = styled(Figure)`
  border-radius: 50%;
`;

export const BackgroundDrawing = ({children}) => {
  return (
    <Drawing>
      <Circle
        color="blue"
        width="50px"
        height="50px"
        top="20px"
        right="10%"
      />
      <Circle
        color="black"
        width="50px"
        height="50px"
        top="170px"
        right="120px"
        scale="0.5"
      />
      <Circle
        color="black"
        width="30px"
        height="30px"
        top="140px"
        left="5%"
      />
      <Circle
        color="grey"
        width="30px"
        height="30px"
        top="100px"
        right="9%"
      />
      <Circle
        color="black"
        width="30px"
        height="30px"
        top="100px"
        right="12%"
      />
      <Circle
        color="grey"
        width="30px"
        height="30px"
        top="100px"
        right="15%"
      />
      <Circle
        color="yellow"
        width="20px"
        height="20px"
        top="0px"
        right="30%"
        scale="2"
      />
      <Circle
        color="yellow"
        width="200px"
        height="200px"
        top="150px"
        right="-5%"
        opacity="0.2"
      />
      <Circle
        color="yellow"
        width="30px"
        height="30px"
        top="60px"
        left="5%"
        opacity="0.2"
      />
      <Circle
        color="black"
        width="30px"
        height="30px"
        top="140px"
        left="5%"
      />
      <Circle
        color="grey"
        width="30px"
        height="30px"
        top="180px"
        left="5%"
      />
      <Circle
        color="grey"
        width="30px"
        height="30px"
        top="240px"
        left="5%"
      />
      <Circle
        color="blue"
        width="30px"
        height="30px"
        top="280px"
        left="5%"
      />
      <Circle
        color="yellow"
        width="100px"
        height="100px"
        top="250px"
        left="-5%"
      />
      <Circle color="blue" width="50px" height="50px" top="20px" left="15%" />
      <Circle color="red" width="50px" height="50px" top="200px" left="20%" opacity="0.3" />
      <Content>
        {children}
      </Content>
    </Drawing>
  );
};
