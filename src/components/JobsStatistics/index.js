import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Column} from '../Sections'
import {H3, H4, Paragraph} from '../Heading'
import graphic from "../../assets/images/graphic.png"
import Trend from 'react-trend';
import {Colors} from '../Styling'
import Card from '../Card'
import Fragment from "../Fragment"
export default (props) => {
    const jobs = props.lang[0].node.jobs
    return (<Fragment github="/components/jobs_statistics">
        <Row>
            {jobs.map((i, index) => (
                <Column size="4" size_sm="12" key={index} >
                    <Card
                        shadow
                        padding="15px"
                        p_xs="15px 100px 15px 0px"
                        margin="5px 0"
                    >
                        <Trend
                            className="trend"
                            smooth
                            autoDraw
                            width={200}
                            autoDrawDuration={5000}
                            autoDrawEasing="ease-out"
                            data={i.chart_data}
                            gradient={[`${Colors.blue}`]}
                            radius={25}
                            strokeWidth={10}
                            strokeLinecap={'butt'}
                        />
                        <Paragraph
                            color="gray"
                            align="left"
                            margin="0 0 10px 0"
                        >
                            {i.title}
                        </Paragraph>
                        <H3 align="left" align_xs="center" align_sm="center">{i.value}{i.value_symbol}</H3>
                        <Paragraph
                            color="gray"
                            align="left"
                            margin="10px 0 0 0"
                            >
                            {i.sub_title}
                        </Paragraph>
                    </Card>
                </Column>
            ))
            }
        </Row >
        </Fragment>
    )
}


