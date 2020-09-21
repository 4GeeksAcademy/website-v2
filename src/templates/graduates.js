import React, {useState} from 'react';
import {graphql} from 'gatsby'
import Layout from '../global/Layout';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H2, H3, H4, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Card} from '../components/Card'
import BaseRender from './_baseRender'
import AlumniProjects from '../components/AlumniProjects'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Graduates = ({data, pageContext, yml}) => {
  return (
    <>
      <Wrapper margin="50px 0">
        <Title
          title={yml.banner.tagline}
          variant="primary"
          size="8"
          paragraph={yml.banner.sub_heading}
          paragraphColor={Colors.darkGray}
        />
        <AlumniProjects lang={data.allAlumniProjectsYaml.edges} showThumbs="true" changeIndex={() => setSlideIndex()} playerHeight="500px" />
      </Wrapper>
      <Divider height="50px" />
      <Wrapper
        
        height="400px"
      >
        <Title
          title={yml.about.heading}
          variant="primary"
          size="8"
          paragraph={yml.about.sub_heading}
        />
        <Divider height="50px" />
        <Row>
          <Column
            size="12"
            border="bottom"

          >
            <Card shadow borders="1.25rem" height="426px" >
              <Row
                height="100%"
                marginLeft="0"
                marginRight="0"
                customRespSize
              >
                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" border="bottom">
                  <Row align="center" height="100%">
                    <Column size="8" height="100%">
                      <Row height="5%" />
                      <Row height="90%" align="around">
                        <Column size="12" alignSelf="center">
                          <Paragraph
                            color={Colors.gray}
                            fs_xs="12px"
                            fs_sm="12px"
                            fs_md="12px"
                            fs_lg="12px"
                            fs_xl="12px"
                            lineHeight="20px"
                            margin="20px 0 0 0"
                            align="left"
                          >
                            {yml.about.content}
                          </Paragraph>
                        </Column>
                      </Row>
                      <Row height="5%" />
                    </Column>
                  </Row>
                </Column>
                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" backgroundSize="cover" image={yml.about.image} border="custom" customBorderRadius="0 1.25rem 1.25rem 0" />
              </Row>
            </Card>
          </Column>
        </Row>
      </Wrapper>
      <Divider height="250px" />
    </>
  )
};
export const query = graphql`
  query AlumniQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
          
          meta_info{
            slug
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
          about{
            heading
            sub_heading
            image
            content
          }
        }
      }
    }
    allAlumniProjectsYaml(filter: { fields: { lang: { eq: $lang }}}){
        edges {
          node {
            header{
              tagline
              sub_heading
              button_text
            }
            projects {
                project_name
                slug
                project_image{
                    image {
                        childImageSharp {
                          fluid(maxWidth: 800){
                            ...GatsbyImageSharpFluid_withWebp
                          }
                        }
                      } 
                    image_alt
                }
                project_content
                project_video
                live_link
                github_repo
                alumni {
                  first_name
                  last_name
                  job_title
                  github
                  linkedin
                  twitter
                }
              }
            button_section{
              button_text
              button_link
            }
          }
        }
      }
  }
`;
export default BaseRender(Graduates);