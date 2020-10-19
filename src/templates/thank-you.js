import React from 'react';
import BaseRender from './_baseLayout'
import { Column, Wrapper, Divider, Sidebar} from '../components/Sections'
import {Title, H1, H2, H3, Paragraph} from '../components/Heading'
import {Button, Colors, RoundImage} from '../components/Styling'
import Link from 'gatsby-link'

const ThankYou = (props) => {
    const {data, pageContext, yml} = props;
    return (
        <>
            <Wrapper
                margin="50px 0 0 0"
                image={yml.banner.image}
                border="bottom"
            >
                <Title
                    size="5"
                    color={Colors.white}
                    title={yml.banner.tagline}
                    paragraph={yml.banner.sub_heading}
                    variant="main"
                    paragraphColor={Colors.white}
                    fontSize="46px"
                    textAlign="center"

                />

            </Wrapper>
            <Wrapper margin="0 0 50px 0">
                <H2 margin="5px 0">{yml.content.title}</H2>
                {yml.content.message.split("\n").map((m,i) => 
                    <Paragraph key={i} align="center">{m}</Paragraph>
                )}
                <Column margin="50px 0 0 0" size="12" align="center">
                <Link to="/blog"><Button width="150px" color={Colors.blue} textColor={Colors.white}>{yml.content.button}</Button></Link>
                </Column>
            </Wrapper>
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
                button
            }
            
        }
      }
    }
  }
`;
export default BaseRender(ThankYou);