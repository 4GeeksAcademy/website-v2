import React from 'react';
import {Container, Column, GridContainer, Div, Grid, Header} from '../new_components/Sections';
import {Title, H1, H2, H3, H4, Paragraph, Separator} from '../new_components/Heading'
import {Colors, StyledBackgroundSection} from '../new_components/Styling'
import Badges from '../new_components/Badges'
import OurPartners from '../new_components/OurPartners'
import Credentials from '../new_components/Credentials'
import BaseRender from './_baseLayout'
import Staff from '../new_components/Staff';
import BlogPosts from '../components/BlogPosts'
import {Link} from 'gatsby'
import Icon from '../new_components/Icon'
import {Circle} from '../new_components/BackgroundDrawing'
import Img from "gatsby-image"

const Why = (props) => {
  const {data, pageContext, yml} = props;
  const cornerstones = yml.cornerstones;
  const hiring = data.allPartnerYaml.edges[0].node;
  const partnersData = data.allPartnerYaml.edges[0].node;
  return (
    <>
      <Header
        seo_title={yml.seo_title}
        title={yml.header.title}
        paragraph={yml.header.paragraph}
        image={yml.header.image.childImageSharp.fluid}
        padding="0 0 60px 0"
        padding_tablet="0 0 60px 0"
        position="relative"
      >
        <Circle
          color="lightBlue"
          width="53px"
          height="53px"
          top="0"
          left="30px"
          zIndex="1"
        />
        <Circle
          color="yellow"
          width="250px"
          height="250px"
          bottom="-50px"
          right="-125px"
          opacity="0.2"
          zIndex="1"
        />
        <Circle
          color="yellow"
          width="116px"
          height="116px"
          bottom="-58px"
          left="-58px"
          zIndex="1"
        />
        <Circle
          color="yellow"
          width="21px"
          height="21px"
          top="160px"
          right="120px"
          zIndex="1"
        />
        <Circle
          color="blue"
          width="9px"
          height="9px"
          top="100px"
          left="10%"
        />

        <Circle
          color="blue"
          width="57px"
          height="57px"
          top="40px"
          right="10%"
          opacity="0.4"
        />
      </Header>
      <Grid gridTemplateColumns_tablet="14">
        <Div grid_column_tablet="1 / span 14">
          <StyledBackgroundSection
            height={`389px`}
            image={yml.header.image.childImageSharp.fluid}
            bgSize={`cover`}
            alt={yml.header.alt}
          />
        </Div>
      </Grid>

      <Badges lang={pageContext.lang} paragraph={yml.badges.paragraph} background={Colors.lightYellow} link padding="58px 17px" padding_tablet="70px 0" />

      <GridContainer height="auto" columns_tablet="2" padding="0" margin_tablet="0 0 88px 0">
        <Div flexDirection="column" justifyContent_tablet="start" padding="41px 17px 0 17px" padding_tablet="56px 0 0 0" >
          <H2 textAlign="left" margin="0 0 15px 0">{yml.what_is_4geeks.title}</H2>

          {yml.what_is_4geeks.paragraph.split("\n").map(paragraph =>
            <Paragraph textAlign="left" margin="0 0 15px 0" >{paragraph}</Paragraph>
          )}
        </Div>
        <Div width_tablet="331px" justifySelf_tablet="end" padding_tablet="56px 0 0 0" >
          <StyledBackgroundSection
            height={`390px`}
            width="100%"
            image={yml.what_is_4geeks.image && yml.what_is_4geeks.image.childImageSharp.fluid}
            bgSize={`cover`}
            alt={yml.what_is_4geeks.image_alt}
          />
        </Div>
      </GridContainer >
      <Credentials lang={data.allCredentialsYaml.edges} />
      <GridContainer margin="0 0 40px 0" padding="0">
        <Div flexDirection="column" >
          <H2 >{cornerstones.title}</H2>
        </Div>
      </GridContainer>
      <GridContainer padding="0 17px" height="auto" columns_tablet="2" margin_tablet="0 0 51px 0" margin="0 0 20px 0">

        {
          Array.isArray(cornerstones.cornerstones_list) && cornerstones.cornerstones_list.map((m, i) => {
            return (
              <Div margin="0 0 40px 0" key={i}>
                <Div><Icon icon={m.icon} width="43px" height="34px" /></Div>
                <Div flexDirection="column" margin="0 0 0 15px">
                  <H3 textAlign="left" margin="0 0 20px 0">{m.title}</H3>
                  {m.content.split('\\n').map((d, i) =>
                    <Paragraph
                      textAlign="left"
                      color={Colors.darkGray}
                      key={i}                        >
                      {d}
                    </Paragraph>
                  )}
                </Div>
              </Div>
            )
          })
        }
      </GridContainer>
      <GridContainer margin_tablet="0 0 76px 0" margin="0 0 65px 0">
        <Div height="5px" background={Colors.verylightGray}></Div>
      </GridContainer>

      <OurPartners
        images={partnersData.partners.images}
        title={partnersData.partners.tagline}
        paragraph={partnersData.partners.sub_heading}
        showFeatured={true}
        props={partnersData.partners}
        marquee
      />
      <Staff lang={pageContext.lang} />
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
            seo_title
            header{
                title
                paragraph
                image{
                    childImageSharp {
                      fluid(maxWidth: 1200, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
            }
            badges{
              paragraph
            }
            what_is_4geeks{
              title
                paragraph
                image{
                    childImageSharp {
                      fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                image_alt
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
                title
                paragraph
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
                      fluid(maxWidth: 1600, quality: 100){
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


{/* <Wrapper margin="30px">
        <Row display="flex" justifyContent="center" >
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
        <Row display="flex">
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
        <Row display="flex" github={`/page/the-academy.${pageContext.lang}.yml`} marginBottom="30px">
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
                  <Row display="flex">
                    <Column size="3" pl_lg="0">
                      <Icon icon={item.icon} width="48px" color={Colors.yellow} fill={Colors.yellow} />
                    </Column>
                    <Column size="8" >
                      <Row display="flex">
                        <H4
                          fs_xs="18px"
                          fs_lg="20px"
                          fontSize="22px"
                          color={Colors.white}
                        >
                          {item.title}
                        </H4>
                      </Row>
                      <Row display="flex" marginTop="15px">
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
      //   <Title
      //     size="8"
      //     title={yml.staff.heading}
      //     paragraph={yml.staff.sub_heading}
      //     variant="primary"
      //   />
      //   <Mentors lang={pageContext.lang} />
      // </Wrapper >
      // <Wrapper
      //   background={Colors.lightGray}
      //   border="custom"
      //   right
      //   wide
      //   customBorderRadius="1.25rem 0 0 1.25rem"
      // >
      //   <Card shadow borders="1.25rem" minHeight="450px" transform="translateY(-20%)">
      //     <Row
      //       display="flex"
      //       github={`/page/the-academy.${pageContext.lang}.yml#L77`}
      //       height="100%"
      //       marginLeft="0"
      //       marginRight="0"
      //     >
      //       <Column size="6" size_md="5" size_sm="12"
      //         alignSelf="center" height="100%" borderRadius="0 0 0 1.25rem"
      //         padding="50px 10px"
      //       >
      //         <H3 align="left" >{yml.story.heading}</H3>
      //         <Separator left variant={"primary"} />
      //         <Paragraph
      //           color={Colors.gray}
      //           margin="20px 0 0 0"
      //           align="left"
      //           fs_sm="14px"
      //           fs_xl="14px"
      //         >
      //           {yml.story.sub_heading_one}
      //         </Paragraph>
      //         <Link to={yml.story.button_link}>
      //           <Paragraph
      //             color={Colors.blue}
      //             margin="20px 0 0 0"
      //             align="left"
      //             fs_sm="14px"
      //             fs_xl="14px"
      //           >
      //             {yml.story.button}
      //           </Paragraph>
      //         </Link>
      //       </Column>
      //       <Column
      //         size="6"
      //         size_md="7"
      //         size_sm="12"
      //         alignSelf="center"
      //         height="100%"
      //         backgroundSize="cover"
      //         paddingRight={`0`}
      //         pl_sm={0}
      //         border="custom"
      //         borderRadius="0 1.25rem 1.25rem 0"
      //       >
      //         <StyledBackgroundSection
      //           className={`img-right`}
      //           backgroundPosition="top center"
      //           height="450px"
      //           h_sm="350px"
      //           image={yml.story.image.childImageSharp.fluid}
      //           bgSize={`cover`}
      //           // alt={yml.about.about_image.alt}
      //           borderRadius={`0 1.25rem 1.25rem 0`}
      //           borderRadius_sm={`0 0 1.25rem 1.25rem`}
      //         />
      //       </Column>
      //     </Row>
      //   </Card>
      // </Wrapper>
      // <Wrapper margin="50px">
      //   <Title
      //     variant="primary"
      //     title={yml.posts.heading}
      //   />
      //   <BlogPosts
      //     filter={[
      //       'why-we-teach-python-4geeks',
      //       'dont-teach-nodejs-full-stack-development-program',
      //       'choosing-coding-bootcamp'
      //     ]}
      //     featured
      //   />
      // </Wrapper>
      // <Wrapper margin="50px"
      //   right
      //   background={Colors.lightGray} border="top"
      // >
      //   <Title
      //     size="10"
      //     marginTop="50px"
      //     title={hiring.partners.tagline}
      //     paragraph={hiring.partners.sub_heading}
      //     paragraphColor="black"
      //     variant="primary"
      //   />
      //   <WhoIsHiring
      //     margin="50px"
      //     images={hiring.partners.images}
      //     footerTagline={hiring.partners.footer_tagline}
      //     footerLink={hiring.partners.footer_link}
      //     footerButton={hiring.partners.footer_button}
      //   />
      //   <Title
      //     size="10"
      //     marginTop="50px"
      //     title={hiring.influencers.tagline}
      //     paragraph={hiring.influencers.sub_heading}
      //     paragraphColor="black"
      //     variant="primary"
      //   />
      //   <WhoIsHiring
      //     margin="50px"
      //     images={hiring.influencers.images}
      //     footerTagline={hiring.influencers.footer_tagline}
      //     footerLink={hiring.influencers.footer_link}
      //     footerButton={hiring.influencers.footer_button}
      //   />
      // </Wrapper>
      // <Wrapper
      //   margin="50px 0"
      //   github="/components/outcomes"
      // >
      //   <Title
      //     size="10"
      //     title={yml.outcomes.heading}
      //     paragraph={yml.outcomes.sub_heading}
      //     paragraphColor={Colors.gray}
      //     margin={"auto"}
      //     variant="primary"
      //     maxWidth="700px"
      //   />
      //   <Row display="flex" justifyContent='center'>
      //     <Column size="3" size_sm='12' padding="20px 0">
      //       <Row display="flex">
      //         <Column size="12">
      //           <H4
      //             fs_xs="20px"
      //             fs_sm="24px"
      //             fs_md="16px"
      //             fs_lg="18px"
      //             fontSize="20px"
      //           >{yml.outcomes.left.title}</H4>
      //         </Column>
      //       </Row>
      //       <Divider height="30px" />
      //       <Row display="flex">
      //         <Column size="12" align="left"><Paragraph
      //           fs_xs="12px"
      //           fs_sm="13px"
      //           fs_md="12px"
      //           fs_lg="12px"
      //           fs_xl="14px"
      //         >{yml.outcomes.left.content}</Paragraph></Column>
      //       </Row>
      //       <Row display="flex" marginTop="15px">
      //         <Column size="12" align="left">
      //           <Paragraph
      //             color={Colors.blue}
      //             fs_xs="12px"
      //             fs_sm="13px"
      //             fs_md="12px"
      //             fs_lg="12px"
      //             fs_xl="14px"
      //           >{yml.outcomes.left.sub_content}</Paragraph></Column>
      //       </Row>
      //     </Column>
      //     <Column size="9" >
      //       <Row display="flex" justifyContent="center">
      //         <Column size="4" size_sm="12" padding="20px 0" align="center"><H4
      //           uppercase
      //           fs_xs="16px"
      //           fs_sm="18px"
      //           fs_md="16px"
      //           fs_lg="18px"
      //           fontSize="20px"
      //         >{yml.outcomes.right.chart_one.title}</H4>
      //           <Charts dataArray={yml.outcomes.right.chart_one.data} />
      //         </Column>
      //         <Column size="4" size_sm="12" padding="20px 0" align="center"><H4
      //           uppercase
      //           fs_xs="16px"
      //           fs_sm="18px"
      //           fs_md="16px"
      //           fs_lg="18px"
      //           fontSize="20px"
      //         >{yml.outcomes.right.chart_two.title}</H4>
      //           <Charts dataArray={yml.outcomes.right.chart_two.data} />
      //         </Column>
      //         <Column size="4" size_sm="12" padding="20px 0" align="center"><H4
      //           uppercase
      //           fs_xs="16px"
      //           fs_sm="18px"
      //           fs_md="16px"
      //           fs_lg="18px"
      //           fontSize="20px"
      //         >{yml.outcomes.right.chart_three.title}</H4>
      //           <Charts dataArray={yml.outcomes.right.chart_three.data} />
      //         </Column>
      //       </Row>
      //     </Column>
      //   </Row>
      //   <Row display="flex" justifyContent='center'>
      //     <Column size="8" align="center">
      //       <Paragraph
      //         color={Colors.blue}
      //         fs_xs="14px"
      //         fs_sm="14px"
      //         fs_md="16px"
      //         fs_lg="16px"
      //         fs_xl="14px"
      //       >{yml.outcomes.left.bottom_message}
      //       </Paragraph>
      //     </Column>
      //   </Row>
      // </Wrapper> * /}

      // <WrapperImage
      //   imageData={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
      //   className={`img-header`}
      //   bgSize={`cover`}
      //   alt={yml.header_data.alt}
      //   customBorderRadius="0 0 0 1.25rem"
      //   paddingRight={`0`}
      // >
      //   <Divider height="150px" md="100px" />
      //   <Title
      //     size="5"
      //     color={Colors.white}
      //     title={yml.header_data.tagline}
      //     paragraph={yml.header_data.sub_heading}
      //     variant="main"
      //     paragraphColor={Colors.white}
      //     fontSize="46px"
      //     fs_xs="35px"
      //     textAlign="center"

      //   />
      //   <Divider height="150px" md="0" />
      // </WrapperImage>