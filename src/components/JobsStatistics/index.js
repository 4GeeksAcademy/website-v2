import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Column} from '../Sections'
import {H3, H4, Paragraph} from '../Heading'
import graphic from "../../assets/images/graphic.png"
import Trend from 'react-trend';
import {Colors} from '../Styling'
import {Card} from '../Card'

export default () => {
    const data = useStaticQuery(graphql`
      query myQueryJobs{
          job: allJobsStatisticsYaml {
            edges {
              node {
                jobs {
                  title
                  slug
                  sub_title
                  value
                  value_symbol
                  chart_data
                }
              }
            }
          }
        }
      `)
    const jobs = data.job.edges[0].node.jobs
    return (
        <Row>
            {jobs.map((i, index) => (
                <Column size="4" key={index}>
                    <Card
                        width="100%"
                        height="125px"
                        shadow
                        padding="15px"
                        margin="5px 0"
                    >
                        <Row align="around">
                            <Column size size="5" customRespSize respSize="5" >
                                <Row>
                                    <Paragraph color="gray" align="left" margin="0 0 10px 0" fontSize="13px">
                                        {i.title}
                                    </Paragraph>
                                </Row>
                                <Row>
                                    <H3 primary>{i.value}</H3><span><H3 primary>{i.value_type}</H3></span>
                                </Row>
                                <Row>
                                    <Paragraph color="gray" align="left" margin="10px 0 0 0" fontSize="13px">
                                        {i.sub_title}
                                    </Paragraph>
                                </Row>
                            </Column>
                            <Column size size="5" customRespSize respSize="5" alignSelf="center">
                                <Trend
                                    smooth
                                    autoDraw
                                    autoDrawDuration={5000}
                                    autoDrawEasing="ease-out"
                                    data={i.chart_data}
                                    gradient={[`${Colors.blue}`]}
                                    radius={25}
                                    strokeWidth={5}
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


