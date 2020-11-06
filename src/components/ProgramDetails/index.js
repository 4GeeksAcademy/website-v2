import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider, Wrapper, Div} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors} from '../Styling';
import Card from '../Card';
import Icon from '../Icon';

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
            display_xs={`none`}
            display_sm={`none`}
        >
            <Row display="flex" height="100%">
                <Column size="12" display={`flex`} flexDirection={`column`} justifyContent={`between`}>
                    <Row display="flex" height={`15%`} justifyContent={`around`} alignItems={`center`} marginBottom={`15px`} alignResp={`space-around`}>
                        {props.details.details_modules.map((item, index) => {
                            return (
                                <Div
                                    onClick={() => setSelected({index, manual: true})}
                                    key={index}
                                    cursor="pointer"
                                    flexDirection={`column`}
                                    alignItems={`center`}
                                    backgroundHover={Colors.lightGray}
                                    background={selected.index === index ? "#bfeeff" : null}
                                    padding={"10px"}
                                    borderRadius={".75rem"}
                                    display="flex"
                                >
                                    <Div
                                        alignItems={`center`}
                                        margin={`0 0 5px 0`}
                                        display="flex"
                                    >
                                        <Paragraph
                                            color={Colors.darkGray}
                                            cursor={`pointer`}
                                            fs_xs="8px"
                                            fs_sm="12px"
                                            fs_md="10px"
                                            fs_lg="12px"
                                            fs_xl="16px"
                                        >
                                            {item.module_name}
                                        </Paragraph>
                                    </Div>
                                    <Div alignItems={`center`} display="flex">
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
                    <ContainerStyle>
                        <FillerStyles completed={(steps[selected.index] * 100) / steps[steps.length - 1]} />
                    </ContainerStyle>
                    <Row display="flex" justifyContent={`center`} alignItems={`center`} marginTop={`10px`}>
                        <Column size="11" display={`flex`} justifyContent={`between`}>
                            {steps.length > 0 && Array(steps[steps.length - 1]).fill(null).map((item, index) => {
                                return (
                                    <Paragraph
                                        color={Colors.darkGray}
                                        key={index}
                                        fs_xs="8px"
                                        fs_sm="10px"
                                        fs_md="10px"
                                        fs_lg="12px"
                                        fs_xl="14px"
                                    >
                                        {index + 1}
                                    </Paragraph>
                                )
                            })}
                        </Column>
                    </Row>

                    <Row display="flex" height={`75%`} >
                        <Column size="12" paddingRight={`30px`} paddingLeft={`30px`} display={`flex`} flexDirection={`column`} justifyContent={`evenly`}>
                            <Div flexDirection={`row`} display="flex">
                                <Div margin={`0 5px 0 0`} flexDirection={`column`} alignContent={`start`} display="flex">
                                    <Icon icon="laptop" width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                </Div>
                                <Div flexDirection={`column`} display="flex">
                                    <Div alignItems={`center`} margin={`5px 0`} display="flex">
                                        <H4 align="left" align_sm="left">
                                            {props.details.details_modules[selected.index].title}
                                        </H4>

                                    </Div>
                                    <div>
                                        {props.details.details_modules[selected.index].description.split('\\n').map((d, i) =>
                                            <Paragraph
                                                color={Colors.darkGray}
                                                key={i}
                                                align_sm="left"
                                                margin="10px 0px 0px 0px"
                                                fs_xs="12px"
                                                fs_sm="16px"
                                                fs_md="16px"
                                                fs_lg="18px"
                                                fs_xl="18px"
                                            >
                                                {d}
                                            </Paragraph>
                                        )}
                                    </div>
                                    {/* </Div> */}
                                </Div>
                            </Div>
                            <Div flexDirection={`row`} display="flex">
                                <Div width={`50%`} display="flex">
                                    <Div display="flex" flexDirection={`column`} alignContent={`start`} margin={`0 5px 0 0`}>
                                        <Icon icon="rocket" width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                    </Div>
                                    <Div display="flex" flexDirection={`column`} >
                                        <Div display="flex" alignItems={`center`} margin={`5px 0`}>
                                            {/* <Div> */}
                                            <H4 align="left" align_sm="left">
                                                {strings[lang]["Projects"]}
                                            </H4>
                                            {/* </Div> */}
                                        </Div>

                                        <Div display="flex" >
                                            <Paragraph
                                                color={Colors.darkGray}
                                                align_sm="left"
                                                fs_xs="12px"
                                                fs_sm="16px"
                                                fs_md="16px"
                                                fs_lg="18px"
                                                fs_xl="18px"
                                            >
                                                {props.details.details_modules[selected.index].projects}
                                            </Paragraph>
                                        </Div>
                                    </Div>
                                </Div>
                                <Div display="flex" flexDirection={`column`} alignContent={`start`} margin={`0 5px 0 0`}>
                                    <Icon icon="clock" width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                </Div>
                                <Div display="flex" flexDirection={`column`}>
                                    <Div display="flex" alignItems={`center`} margin={`5px 0`}>

                                        <H4 align="left" align_sm="left">
                                            {`Duration`}
                                        </H4>

                                    </Div>
                                    <Div display="flex">
                                        <Paragraph
                                            color={Colors.darkGray}
                                            align_sm="left"
                                            fs_xs="12px"
                                            fs_sm="16px"
                                            fs_md="16px"
                                            fs_lg="18px"
                                            fs_xl="18px"
                                        >
                                            {props.details.details_modules[selected.index].duration}
                                        </Paragraph>
                                    </Div>
                                </Div>
                            </Div>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Card>
    )
};

export default ProgramDetails;


