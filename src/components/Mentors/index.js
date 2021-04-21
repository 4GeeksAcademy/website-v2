import React, {useState} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../Heading'
import {RoundImage, Colors} from '../Styling';
import {Row, Column, Divider} from '../Sections'
import styled from "styled-components";
import Icon from "../Icon";

const Over = styled.div`
    position: absolute;
    height: 280px;
    width: 100%;
    z-index: 10;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    color: #f1f1f1;
    border-radius: 10px;
    transition: .5s ease;
    padding: 15px;
    color: white;
    font-size: 10px;
    text-align: center;
    opacity: 0;
    &:hover{
        opacity: 1;
    }
`

const Mentors = props => {
    const data = useStaticQuery(graphql`
    query myStaffQuery{
        allStaffYaml {
            edges {
                node {
                    fields {
              lang
            }
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
                        image{
                            childImageSharp {
                                fluid(maxWidth: 800){
                                  ...GatsbyImageSharpFluid_withWebp
                                }
                              }
                        }
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
    let staff = data.allStaffYaml.edges.find(({node}) => node.fields.lang === props.lang);
    if (staff) staff = staff.node;
    return (

        <Row github="/components/staff" display="flex">
            {staff.staff.map((item, index) => {
                console.log(`${item.name}: ${item.bio && item.bio.length}`)
                return (
                    <Column key={index} size_xs="12" size_sm="12" size_md="6" size_lg="6" size="4" >
                        <RoundImage
                            pos={`relative`}
                            opacity="1"
                            mb="20px"
                            url={item.image}
                            bsize="cover"
                            border="10px"
                            height="280px"
                            width="100"
                            move up={props.up}>
                            <Over>
                                <H3
                                    margin="0"
                                    uppercase
                                    color={Colors.yellow}
                                >{item.name}</H3>
                                <H3
                                    margin="0"
                                    uppercase
                                    color={Colors.yellow}>{item.last_name}</H3>
                                <Paragraph margin="5px 0" color={Colors.verylightGray}>{item.job_title}</Paragraph>
                                <Paragraph
                                    fontSize="14px"
                                    fs_lg="16px"
                                    margin="15px 0 5px 0"
                                    color={Colors.lightGray}>
                                    {item.bio}
                                </Paragraph>
                                <a href={item.linkdin != '' ? `${item.linkdin}` : "#"} target="_blank" rel="noopener noreferrer nofollow">
                                    <Icon icon="arrowright" width="32" color={Colors.yellow} fill={Colors.yellow} />
                                </a>
                            </Over>
                        </RoundImage>
                    </Column>
                )
            })}
        </Row>
    )
}

export default Mentors;