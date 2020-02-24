import React, {useState} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {RoundImage} from '../Styling';
import {Row, Column} from '../Sections'
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
    function Over () {

    }
    return (
        <>
            <Row>
                {staff[0].node.staff.map((item, index) => {
                    return (
                        <Column key={index} size="3" customRespSize respSize="6" margin="10px 0" >
                            <RoundImage mb="20px" url={item.image} bsize="cover" border="10px" width="100%" height="250px" move up={props.up}> </RoundImage>
                        </Column>
                    )
                })}
            </Row>
        </>
    )
}

export default Mentors;