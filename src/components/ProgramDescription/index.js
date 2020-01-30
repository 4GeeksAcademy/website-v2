import React, {useState} from 'react';
import styled from 'styled-components';
import {Card} from '../Card'
import {Row} from '../Sections'
import {H5, Paragraph} from '../Heading'
import {Button, Colors} from '../Styling'

const Header = styled.div`
    background: black;
    border-radius: 1.25rem 1.25rem 0 0;
    height: 85px;
    color: white;
    font-family: 'lato', sans-serif;
    font-size: 14px;
    font-weight: 800;
    align-items: center;
`;
const Body = styled.div`
    background: white;
    height:400px;
    padding: 50px;
`
const ProgramDescription = () => {
    const data = useStaticQuery(graphql`
    query myQueryDetails{
        program: allProgramDetailsYaml {
            edges {
              node {
                part_time {
                  module_name
                  title
                  description
                  duration
                  slug
                  projects
                }
                full_time {
                  module_name
                  title
                  description
                  duration
                  slug
                  projects
                }
              }
            }
          }
      }
    `)
    return (
        <Card width="100%" height="600px" color="white" shadow>
            {/* <Row marginLeft="0px" marginRight="0px" background="black"> */}
            <Header>

            </Header>
            <Body>


            </Body>

            {/* </Row> */}
        </Card >
    )
};

export default ProgramDescription;
