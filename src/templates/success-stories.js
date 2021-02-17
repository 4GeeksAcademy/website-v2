import React, {useState} from 'react';
import {Column, Row, Container, Div, Grid} from "../new_components/Sections";
import {Title, H1, H2, H3, H4, H5, Paragraph} from '../new_components/Heading';
import {Button, Colors, StyledBackgroundSection} from '../new_components/Styling';
import BaseRender from './_baseLayout';


const SuccessStories = (props) => {
    const {data, pageContext, yml} = props;
    return (
        <>
            <Container
                variant="fluid"
                margin="120px auto">
                <Div
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <H1
                        fontSize="13px"
                        lineHeight="16px"
                        fontWeight="700"
                        letterSpacing="0.05em"
                        color="#606060"
                    >{yml.seo_title}</H1>
                    <H2 fontSize="50px" lineHeight="60px" margin="16px 17px 19px 17px">{yml.header.tagline}</H2>
                    <Paragraph margin="0 17px 19px 17px" width_sm="70%" width_tablet="50%">Aprende desde cero hasta tener tu primer trabajo como programador. Recibe mentoría ilimitada, soporte de por vida
        y consigue un trabajo como programador en 16 semanas después de empezar.</Paragraph>

                </Div>
                <Container variant="fixed">
                    {/* <Badges lang={pageContext.lang} /> */}
                </Container>
            </Container>
            <Container variant="fixed">
                <Grid height="908px" height_md="507px" columns="1" rows="1" columns_md="12" gridGap="11px">
                    <Div

                        height="507px"
                        background={Colors.darkYellow}
                        borderRadius="3px"
                        gridArea_md="1/1/6/5"
                    >
                    </Div>
                    <Div
                        height="378px"
                        height_md="507px"
                        borderRadius="3px"
                        border={`1px solid ${Colors.lightGray}`}
                        gridArea_md="1/5/6/13"
                    >
                    </Div>
                </Grid>
            </Container>
            {/* WORKING GRID */}
            {/* <Container variant="fixed">
                <Grid columns="1" columns_md="12" rows_md="4" gridGap="11px">
                    <Div
                        background={Colors.darkYellow}
                        height="300px"
                        width_md="100%"
                        height_md="100%"
                        borderRadius="3px"
                        gridArea_md="1/1/6/5"
                    >
                    </Div>
                    <Div
                        borderRadius="3px"
                        height="300px"
                        width_md="100%"
                        height_md="100%"
                        border={`1px solid ${Colors.lightGray}`}
                        gridArea_md="1/5/6/13"
                    >
                    </Div>
                </Grid>
            </Container> */}
            <Container variant="fixed">
                <Div style={{border: `7px solid ${Colors.verylightGray}`}} />
            </Container>
            <Container variant="fixed">
                <Grid height="375px" height_md="507px" columns_md="12" rows_md="10" gridGap="11px">
                    <Div
                        borderRadius="3px"
                        border={`1px solid ${Colors.lightGray}`}
                        style={{
                            gridColumnStart: "1",
                            gridColumnEnd: "5",
                            gridRowStart: "1",
                            gridRowEnd: "4",

                        }}>
                    </Div>
                    <Div
                        borderRadius="3px"
                        border={`1px solid ${Colors.lightGray}`}
                        style={{
                            gridColumnStart: "5",
                            gridColumnEnd: "9",
                            gridRowStart: "1",
                            gridRowEnd: "4",

                        }}>
                    </Div>
                    <Div background={Colors.darkYellow}
                        borderRadius="3px"
                        style={{
                            gridColumnStart: "9",
                            gridColumnEnd: "13",
                            gridRowStart: "1",
                            gridRowEnd: "6",
                        }}>
                    </Div>
                    <Div
                        borderRadius="3px"
                        border={`1px solid ${Colors.lightGray}`}
                        style={{
                            gridColumnStart: "1",
                            gridColumnEnd: "9",
                            gridRowStart: "4",
                            gridRowEnd: "8",

                        }}>
                    </Div>
                    <Div
                        borderRadius="3px"
                        border={`1px solid ${Colors.lightGray}`}
                        style={{
                            gridColumnStart: "9",
                            gridColumnEnd: "13",
                            gridRowStart: "6",
                            gridRowEnd: "9",

                        }}>
                    </Div>
                </Grid>
            </Container>
        </>
    )
};
export const query = graphql`
  query SuccessQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            seo_title
            header{
                tagline
                paragraph
                
            }
           
            
           
            
        }
      }
    }
    allTestimonialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
          node {
            heading
      button_text
      button_link
            testimonials {
              student_name
              featured
              testimonial_date
              hidden
              linkedin_url
              linkedin_text
              linkedin_image{
                childImageSharp {
                  fluid(maxHeight: 14){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              student_thumb{
                childImageSharp {
                  fluid(maxHeight: 200){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              short_content
              content
              source_url
              source_url_text
            }
          }
        }
      }
    
  }
`;
export default BaseRender(SuccessStories);