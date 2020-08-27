import React from 'react';
import BaseRender from './_baseRender'
import {Container, Row, Column, Wrapper, Divider, Sidebar} from '../components/Sections'
import {Title, H1, H2, H3, Span, Paragraph} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, RoundImage} from '../components/Styling'
import Link from 'gatsby-link'

const ThankYou = (props) => {
    const {data, pageContext, yml} = props;
    return (
        <>
            <Wrapper style="default"
                image={yml.banner.image}
                height="300px"
                border="bottom"
            >
                <Divider height="100px" />
                <Title
                    size="5"
                    color={Colors.white}
                    title={yml.banner.tagline}
                    paragraph={yml.banner.sub_heading}
                    main
                    paragraphColor={Colors.white}
                    fontSize="46px"
                    textAlign="center"

                />

            </Wrapper>
            <Divider height="100px" />
            <Wrapper style="default">
                <Row align="center">
                    <Column size="12" align="center">
                        <H2>{yml.content.title}</H2>
                    </Column>
                </Row>
                <Row align="center">
                    <Column size="8" align="center">
                        <Paragraph>{yml.content.message}</Paragraph>
                    </Column>
                </Row>
                <Divider height="50px" />
                <Row>
                    <Column size="12" align="center">
                        <Link to="/blog"><Button width="150px" color={Colors.blue} textColor={Colors.white}>Go to the blog</Button></Link>
                    </Column>
                </Row>
            </Wrapper>
            <Divider height="100px" />
        </>
    )
};
export const query = graphql`
  query ThankQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            banner{
                tagline
                sub_heading
                image{
                    childImageSharp {
                      fluid(maxWidth: 1200){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  } 
            }
            content{
                title
                message
            }
            
        }
      }
    }
  }
`;
export default BaseRender(ThankYou);