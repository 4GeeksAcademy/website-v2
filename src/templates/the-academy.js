import React from 'react';
import {Container, Column, Row, Wrapper, Divider, WrapperImage} from '../components/Sections';
import {Title, H1, H2, H3, H4, Paragraph, Separator} from '../components/Heading'
import Card from '../components/Card'
import {Colors, StyledBackgroundSection} from '../components/Styling'
import Mentors from '../components/Mentors'
import {Charts} from '../components/Chart'
import Credentials from '../components/Credentials'
import BaseRender from './_baseLayout'
import WhoIsHiring from '../components/WhoIsHiring';
import BlogPosts from '../components/BlogPosts'
import {Link} from 'gatsby'
import Icon from '../components/Icon'
import Img from "gatsby-image"

const Why = (props) => {
  const {data, pageContext, yml} = props;
  const cornerstone = yml.cornerstones;
  const hiring = data.allPartnerYaml.edges[0].node;
  return (
    <>
      <WrapperImage
        imageData={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
        className={`img-header`}
        bgSize={`cover`}
        alt={yml.header_data.alt}
        customBorderRadius="0 0 0 1.25rem"
        paddingRight={`0`}
      >
        <Divider height="150px" md="100px" />
        <Title
          size="5"
          color={Colors.white}
          title={yml.header_data.tagline}
          paragraph={yml.header_data.sub_heading}
          variant="main"
          paragraphColor={Colors.white}
          fontSize="46px"
          fs_xs="35px"
          textAlign="center"

        />
        <Divider height="150px" md="0" />
      </WrapperImage>

      <Wrapper margin="30px">
        <Row align="center" >
          <Column size="4" margin="5px 0">
            <Paragraph
              margin="5px 0"
              color={Colors.gray}
              fs_xs="10px"
              fs_sm="12px"
              fs_md="12px"
              align="center">{yml.education.left_box.heading}
            </Paragraph>
            <Img className={`image`} fluid={yml.education.left_box.image.childImageSharp.fluid} alt="Florida Education Logo"></Img>
          </Column>
          <Column size="4" margin="5px 0">
            <Paragraph
              margin="5px 0"
              color={Colors.gray}
              fs_xs="10px"
              fs_sm="12px"
              fs_md="12px"
              fs_lg="12px"
              fs_xl="12px"
              align="center">{yml.education.center_box.heading}
            </Paragraph>
            <Img className={`image`} fluid={yml.education.center_box.image.childImageSharp.fluid} alt="Newsweek Logo"></Img>
          </Column>
          <Column size="4" margin="5px 0">
            <Paragraph
              margin="5px 0"
              color={Colors.gray}
              fs_xs="10px"
              fs_sm="12px"
              fs_md="12px"
              fs_lg="12px"
              fs_xl="12px"
              align="center">{yml.education.right_box.heading}
            </Paragraph>
            <Img className={`image`} fluid={yml.education.right_box.image.childImageSharp.fluid} alt="Cnn Logo"></Img>
          </Column>
        </Row>
        <Row>
          <Column size="4" margin="5px 0"></Column>
          <Column size="4" margin="5px 0">
            <Paragraph

              color={Colors.gray}
              fs_xs="10px"
              fs_sm="12px"
              fs_md="12px"
              fs_lg="12px"
              fs_xl="12px"
              align="center">2017 Report
                    </Paragraph>
          </Column>
          <Column size="4" margin="5px 0"></Column>
        </Row>
      </Wrapper>

      <Wrapper margin="0 0 50px 0">
        <Credentials transform="translateY(-100px)" lang={data.allCredentialsYaml.edges} />
      </Wrapper>

      <Wrapper margin="50px">
        <Title
          size="8"
          title={yml.cornerstones.heading}
          paragraph={yml.cornerstones.sub_heading}
          paragraphColor={Colors.gray}
          variant="primary"
        />
      </Wrapper>
      <Wrapper
        margin="50px"
        background={Colors.lightGray}
        border="custom"
        right
        customBorderRadius="1.25rem 0 0 1.25rem"
      >
        <Row github={`/page/the-academy.${pageContext.lang}.yml`} marginBottom="30px">
          {cornerstone.cornerstones_list.map((item, index) => {
            return (
              <Column key={index} size="6" size_sm="12" margin="0 0 10px 0">
                <Card
                  width="100%"
                  height="250px"
                  color="black"
                  padding="30px"
                  transform="translateY(-100px)"
                  marginXs="0 0 30px 0"
                >
                  <Row >
                    <Column size="3" pl_lg="0">
                      <Icon icon={item.icon} width="48px" color={Colors.yellow} fill={Colors.yellow} />
                    </Column>
                    <Column size="8" >
                      <Row>
                        <H4
                          fs_xs="18px"
                          fs_lg="20px"
                          fontSize="22px"
                          color={Colors.white}
                        >
                          {item.title}
                        </H4>
                      </Row>
                      <Row marginTop="15px">
                        <Paragraph
                          fs_sm="16px"
                          fontSize="18px"
                          lineHeight="18px"
                          color={Colors.lightGray}>
                          {item.content}
                        </Paragraph>
                      </Row>
                    </Column>
                  </Row>
                </Card>
              </Column>
            )
          })}

        </Row>
      </Wrapper>
      <Wrapper margin="50px 0 150px 0" >
        {/* MEET THE TEAM */}
        <Title
          size="8"
          title={yml.staff.heading}
          paragraph={yml.staff.sub_heading}
          variant="primary"
        />
        <Mentors />
      </Wrapper>
      <Wrapper
        background={Colors.lightGray}
        border="custom"
        right
        wide
        customBorderRadius="1.25rem 0 0 1.25rem"
      >
        <Card shadow borders="1.25rem" minHeight="450px" transform="translateY(-20%)">
          <Row
            github={`/page/the-academy.${pageContext.lang}.yml#L77`}
            height="100%"
            marginLeft="0"
            marginRight="0"
          >
            <Column size="6" size_md="5" size_sm="12"
              alignSelf="center" height="100%" borderRadius="0 0 0 1.25rem"
              padding="50px 10px"
            >
              <H3 align="left" >{yml.story.heading}</H3>
              <Separator left variant={"primary"} />
              <Paragraph
                color={Colors.gray}
                margin="20px 0 0 0"
                align="left"
                fs_sm="14px"
                fs_xl="14px"
              >
                {yml.story.sub_heading_one}
              </Paragraph>
              <Link to={yml.story.button_link}>
                <Paragraph
                  color={Colors.blue}
                  margin="20px 0 0 0"
                  align="left"
                  fs_sm="14px"
                  fs_xl="14px"
                >
                  {yml.story.button}
                </Paragraph>
              </Link>
            </Column>
            <Column
              size="6"
              size_md="7"
              size_sm="12"
              alignSelf="center"
              height="100%"
              backgroundSize="cover"
              paddingRight={`0`}
              pl_sm={0}
              border="custom"
              borderRadius="0 1.25rem 1.25rem 0"
            >
              <StyledBackgroundSection
                className={`img-right`}
                backgroundPosition="top center"
                height="450px"
                h_sm="350px"
                image={yml.story.image.childImageSharp.fluid}
                bgSize={`cover`}
                // alt={yml.about.about_image.alt}
                borderRadius={`0 1.25rem 1.25rem 0`}
                borderRadius_sm={`0 0 1.25rem 1.25rem`}
              />
            </Column>
          </Row>
        </Card>
      </Wrapper>
      <Wrapper margin="50px">
        <Title
          variant="primary"
          title={yml.posts.heading}
        />
        <BlogPosts
          filter={[
            'why-we-teach-python-4geeks',
            'dont-teach-nodejs-full-stack-development-program',
            'choosing-coding-bootcamp'
          ]}
          featured
        />
      </Wrapper>
      <Wrapper margin="50px"
        right
        background={Colors.lightGray} border="top"
      >
        <Title
          size="10"
          marginTop="50px"
          title={hiring.partners.tagline}
          paragraph={hiring.partners.sub_heading}
          paragraphColor="black"
          variant="primary"
        />
        <WhoIsHiring
          margin="50px"
          images={hiring.partners.images}
          footerTagline={hiring.partners.footer_tagline}
          footerLink={hiring.partners.footer_link}
          footerButton={hiring.partners.footer_button}
        />
        <Title
          size="10"
          marginTop="50px"
          title={hiring.influencers.tagline}
          paragraph={hiring.influencers.sub_heading}
          paragraphColor="black"
          variant="primary"
        />
        <WhoIsHiring
          margin="50px"
          images={hiring.influencers.images}
          footerTagline={hiring.influencers.footer_tagline}
          footerLink={hiring.influencers.footer_link}
          footerButton={hiring.influencers.footer_button}
        />
      </Wrapper>
      <Wrapper
        margin="50px 0"
        github="/components/outcomes"
      >
        <Title
          size="10"
          title={yml.outcomes.heading}
          paragraph={yml.outcomes.sub_heading}
          paragraphColor={Colors.gray}
          margin={"auto"}
          variant="primary"
          maxWidth="700px"
        />
        <Row align='center'>
          <Column size="3" size_sm='12' padding="20px 0">
            <Row>
              <Column size="12">
                <H4
                  fs_xs="20px"
                  fs_sm="24px"
                  fs_md="16px"
                  fs_lg="18px"
                  fontSize="20px"
                >{yml.outcomes.left.title}</H4>
              </Column>
            </Row>
            <Divider height="30px" />
            <Row>
              <Column size="12" align="left"><Paragraph
                fs_xs="12px"
                fs_sm="13px"
                fs_md="12px"
                fs_lg="12px"
                fs_xl="14px"
              >{yml.outcomes.left.content}</Paragraph></Column>
            </Row>
            <Row marginTop="15px">
              <Column size="12" align="left">
                <Paragraph
                  color={Colors.blue}
                  fs_xs="12px"
                  fs_sm="13px"
                  fs_md="12px"
                  fs_lg="12px"
                  fs_xl="14px"
                >{yml.outcomes.left.sub_content}</Paragraph></Column>
            </Row>
          </Column>
          <Column size="9" >
            <Row align="center">
              <Column size="4" size_sm="12" padding="20px 0" align="center"><H4
                uppercase
                fs_xs="16px"
                fs_sm="18px"
                fs_md="16px"
                fs_lg="18px"
                fontSize="20px"
              >{yml.outcomes.right.chart_one.title}</H4>
                <Charts dataArray={yml.outcomes.right.chart_one.data} />
              </Column>
              <Column size="4" size_sm="12" padding="20px 0" align="center"><H4
                uppercase
                fs_xs="16px"
                fs_sm="18px"
                fs_md="16px"
                fs_lg="18px"
                fontSize="20px"
              >{yml.outcomes.right.chart_two.title}</H4>
                <Charts dataArray={yml.outcomes.right.chart_two.data} />
              </Column>
              <Column size="4" size_sm="12" padding="20px 0" align="center"><H4
                uppercase
                fs_xs="16px"
                fs_sm="18px"
                fs_md="16px"
                fs_lg="18px"
                fontSize="20px"
              >{yml.outcomes.right.chart_three.title}</H4>
                <Charts dataArray={yml.outcomes.right.chart_three.data} />
              </Column>
            </Row>
          </Column>
        </Row>
        <Row align='center'>
          <Column size="8" align="center">
            <Paragraph
              color={Colors.blue}
              fs_xs="14px"
              fs_sm="14px"
              fs_md="16px"
              fs_lg="16px"
              fs_xl="14px"
            >{yml.outcomes.left.bottom_message}
            </Paragraph>
          </Column>
        </Row>
      </Wrapper>
    </>
  )
};

export const query = graphql`
  query AboutQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            header_data{
                tagline
                sub_heading
                image{
                    childImageSharp {
                      fluid(maxWidth: 1200){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  } 
                alt
            }
            education{
                left_box{
                    heading
                    image {
                      childImageSharp {
                        fluid(maxWidth: 300){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                        fixed(width: 300, height: 60) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                    alt
                }
                center_box{
                    heading
                    image {
                      childImageSharp {
                        fluid(maxWidth: 300){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                        fixed(width: 300, height: 60) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                    alt
                }
                right_box{
                    heading
                    image {
                      childImageSharp {
                        fluid(maxWidth: 300){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                        fixed(width: 300, height: 60) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                    alt
                }
            }
            outcomes{
                heading
                sub_heading
                image
                left{
                    title
                    content
                    sub_content
                    bottom_message
                }
                right{
                    chart_one{
                        title
                        data
                    }
                    chart_two{
                        title
                        data
                    }
                    chart_three{
                        title
                        data
                    }
                    
                }
            }
            cornerstones {
                heading
                sub_heading
                cornerstones_list {
                  content
                  icon
                  title
                }
            }
            staff{
                heading
                sub_heading
            }
            story{
                heading
                sub_heading_one
                button
                button_link
                image{
                    childImageSharp {
                      fluid(maxWidth: 800){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  } 
            }
            posts{
                heading
                sub_heading
            }
        }
      }
    }
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
          node {
            credentials {
              title
              icon
              value
            }
          }
        }
      }
      allPartnerYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
            node {
              partners {
                images {
                  name
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              coding {
                images {
                  name
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              influencers {
                images {
                  name
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              financials {
                images {
                  name
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
            }
          }
        }
  }
`;

export default BaseRender(Why);