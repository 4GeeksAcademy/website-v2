import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Row, Container, Column, Divider, Wrapper, Div} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, ArrowRight, Teacher, Glasses, Clock, Users, Rocket, Button, Laptop, Infinity} from '../Styling';
import {Card} from '../Card';
import Link from 'gatsby-link'

const ContainerStyle = styled.div`
    height: 1px;
    width: 100%;
    background-color: #0097CE;
    border-radius: 50px;
`
const FillerStyles = styled.div`
    height: 10px;
    width: ${props => props.completed}%;
    background-color: #0097CE;
    // background-color: ${props => props.bgColor};
    border-radius: inherit;
    text-align: right;
    transform: translateY(-50%);
`

const ProgramDetails = (props) => {
    const [selected, setSelected] = useState(0);
    const [completed, setCompleted] = useState(0.5);

    const Slider = () => {
        let sliderArray = [];
        if (props.details.sub_heading === "Full Time") {
            for (let i = 0; i < 11; i++) {
                sliderArray.push(i)
            }
        }
        if (props.details.sub_heading === "Part Time") {
            for (let i = 0; i < 18; i++) {
                sliderArray.push(i)
            }
        }

        return sliderArray
    }

    return (
        <Wrapper
            style="default"
        >
            <Title
                size="10"
                title={props.details.heading && props.details.heading}
                paragraph={props.details.sub_heading}
                primary
            />
            <Divider height="50px" />
            <Row >
                <Column size="12" >
                    <Card
                        h_xs="400px"
                        h_sm="370px"
                        h_md="470px"
                        h_lg="470px"
                        h_xl="470px"
                        padding="20px"
                        shadow height="400px"
                        width="100%"
                        margin="10px 0px"
                    >
                        <Row height="100%">
                            <Column size="12" customRespSize respSize="12" display={`flex`} flexDirection={`column`} justifyContent={`space-between`}>
                                <Row height={`15%`} align={`around`} alignItems={`center`} marginBottom={`15px`} customRespSize alignResp={`space-around`}>
                                    {props.details.details_modules.map((item, index) => {
                                        return (
                                            <Div
                                                key={index}
                                                flexDirection={`column`}
                                                alignItems={`center`}
                                                background={selected === index ? "#ededed" : null}
                                                padding={selected === index ? "1rem" : null}
                                                borderRadius={selected === index ? ".75rem" : null}
                                            >
                                                <Div
                                                    onClick={() => {setSelected(index); setCompleted((item.step * 100) / (Slider().length - 1))}}
                                                    alignItems={`center`}
                                                    margin={`0 0 5px 0`}

                                                >
                                                    <Paragraph
                                                        color={Colors.darkGray}
                                                        cursor={`pointer`}
                                                        fs_xs="8px"
                                                        fs_sm="12px"
                                                        fs_md="12px"
                                                        fs_lg="14px"
                                                        fs_xl="16px"
                                                    >
                                                        {item.module_name}
                                                    </Paragraph>
                                                </Div>
                                                <Div alignItems={`center`}>
                                                    <Paragraph
                                                        color={Colors.darkGray}

                                                        fs_xs="8px"
                                                        fs_sm="10px"
                                                        fs_md="10px"
                                                        fs_lg="12px"
                                                        fs_xl="14px"
                                                    >
                                                        {item.duration}
                                                    </Paragraph>
                                                </Div>

                                            </Div>
                                        )
                                    })}

                                </Row>
                                <Row align={`around`} alignItems={`center`}>
                                    <Column size={`11`}>
                                        <ContainerStyle>
                                            <FillerStyles completed={completed} />
                                        </ContainerStyle>
                                    </Column>
                                </Row>
                                <Row align={`center`} alignItems={`center`} marginTop={`10px`}>
                                    <Column size="11" display={`flex`} justifyContent={`space-between`}>
                                        {/* <Column size={`12`}> */}
                                        {Slider().map((item, index) => {
                                            return (
                                                <Div key={index} alignItems={`center`}>
                                                    {index === Slider().length - 1 ?
                                                        <Infinity width="16px" fill={Colors.darkGray} />
                                                        :
                                                        <Paragraph
                                                            color={Colors.darkGray}

                                                            fs_xs="8px"
                                                            fs_sm="10px"
                                                            fs_md="10px"
                                                            fs_lg="12px"
                                                            fs_xl="14px"
                                                        >
                                                            {item}
                                                        </Paragraph>
                                                    }
                                                </Div>
                                            )
                                        })}
                                    </Column>
                                </Row>

                                <Row height={`75%`} >
                                    <Column size="12" customRespSize respSize="12" paddingRight={`30px`} paddingLeft={`30px`} display={`flex`} flexDirection={`column`} justifyContent={`space-evenly`}>
                                        <Div flexDirection={`row`} >
                                            <Div width={`50%`}>
                                                <Div flexDirection={`column`} alignContent={`start`} margin={`0 5px 0 0`}>
                                                    <Rocket width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                                </Div>
                                                <Div flexDirection={`column`} >
                                                    <Div alignItems={`center`} margin={`5px 0`}>
                                                        {/* <Div> */}
                                                        <H4
                                                            fs_xs="18px"
                                                            fs_sm="18px"
                                                            fs_md="20px"
                                                            fs_lg="18px"
                                                            fs_xl="22px"
                                                            fontWeight={`400`}
                                                        >
                                                            {`Projects`}
                                                        </H4>
                                                        {/* </Div> */}
                                                    </Div>

                                                    <Div >
                                                        <Paragraph
                                                            color={Colors.darkGray}
                                                            fs_xs="12px"
                                                            fs_sm="16px"
                                                            fs_md="16px"
                                                            fs_lg="18px"
                                                            fs_xl="18px"
                                                            customTextAlignSmall
                                                            alignXs={`start`}
                                                        >
                                                            {props.details.details_modules[selected].projects}
                                                        </Paragraph>
                                                    </Div>
                                                </Div>
                                            </Div>
                                            {/* </Div>
                                        <Div flexDirection={`column`} > */}
                                            <Div flexDirection={`column`} alignContent={`start`} margin={`0 5px 0 0`}>
                                                <Clock width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                            </Div>
                                            <Div flexDirection={`column`}>
                                                <Div alignItems={`center`} margin={`5px 0`}>

                                                    <H4
                                                        fs_xs="18px"
                                                        fs_sm="18px"
                                                        fs_md="20px"
                                                        fs_lg="18px"
                                                        fs_xl="22px"
                                                        fontWeight={`400`}
                                                    >
                                                        {`Duration`}
                                                    </H4>

                                                </Div>
                                                <Div >
                                                    <Paragraph
                                                        color={Colors.darkGray}
                                                        fs_xs="12px"
                                                        fs_sm="16px"
                                                        fs_md="16px"
                                                        fs_lg="18px"
                                                        fs_xl="18px"
                                                        customTextAlignSmall
                                                        alignXs={`start`}
                                                    >
                                                        {props.details.details_modules[selected].duration}
                                                    </Paragraph>
                                                </Div>
                                            </Div>
                                        </Div>
                                        <Div flexDirection={`row`} >
                                            {/* <Div width={`100%`}> */}
                                            <Div margin={`0 5px 0 0`} flexDirection={`column`} alignContent={`start`}>
                                                <Laptop width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                            </Div>
                                            <Div flexDirection={`column`} >
                                                <Div alignItems={`center`} margin={`5px 0`}>

                                                    <H4
                                                        fs_xs="18px"
                                                        fs_sm="18px"
                                                        fs_md="20px"
                                                        fs_lg="18px"
                                                        fs_xl="22px"
                                                        fontWeight={`400`}
                                                    >
                                                        {props.details.details_modules[selected].title}
                                                    </H4>

                                                </Div>
                                                <Div >
                                                    <Paragraph
                                                        color={Colors.darkGray}
                                                        fs_xs="12px"
                                                        fs_sm="16px"
                                                        fs_md="16px"
                                                        fs_lg="18px"
                                                        fs_xl="18px"
                                                        customTextAlignSmall
                                                        alignXs={`start`}
                                                    >
                                                        {props.details.details_modules[selected].description}
                                                    </Paragraph>
                                                </Div>
                                                {/* </Div> */}
                                            </Div>
                                        </Div>
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                    </Card>
                </Column>
            </Row>
        </Wrapper>
    )
};

export default ProgramDetails;


