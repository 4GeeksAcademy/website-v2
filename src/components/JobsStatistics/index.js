import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Column} from '../Sections'
import {H3, H4, Paragraph} from '../Heading'
import graphic from "../../assets/images/graphic.png"
import Trend from 'react-trend';
import {Colors} from '../Styling'
import {Card} from '../Card'

export default (props) => {
    const jobs = props.lang[0].node.jobs
    console.log("jobs", jobs)
    return (
        <Row>
            {jobs.map((i, index) => (
                <Column size="4" key={index} >
                    <Card
                        width="100%"
                        h_xs="120px"
                        h_sm="140px"
                        h_md="130px"
                        h_lg="150px"
                        h_xl="160px"
                        shadow
                        padding="15px"
                        margin="5px 0"
                    >
                        <Row align="around" marginLeft="10px">
                            <Column size size="6" customRespSize respSize="6" >
                                <Row>
                                    <Paragraph
                                        color="gray"
                                        align="left"
                                        margin="0 0 10px 0"
                                        fs_xs="10px"
                                        fs_sm="12px"
                                        fs_md="10px"
                                        fs_lg="12px"
                                        fs_xl="12px">
                                        {i.title}
                                    </Paragraph>
                                </Row>
                                <Row>
                                    <H3 primary>{i.value}</H3><span><H3 primary>{i.value_symbol}</H3></span>
                                </Row>
                                <Row>
                                    <Paragraph
                                        color="gray"
                                        align="left"
                                        margin="10px 0 0 0"
                                        fs_xs="10px"
                                        fs_sm="12px"
                                        fs_md="10px"
                                        fs_lg="12px"
                                        fs_xl="12px">
                                        {i.sub_title}
                                    </Paragraph>
                                </Row>
                            </Column>
                            <Column size size="4" customRespSize respSize="6" alignSelf="center">
                                <Trend
                                    smooth
                                    autoDraw
                                    autoDrawDuration={5000}
                                    autoDrawEasing="ease-out"
                                    data={i.chart_data}
                                    gradient={[`${Colors.blue}`]}
                                    radius={25}
                                    strokeWidth={10}
                                    strokeLinecap={'butt'}
                                />
                            </Column>
                        </Row>
                    </Card>
                </Column>
            ))
            }
        </Row >
    )
}


