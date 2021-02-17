import React, {useState} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../Heading'
import {RoundImage, Colors} from '../Styling';
import {Row, Column, Div} from '../Sections'
import Fragment from "../Fragment"
import Img from 'gatsby-image';
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

const Staff = props => {
    const data = useStaticQuery(graphql`
    query myNewStaffQuery{
        allStaffYaml {
            edges {
                node {
                    fields {
              lang
            }
            heading
            sub_heading
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
    console.log("Staff: ", staff)
    return (
        <Fragment github="/components/staff">
            <Div alignItems="center" flexDirection="column" >
                <H4 fontSize="15px" lineHeight="19px" fontWeight="900">{props.heading || staff.heading}</H4>
                <Paragraph width="331px" textAlign="center" margin="14px 0 50px 0">{props.paragraph || staff.sub_heading}</Paragraph>
            </Div>
            <Div className="testimonial-slider" display="flex" display_md="none" height="auto" padding="0 17px 59px 17px">
                {staff.staff.map((item, index) => {
                    console.log(`${item.name}: ${item.bio && item.bio.length}`)
                    return (
                        <Div key={index} flexDirection="column" alignItems="center">
                            <Div minWidth="184px" height="184px" margin="0 10px 0 0" alignItems="center">
                                <Img
                                    fluid={item.image.childImageSharp.fluid}
                                    style={{height: "100%", minWidth: "100%", backgroundSize: `cover`}}
                                />
                            </Div>
                            <H3
                                fontSize="15px"
                                lineHeight="19px"
                                margin="14px 0 0 0"

                            >
                                {item.name}
                            </H3>
                            <H4
                                fontSize="14px"
                                lineHeight="22px"
                                margin="0 0 6px 0"
                            >
                                {item.job_title}
                            </H4>
                            <Icon icon="linkedin" width="14px" fill="#2867b2" stroke="#2867b2" />
                        </Div>
                    )
                })}
            </Div>
        </Fragment>
    )
}

export default Staff;
        // <Row github="/components/staff" display="flex">
        //     {staff.staff.map((item, index) => {
        //         console.log(`${item.name}: ${item.bio && item.bio.length}`)
        //         return (
        //             <Column key={index} size_xs="12" size_sm="12" size_md="6" size_lg="6" size="4" >
        //                 <RoundImage
        //                     pos={`relative`}
        //                     opacity="1"
        //                     mb="20px"
        //                     url={item.image}
        //                     bsize="cover"
        //                     border="10px"
        //                     height="280px"
        //                     width="100"
        //                     move up={props.up}>
        //                     <Over>
        //                         <H3
        //                             margin="0"
        //                             uppercase
        //                             color={Colors.yellow}
        //                         >{item.name}</H3>
        //                         <H3
        //                             margin="0"
        //                             uppercase
        //                             color={Colors.yellow}>{item.last_name}</H3>
        //                         <Paragraph margin="5px 0" color={Colors.verylightGray}>{item.job_title}</Paragraph>
        //                         <Paragraph
        //                             fontSize="14px"
        //                             fs_lg="16px"
        //                             margin="15px 0 5px 0"
        //                             color={Colors.lightGray}>
        //                             {item.bio}
        //                         </Paragraph>
        //                         <a href={item.linkdin != '' ? `${item.linkdin}` : "#"} target="_blank" rel="noopener noreferrer nofollow">
        //                             <Icon icon="arrowright" width="32" color={Colors.yellow} fill={Colors.yellow} />
        //                         </a>
        //                     </Over>
        //                 </RoundImage>
        //             </Column>
        //         )
        //     })}
        // </Row>

        // {/* <Img
        //                         fluid={item.student_thumb.childImageSharp.fluid}
        //                         alt={item.alt}
        //                         style={{height: "39px", minWidth: "39px", backgroundSize: `cover`}}
        //                     />
        //                     <Div display="flex" flexDirection="column" alignItems="flex-start" width="100%" height="100%" padding="0 9px 0 9px" style={{position: "relative"}}>

        //                         <H3
        //                             fontSize="15px"
        //                             lineHeight="19px"
        //                             textAlign="left"
        //                         >
        //                             {item.student_name}
        //                         </H3>
        //                         <H4
        //                             fontSize="14px"
        //                             lineHeight="22px"
        //                             textAlign="left"
        //                         >
        //                             {item.short_content}
        //                         </H4>
        //                         {
        //                             item.linkedin_url != "" && item.linkedin_image != null &&
        //                             <a href={item.linkedin_url} target="_blank" rel="noopener noreferrer">
        //                                 <Img
        //                                     fluid={item.linkedin_image.childImageSharp.fluid}
        //                                     alt={item.alt}
        //                                     style={{
        //                                         height: "14px", width: "59px", margin: "auto", backgroundSize: `cover`, position: "absolute", bottom: "0", right: "0"
        //                                     }}
        //                                 />
        //                             </a>
        //                         }
        //                     </Div> */}