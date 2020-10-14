import React, {useState} from 'react';
import {graphql} from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../global/Layout';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H2, H3, H4, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button, StyledBackgroundSection} from '../components/Styling'
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
        <Card shadow borders="1.25rem"  >
          <Row
            height="100%"
            marginLeft="0"
            marginRight="0"
            customRespSize
          >
            <Column size="6" size_sm={`12`} alignSelf="center" height="100%" >
              <Row align="center" padding={`20px`}>
                <Paragraph
                  color={Colors.gray}
                  fontSize="18px"
                  fs_sm="14px"
                  lineHeight="20px"
                  margin="20px 0 0 0"
                  align="left"
                >
                  {yml.about.content}
                </Paragraph>
              </Row>
              <Row align="around" padding={`10px`}>
                <Link to={yml.about.button_link}>
                  <Paragraph
                    color={Colors.blue}
                    fontSize="20px"
                    fs_sm="18px"
                    lineHeight="20px"
                    margin="20px 0 0 0"
                    align="left"
                  >
                    {yml.about.button}
                  </Paragraph></Link>
              </Row>
            </Column>
            <Column
              size="6"
              size_sm={`12`}
              paddingLeft={`0`}
              paddingRight={`0`}
              borderRadius="0 1.25rem 1.25rem 0"
            >
              <StyledBackgroundSection
                className={`img-right`}
                height={`426px`}
                image={yml.about.about_image.image.childImageSharp.fluid}
                bgSize={`cover`}
                alt={yml.about.about_image.alt}
                borderRadius={`0 1.25rem 1.25rem 0`}
              />
            </Column>
          </Row>
        </Card>
      </Wrapper>
      <Divider height="500px" />
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
            about_image{
              image {
                childImageSharp {
                  fluid(maxWidth: 800){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              } 
              alt
            } 
            content
            button
            button_link
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
            }
            projects {
                project_name
                slug
                project_image {
                  childImageSharp {
                    fluid(maxWidth: 800){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
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