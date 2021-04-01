import React from 'react';
import {GridContainerWithImage, Column, GridContainer, Div, Grid, Header} from '../new_components/Sections';
import {Title, H1, H2, H3, H4, Paragraph, Separator} from '../new_components/Heading'
import {Colors, StyledBackgroundSection} from '../new_components/Styling'
import Badges from '../new_components/Badges'
import With4Geeks from '../new_components/With4Geeks'
import Credentials from '../new_components/Credentials'
import GeeksVsOthers from '../new_components/GeeksVsOthers'
import BaseRender from './_baseLayout'
import Staff from '../new_components/Staff';
import BlogPosts from '../components/BlogPosts'
import {Link} from 'gatsby'
import Icon from '../new_components/Icon'
import Img from "gatsby-image"

const SVGImage = () =>
    <svg width="550" height="335" viewBox="0 0 550 335" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="222" cy="37" r="37" fill="#FFB718" fill-opacity="0.2" />
        <circle cx="330" cy="5" r="5" fill="#CD0000" />
        <circle cx="43.5" cy="291.5" r="43.5" fill="#0097CD" />
        <circle cx="473.5" cy="67.5" r="8.5" transform="rotate(90 473.5 67.5)" fill="black" />
        <rect x="110" y="326" width="77" height="6" rx="3" fill="black" />
        <rect x="201" y="326" width="119" height="6" rx="3" fill="black" />
        <circle cx="437.5" cy="219.5" r="112.5" fill="#FFB718" fill-opacity="0.2" />
    </svg>



const Why4Geeks = (props) => {
    const {data, pageContext, yml} = props;
    const cornerstones = yml.cornerstones;
    const hiring = data.allPartnerYaml.edges[0].node;
    const partnersData = data.allPartnerYaml.edges[0].node;
    return (
        <>
            <GridContainerWithImage background={Colors.lightBlue} padding_tablet="36px 0 54px 0" columns_tablet="14" margin="120px 0 71px 0" margin_tablet="0">
                <Div flexDirection="column" justifyContent_tablet="start" padding_tablet="70px 0 0 0" gridColumn_tablet="1 / 8">
                    <H1 textAlign_tablet="left" margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1>
                    <H2 textAlign_tablet="left" fontSize="50px" lineHeight="60px">{`${yml.header.title}`}</H2>
                    <Paragraph textAlign_tablet="left" margin="26px 0">{yml.header.paragraph} </Paragraph>
                </Div>
                <Div height="auto" width="100%" gridColumn_tablet="9 / 15">
                    <StyledBackgroundSection
                        height="287px"
                        width="100%"
                        image={yml.header.image && yml.header.image.childImageSharp.fluid}
                        bgSize={`contain`}
                        alt={yml.header.alt}
                    />
                </Div>
            </GridContainerWithImage>
            <Badges lang={pageContext.lang} paragraph={yml.badges.paragraph} link padding="58px 17px" padding_tablet="70px 0" />
            <GridContainer display="none" display_tablet="grid" fluid height_tablet="914px" margin_tablet="0 0 101px 0" background={Colors.verylightGray}>test</GridContainer>
            <With4Geeks lang={pageContext.lang} playerHeight="82px" />
            <Credentials lang={data.allCredentialsYaml.edges} shadow={false} />
            <GeeksVsOthers lang={pageContext.lang} title={yml.geeksvsothers.title} paragraph={yml.geeksvsothers.paragraph} />
            <GridContainerWithImage height_tablet="503px" background={Colors.lightBlue} padding="36px 17px" padding_tablet="36px 0 54px 0" columns_tablet="14" margin="0 0 36px 0" margin_tablet="0 0 75px 0" >
                <Div flexDirection="column" justifyContent_tablet="start" padding_tablet="70px 0 0 0" gridColumn_tablet="1 / 8">
                    <H2 textAlign_tablet="left" fontSize="50px" lineHeight="60px">{`${yml.python_banner.title}`}</H2>
                    {/* <Paragraph textAlign_tablet="left" margin="26px 0">{yml.python_banner.paragraph} </Paragraph> */}
                    {yml.python_banner.paragraph.split('\n').map((p, i) =>
                        <Paragraph textAlign_tablet="left" margin="26px 0" key={i}>{p}</Paragraph>
                    )}
                </Div>
                <Div height="auto" width="100%" gridColumn_tablet="9 / 15">
                    <SVGImage />
                </Div>
            </GridContainerWithImage>
            <Staff lang={pageContext.lang} />
            {/* <Grid gridTemplateColumns_tablet="14">
        <Div grid_column_tablet="1 / span 14">
          <StyledBackgroundSection
            height={`389px`}
            image={yml.header.image.childImageSharp.fluid}
            bgSize={`cover`}
            alt={yml.header.alt}
          />
        </Div>
      </Grid>


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
      <GridContainer margin="0 0 30px 0" padding="0">
        <Div flexDirection="column" >
          <H2 >{cornerstones.title}</H2>
        </Div>
      </GridContainer>
      <GridContainer padding="0" height="auto" columns_tablet="2" margin_tablet="0 0 51px 0" margin="0 0 20px 0">

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
        slider
      />
      <Staff lang={pageContext.lang} /> */}
        </>
    )
};

export const query = graphql`
  query Why4GeeksQuery($file_name: String!, $lang: String!) {
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
                      fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
            }
            badges{
              paragraph
            }
            geeksvsothers{
                title
                paragraph
            }
            python_banner{
                title
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

export default BaseRender(Why4Geeks);


