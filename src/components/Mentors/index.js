import React, {useState} from 'react';

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
                      bio
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
        <Row github="/components/staff">
            {staff[0].node.staff.map((item, index) => {
                return (
                    <Column key={index} size_xs="12" size_sm="6" size_md="4" size="3" >
                        <RoundImage
                            pos={`relative`}
                            opacity="1"
                            mb="20px"
                            url={item.image}
                            bsize="cover"
                            border="10px"
                            height="250px"
                            width="100"
                            move up={props.up}>
                            <Over
                                h_xs="250px"
                                h_sm="250px"
                                h_md="250px"
                                h_lg="250px"
                                h_xl="250px"
                                w_xs="100%"
                                w_sm="100%"
                                w_md="100%"
                                w_lg="100%"
                                w_xl="100%"
                                bottom={`0`}
                                left={`0`}
                            >
                                <Divider height="10%" />
                                <H3 fs_xs="14px"
                                    fs_sm="14px"
                                    fs_md="14px"
                                    fs_lg="14px"
                                    fs_xl="18px"
                                    margin="0"
                                    uppercase
                                    color={Colors.yellow}
                                >{item.name}</H3>
                                <H3 fs_xs="14px"
                                    fs_sm="14px"
                                    fs_md="14px"
                                    fs_lg="14px"
                                    fs_xl="18px"
                                    margin="0"
                                    uppercase
                                    color={Colors.yellow}>{item.last_name}</H3>
                                <Paragraph margin="5px 0" color={Colors.verylightGray}>{item.job_title}</Paragraph>
                                <Paragraph margin="15px 0" color={Colors.lightGray}>{item.bio}</Paragraph>
                                <Divider height="10%" />
                                <a href={item.linkdin != '' ? `${item.linkdin}` : "#"} target="_blank" rel="noopener noreferrer nofollow"><ArrowRight width="32" color={Colors.yellow} fill={Colors.yellow} /></a>
                            </Over>
                        </RoundImage>
                    </Column>
                )
            })}
        </Row>
    )
}

export default Mentors;