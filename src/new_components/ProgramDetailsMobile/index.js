import React, {useState, useEffect} from 'react';
import {Div, Grid} from '../Sections'
import {H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors} from '../Styling';
import Card from '../Card';
import Icon from '../Icon'

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

const ProgramDetailsMobile = (props) => {
    const [selected, setSelected] = useState({index: null, manual: false});
    const lang = props.lang || "us";
    if (!props.details) {
        console.log("Warning! Ignoring Program Details because it came null form the graphql query")
        return null;
    }
    return (
        <>
            <Grid padding="0 17px" gridGap="0">
                {props.details.details_modules.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Div
                                key={index}
                                width="100%"
                                height="76px"
                                padding="20px"
                                border={`1px solid ${Colors.black}`}
                                borderRadius="3px"
                                borderLeft={`6px solid ${Colors.black}`}
                                margin={`7px 0`}
                                display_md="none"
                                cursor={`pointer`}
                                onClick={() => selected.index === index ? setSelected({index: null, manual: true}) : setSelected({index: index, manual: true})}
                                justifyContent={`between`}
                            >
                                <Div display="flex" flexDirection={`column`} alignItems={`flex-start`}>
                                    <H3
                                        textAlign="left"
                                    >
                                        {item.module_name}
                                    </H3>
                                    <Paragraph
                                        textAlign="left"
                                    >{item.duration}</Paragraph>
                                </Div>
                                <Icon icon="arrowdown" width="32" />

                            </Div>
                            {selected.index === index &&
                                <Div
                                    flexDirection="column"
                                >
                                    <Div alignItems={`center`} margin={`10px 0`}>
                                        <Icon icon="laptop" width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                        <H3
                                            textAlign="left"
                                            margin="0 0 0 16px"
                                            fontWeight="700"
                                        >
                                            {item.title}
                                        </H3>
                                    </Div>
                                    <Paragraph
                                        textAlign="left"
                                    >
                                        {item.description}
                                    </Paragraph>
                                    <Div display="flex" alignItems={`center`} margin={`10px 0`}>
                                        <Icon icon="rocket" width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                        <H3
                                            margin={`0 10px`}
                                            fontWeight={`400`}
                                            align_sm={`left`}
                                        >
                                            {strings[lang]["Projects"]}
                                        </H3>
                                    </Div>
                                    <Paragraph
                                        align_sm={`start`}
                                        align_xs={`start`}
                                    >
                                        {item.projects}
                                    </Paragraph>
                                    <Div display="flex" alignItems={`center`} margin={`10px 0`}>
                                        <Icon icon="clock" width="36px" fill={Colors.blue} stroke={Colors.blue} />
                                        <H3
                                            margin={`0 10px`}
                                            fontWeight={`400`}
                                            align_sm={`left`}
                                        >
                                            {strings[lang]["Duration"]}
                                        </H3>
                                    </Div>
                                    <Paragraph
                                        align_sm={`start`}
                                        align_xs={`start`}
                                    >
                                        {item.duration}
                                    </Paragraph>
                                </Div>}
                        </React.Fragment>
                    )
                })}
            </Grid>
        </>
    )
}

export default ProgramDetailsMobile;