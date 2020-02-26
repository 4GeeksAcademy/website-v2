import React, {useState} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../Heading'
import {RoundImage, Colors, Over, ArrowRight} from '../Styling';
import {Row, Column, Divider} from '../Sections'
import {Card} from '../Card'


const Mentors = props => {
    const data = useStaticQuery(graphql`
        query myStaffQuery{
            allStaffYaml {
                edges {
                  node {
                    staff {
                      name
                      last_name
                      nick_name
                      slug
                      job_title
                      github
                      linkdin
                      twitter
                      website
                      image
                      age
                      location
                      interests
                      coding_skills
                    }
                  }
                }
              }
            }
        `)
    let staff = data.allStaffYaml.edges;

    return (
        <>
            <Row>
                {staff[0].node.staff.map((item, index) => {
                    return (
                        <>
                            <Column key={index} size="3" customRespSize respSize="6">
                                <RoundImage opacity="1" mb="20px" url={item.image} bsize="cover" border="10px" width="100%" height="250px" move up={props.up}>
                                    <Over>
                                        <Divider height="20px" />
                                        <H3 uppercase color={Colors.yellow}>{item.name}</H3>
                                        <H3 uppercase color={Colors.yellow}>{item.last_name}</H3>
                                        <Paragraph color={Colors.lightGray}>{item.job_title}</Paragraph>
                                        <Divider height="50px" />
                                        <ArrowRight width="32" color={Colors.yellow} fill={Colors.yellow} />
                                    </Over>
                                </RoundImage>
                            </Column>
                        </>
                    )
                })}
            </Row>
        </>
    )
}

export default Mentors;