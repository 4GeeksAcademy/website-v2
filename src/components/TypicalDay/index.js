import React, {useState} from 'react';
import {Row, Column, Wrapper, Divider, Div} from '../Sections';
import styled from 'styled-components';
import Icon from '../Icon';
import {H2, H3, H4, H5, Paragraph, Title} from '../Heading';
import {Colors} from '../Styling';

const ContainerStyle = styled.div`
    height: 1px;
    width: 100%;
    background-color: #E6BA1F;
    border-radius: 50px;
`
const FillerStyles = styled.div`
    height: 10px;
    width: ${props => props.completed}%;
    background-color: #E6BA1F;
    // background-color: ${props => props.bgColor};
    border-radius: inherit;
    text-align: right;
    transform: translateY(-50%);
`
const Step = styled.div`
    background-color: #ffffff;
    border: 1px solid #E6BA1F;
    zIndex: 1;
    width: 12px;
    height: 12px;
    display: flex;
    border-radius: 50%;
    
`
const TypicalDay = (props) => {
    const {data} = props;
    const [selected, setSelected] = useState(0);
    const [completed, setCompleted] = useState(0.5);

    const Slider = () => {
        let sliderArray = [];
        for (let i = 0; i < data.schedule.length; i++) {
            sliderArray.push(i)
        }
        return sliderArray
    }
    console.log("data.schedule", data.schedule)
    return (
        <>
            <Wrapper>
                <Title
                    size="10"
                    title="TYPICAL DAY AT THE ACADEMY"
                    paragraph="Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio"
                    variant="primary"
                />
                <Divider height="50px" />
                <Row height={`500px`} align={`center`}>
                    <Column size="8" display={`flex`} flexDirection={`column`} justifyContent={`space-between`}>
                        <Row height={`15%`} align={`between`}>
                            {data.schedule.length > 0 &&
                                data.schedule.map((item, index) => {
                                    return (
                                        <Div
                                            key={index}
                                            cursor={`pointer`}
                                            flexDirection={`column`}
                                            onClick={() => {setSelected(index); setCompleted((index * 100) / (Slider().length - 1))}}
                                        >
                                            <Div justifyContent={`center`}>
                                                <Icon icon={item.icon} width="28" stroke={Colors.gray} fill={Colors.gray} />
                                            </Div>
                                            <Div justifyContent={`center`}>
                                                <Paragraph
                                                    fs_xs="8px"
                                                    fs_sm="12px"
                                                    fs_md="12px"
                                                    fs_lg="14px"
                                                    fs_xl="16px"
                                                >
                                                    {item.time}
                                                </Paragraph>
                                            </Div>
                                        </Div>
                                    )
                                })}
                        </Row>
                        <Row height={`15%`}>
                            <ContainerStyle>
                                <FillerStyles completed={completed} />
                            </ContainerStyle>
                        </Row>
                        <Row height={`15%`}>
                            <H3>{data.schedule[selected].title}</H3>
                        </Row>
                        <Row height={`55%`}>
                            <Paragraph
                                fs_xs="14px"
                                fs_sm="14px"
                                fs_md="16px"
                                fs_lg="20px"
                                fs_xl="20px"
                            >
                                {data.schedule[selected].content}
                            </Paragraph>
                        </Row>
                    </Column>
                </Row>
            </Wrapper>
        </>
    )
}

export default TypicalDay;

