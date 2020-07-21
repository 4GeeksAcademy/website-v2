import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Row, Container, Column, Divider, Wrapper, Div} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, ArrowRight, Teacher, Glasses, Clock, Users, Comments, Button, RoundImage, Infinity} from '../Styling';
import {Card} from '../Card';
import Link from 'gatsby-link'

const ProgressBar = (props) => {
    console.log("PROGRESS:", props)
    const {bgcolor, completed} = props;

    const containerStyles = {
        height: 5,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
    }

    const fillerStyles = {
        height: '10',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }
    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                {/* <span style={labelStyles}>{`${completed}%`}</span> */}
            </div>
        </div>
    );
};
const testData = [
    {bgcolor: "#6a1b9a", completed: 60}
];

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
    const [selected, setSelected] = useState(0)
    const [completed, setCompleted] = useState(0)
    console.log("PROGRAMDETAILS: ", props)
    const Slider = () => {
        let sliderArray = [];
        if (props.props.sub_heading === "Full Time") {
            for (let i = 0; i < 11; i++) {
                sliderArray.push(i)
            }
        }
        if (props.props.sub_heading === "Part Time") {
            for (let i = 0; i < 18; i++) {
                sliderArray.push(i)
            }
        }

        return sliderArray
    }
    console.log("$$$$$:", Slider())
    //   const data = useStaticQuery(graphql`
    //       query myProgramDetailsQuery{
    //         allJobYaml {
    //           edges {
    //             node {
    //               banner_heading
    //               cities
    //               meta_info{
    //                 slug
    //               }
    //             }
    //           }
    //         }
    //         }
    //       `)

    return (
        <Wrapper
            style="default"
        >
            <Title
                size="10"
                title={"yml.details.heading"}
                paragraph={"yml.details.sub_heading"}
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
                                <Row height={`15%`} align={`around`} alignItems={`center`} marginBottom={`10px`}>
                                    {props.props.details_modules.map((item, index) => {
                                        return (
                                            <Div key={index} flexDirection={`column`} alignItems={`center`} >
                                                <Div onClick={() => {setSelected(index); setCompleted((item.step * 100) / (Slider().length - 1))}} alignItems={`center`} margin={`0 0 5px 0`}>
                                                    <Paragraph
                                                        color={Colors.darkGray}
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
                                                <Div key={index}>
                                                    {index === Slider().length - 1 ?
                                                        <Infinity width="24px" fill={Colors.darkGray} />
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

                                <Row height={`75%`}>
                                    <Column size="12" display={`flex`} flexDirection={`column`} justifyContent={`space-evenly`}>
                                        <Div >{props.props.details_modules[selected].description}</Div>
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


