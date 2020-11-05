import React, {useState} from 'react';
import {Row, Column, Wrapper, Divider, Div} from '../Sections';
import styled from 'styled-components';
import Icon from '../Icon';
import {H2, H3, H4, H5, Paragraph, Title} from '../Heading';
import {Colors} from '../Styling';

const TypicalDay = (props) => {
    const {data} = props;
    const [activeStep, setActiveStep] = useState(0);

    return (
        <>
            <Wrapper>
                <Title
                    size="10"
                    title="TYPICAL DAY AT THE ACADEMY"
                    variant="primary"
                />
                <Divider height="50px" />
                <Row display="flex" justifyContent={`center`}>
                    <Column size="8" display={`flex`} flexDirection={`column`} justifyContent={`between`}>
                        <Row display="flex" height={`15%`} justifyContent={`between`}>
                            {data.schedule.length > 0 &&
                                data.schedule.map((item, index) => {
                                    return (
                                        <Div
                                            display="flex"
                                            key={index}
                                            cursor={`pointer`}
                                            flexDirection={`column`}
                                            onMouseOver={() => setActiveStep(index)}
                                            onClick={() => setActiveStep(index)}
                                        >
                                            <Div display="flex" justifyContent={`center`}>
                                                <Icon icon={item.icon} width="28" color={index == activeStep ? Colors.yellow : Colors.gray} fill={index == activeStep ? Colors.yellow : Colors.gray} />
                                            </Div>
                                            <Div display="flex" justifyContent={`center`}>
                                                <Paragraph
                                                    fs_xs="8px"
                                                    fs_sm="12px"
                                                    fs_md="12px"
                                                    fs_lg="14px"
                                                    fs_xl="16px"
                                                    color={index == activeStep ? Colors.yellow : Colors.gray}
                                                >
                                                    {item.time}
                                                </Paragraph>
                                            </Div>
                                        </Div>
                                    )
                                })}
                        </Row>
                        <StepperContainer>
                            <StepConnector>
                                <FillerStyles completed={((activeStep) * 100) / (data.schedule.length - 1)} />
                            </StepConnector>
                            {Array.isArray(data.schedule) && data.schedule.map(p => p.months).map((label, index) => (
                                <StepperCircle
                                    key={label}
                                    onMouseOver={() => setActiveStep(index)}
                                    onClick={() => setActiveStep(index)}
                                    background={index <= activeStep ? Colors.yellow : Colors.white}
                                >
                                    <StepLabel color={index == activeStep ? Colors.yellow : Colors.white}>{label}</StepLabel>
                                </StepperCircle >
                            ))}
                        </StepperContainer>
                        <Row display="flex" >
                            <H3>{data.schedule[activeStep].title}</H3>
                        </Row>
                        <Row display="flex" justifyContent="center">
                            <Paragraph
                                fs_xs="14px"
                                fs_sm="14px"
                                fs_md="16px"
                                fs_lg="20px"
                                fs_xl="20px"
                            >
                                {data.schedule[activeStep].content}
                            </Paragraph>
                        </Row>
                    </Column>
                </Row>
            </Wrapper>
        </>
    )
}

export default TypicalDay;

const StepperContainer = styled.div`
  width: 100%;
  padding: 25px 0 ;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 0 20px 0;
`
const StepLabel = styled.div`
  color: ${props => props.color};
  width: 100px;
  font-family: 'Lato', sans-serif;
  font-size: 8px;
  position: absolute;
  top: 20px;
`
const StepConnector = styled.div`
  position: absolute;
  top:32px;
  height: .5px;
  width: 100%;
  background-color: ${Colors.yellow};
`
const FillerStyles = styled.div`
  height: 2px;
  width: ${props => props.completed}%;
  background-color: ${Colors.yellow};
  border-radius: inherit;
  text-align: right;
  transform: translateY(-50%);
`
const StepperCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${props => props.background};
  border: 1px solid ${Colors.yellow};
  cursor: pointer;
  position: relative;
  z-index: 1;
`