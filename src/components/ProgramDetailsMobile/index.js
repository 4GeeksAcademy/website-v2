import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Row, Container, Column, Divider, Wrapper, Div} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, TriangleDown, Laptop, Rocket, Clock} from '../Styling';
import {Card} from '../Card';
import Link from 'gatsby-link'


const ProgramDetailsMobile = (props) => {
    const [selected, setSelected] = useState({index: null, manual: false});
    if (!props.details) {
        console.log("Warning! Ignoring Program Details because it came null form the graphql query")
        return null;
    }
    return (
        <>
            {props.details.details_modules.map((item, index) => {
                return (
                    <>
                        <Card
                            key={index}
                            color={`blue`}
                            width="100%"
                            height="82px"
                            padding={`20px`}
                            borders={`.5rem`}
                            margin={`5px 0`}
                            display={`none`}
                            display_sm={`block`}
                        >
                            <Div
                                onClick={() => selected.index === index ? setSelected({index: null, manual: true}) : setSelected({index: index, manual: true})}
                                justifyContent={`space-between`}
                                cursor={`pointer`}
                            >
                                <Div flexDirection={`column`} alignItems={`flex-start`}>
                                    <H3
                                        color={Colors.white}
                                        align_sm={`left`}
                                        align_xs={`left`}
                                    >
                                        {item.module_name}
                                    </H3>
                                    <Paragraph
                                        color={Colors.white}
                                        fontWeight={`500`}
                                    >{item.duration}</Paragraph>
                                </Div>
                                <TriangleDown width="16" color={Colors.white} fill={Colors.white} />
                            </Div>

                        </Card>
                        {selected.index === index &&
                            <Card
                                padding={`20px`}
                            >
                                <Div alignItems={`center`} margin={`10px 0`}>
                                    <Laptop width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                    <H3
                                        margin={`0 10px`}
                                        fontWeight={`400`}
                                        align_sm={`left`}
                                    >
                                        {item.title}
                                    </H3>
                                </Div>
                                <Paragraph
                                    align_sm={`start`}
                                    align_xs={`start`}
                                >
                                    {item.description}
                                </Paragraph>
                                <Div alignItems={`center`} margin={`10px 0`}>
                                    <Rocket width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                    <H3
                                        margin={`0 10px`}
                                        fontWeight={`400`}
                                        align_sm={`left`}
                                    >
                                        {`Projects`}
                                    </H3>
                                </Div>
                                <Paragraph
                                    align_sm={`start`}
                                    align_xs={`start`}
                                >
                                    {item.projects}
                                </Paragraph>
                                <Div alignItems={`center`} margin={`10px 0`}>
                                    <Clock width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                    <H3
                                        margin={`0 10px`}
                                        fontWeight={`400`}
                                        align_sm={`left`}
                                    >
                                        {`Duration`}
                                    </H3>
                                </Div>
                                <Paragraph
                                    align_sm={`start`}
                                    align_xs={`start`}
                                >
                                    {item.duration}
                                </Paragraph>
                            </Card>}
                    </>
                )
            })}
        </>
    )
}

export default ProgramDetailsMobile;