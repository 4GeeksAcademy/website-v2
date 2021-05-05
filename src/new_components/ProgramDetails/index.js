import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {GridContainer, Container, Column, Divider, Grid, Div} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, Button} from '../Styling';
import Card from '../Card';
import Icon from '../Icon';

const ContainerStyle = styled.div`
    height: .5px;
    width: 100%;
    background-color: ${Colors.black};
    border-radius: 50px;
`
const FillerStyles = styled.div`
    height: 8px;
    width: ${props => props.completed}%;
    background-color: ${Colors.yellow};
    border-radius: inherit;
    text-align: right;
    transform: translateY(-50%);
`

const strings = {
    us: {
        "Projects": "Projects",
        "Duration": "Duration"
    },
    es: {
        "Projects": "Proyectos",
        "Duration": "Duración"
    }
}
const ProgramDetails = (props) => {

    const [selected, setSelected] = useState({index: 0, manual: false});
    const lang = props.lang || "en";
    if (!props.details) {
        console.log("Warning! Ignoring Program Details because it came null form the graphql query")
        return null;
    }
    const steps = props.details.details_modules.reduce((total, current, i) => [...total, (total[i - 1] || 0) + current.step], [])
    useEffect(() => {
        const inter = setInterval(() => {
            setSelected(current => current.manual ? current : current.index < steps.length - 1 ? ({index: current.index + 1, manual: false}) : ({index: 0, manual: false}))
        }, 2000);
        return () => clearInterval(inter)
    }, [])
    return (
        <>
            <GridContainer columns_tablet="2" background={props.background || Colors.verylightGray} padding_tablet="76px 0" padding="50px 17px" gridGap="100px">
                <Div flexDirection="column" >
                    <H3 textAlign="left" margin="0 0 20px 0">{props.details.about.title}</H3>
                    {props.details.about.sub_title.split("\n").map((m, i) =>
                        <Paragraph
                            textAlign="left"
                            margin="10px 0 "
                            fontSize="15px"
                            lineHeight="26px"
                        >
                            {m}
                        </Paragraph>
                    )}
                </Div>
                <Div flexDirection="column" justifyContent="between" >
                    {Array.isArray(props.details.about.list) && props.details.about.list.map((m, i) => {
                        return (
                            <Div key={i} borderBottom="1px solid #ebebeb" >
                                <H4 fontWeight="700" textAlign="left" width="122px">{`${m.label}:`}</H4>
                                <Paragraph textAlign="left">{m.content}</Paragraph>
                            </Div>
                        )
                    })}
                </Div>

            </GridContainer>
            <GridContainer padding_tablet="0" margin_tablet="0 0 83px 0" justifyItems="center">
                <Div
                    flexDirection="column"
                    display="none"
                    display_tablet="block"
                    margin="50px 0 0 0"
                    minHeight="475px"
                    height="auto"
                    borderBottom_tablet="1px solid black"
                >
                    <H2>{props.details.heading}</H2>
                    <Paragraph>{props.details.sub_heading}</Paragraph>
                    <Div justifyContent="between" margin="50px 0 20px 0">
                        {props.details.details_modules.map((item, index) => {
                            return (
                                <Div
                                    onClick={() => setSelected({index, manual: true})}
                                    key={index}
                                    cursor="pointer"
                                    flexDirection={`column`}
                                    alignItems={`center`}
                                    backgroundHover={Colors.black}
                                    background={selected.index === index ? "#000000" : null}
                                    padding={"10px"}
                                    borderRadius={"3px"}
                                    display="flex"
                                >
                                    <Div
                                        alignItems={`center`}
                                        margin={`0 0 5px 0`}
                                        display="flex"
                                    >
                                        <H4
                                            color={selected.index === index ? "#ffffff" : Colors.darkGray}
                                            fontWeight="900"
                                            cursor={`pointer`}
                                            colorHover="#ffffff"
                                            lineHeight="19px"

                                        >
                                            {item.module_name}
                                        </H4>
                                    </Div>
                                </Div>
                            )
                        })}
                    </Div>
                    <ContainerStyle>
                        <FillerStyles completed={(steps[selected.index] * 100) / steps[steps.length - 1]} />
                    </ContainerStyle>
                    <Div margin="50px 0" >
                        <Icon icon="laptop" width="52px" height="39px" />
                        <Div flexDirection="column" margin="0 0 0 15px">
                            <H3 textAlign="left">{props.details.details_modules[selected.index].title}</H3>
                            {props.details.details_modules[selected.index].description.split('\\n').map((d, i) =>
                                <Paragraph
                                    textAlign="left"
                                    color={Colors.darkGray}
                                    key={i}                        >
                                    {d}
                                </Paragraph>
                            )}
                        </Div>
                    </Div>
                    <Div margin="20px 0" justifyContent="between">
                        <Div margin="0 10px 0 0">
                            <Div>
                                <Icon icon="rocket" width="46px" height="46px" />
                            </Div>
                            <Div flexDirection="column" margin="0 0 0 15px">
                                <H3 textAlign="left">{props.details.details_modules[selected.index].title}</H3>
                                {props.details.details_modules[selected.index].description.split('\\n').map((d, i) =>
                                    <Paragraph
                                        textAlign="left"
                                        color={Colors.darkGray}
                                        key={i}                        >
                                        {d}
                                    </Paragraph>
                                )}
                            </Div>
                        </Div>
                        <Div >
                            <Div >
                                <Icon icon="clock" width="46px" height="46px" />
                            </Div>
                            <Div flexDirection="column" margin="0 0 0 15px">
                                <H3 textAlign="left">{props.details.details_modules[selected.index].title}</H3>
                                {props.details.details_modules[selected.index].description.split('\\n').map((d, i) =>
                                    <Paragraph
                                        textAlign="left"
                                        color={Colors.darkGray}
                                        key={i}                        >
                                        {d}
                                    </Paragraph>
                                )}
                            </Div>
                        </Div>
                    </Div>
                </Div>
                {/* <Button variant="empty" color={Colors.blue} icon={<Icon icon="download" style={{marginRight: "10px"}} width="46px" height="46px" />}>Text</Button> */}
            </GridContainer>
        </>
    )
};

export default ProgramDetails;


