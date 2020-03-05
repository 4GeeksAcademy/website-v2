import React from 'react';
import Layout from '../global/Layout';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections"
import {Title} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
import Credentials from '../components/Credentials'
import WhoIsHiring from '../components/WhoIsHiring'
import BaseRender from './_baseRender'


const Partners = (props) => {
    const {data, pageContext, yml} = props;
    return (
        <>
            <Wrapper
                style="default"
                image="yes"
                url={yml.image}
                border="bottom"
                height="500px"
            >
                <Divider height="100px" />
                <Title
                    size="5"
                    title={yml.tagline}
                    paragraph={yml.sub_heading}
                    main
                    color={Colors.white}
                    fontSize="46px"
                    textAlign="center"
                    paragraphColor={Colors.white}
                />
                <Row align="center">
                    <Button width="300px" margin="15px 0px" color="red" textColor="white">{yml.button}</Button>
                </Row>
            </Wrapper>
            <Wrapper
                style="default">
                <Credentials move="up" up="100" />
            </Wrapper>
            <Divider height="50px" />
            <Wrapper
                style="default"
                image="no"
                color={Colors.lightGray}
                border="top"
            >

                <Divider height="20px" />
                <WhoIsHiring source="partners" />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default"
            >
                <Divider height="50px" />


                <WhoIsHiring source="coding" />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default"
            >
                <Divider height="50px" />


                <WhoIsHiring source="influencers" />
                <Row align="center">
                    <Button width="300px" color={Colors.blue} textColor={Colors.white} margin="2rem 0" padding=".85rem">{yml.button_section.button_text}</Button>
                </Row>
            </Wrapper>
        </>
    )
};
export const query = graphql`
  query PartnersQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            sub_heading
            button
            image
            meta_info{
                slug
                title
                description
                image
                keywords
            }
            button_section{
                button_text
            }
        }
      }
    }
  }
`;
export default BaseRender(Partners);