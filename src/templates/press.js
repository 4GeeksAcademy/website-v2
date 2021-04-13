import React, {useState} from 'react';
import {Title, H1, H2, H3, H4, H5, Paragraph} from '../new_components/Heading';
import BaseRender from './_baseLayout';
// new_components
import Img from 'gatsby-image';
import News from '../new_components/News';
import Icon from '../new_components/Icon';
import {Colors, StyledBackgroundSection, Anchor} from '../new_components/Styling'
import {GridContainer, Div, Header} from "../new_components/Sections";



const Press = (props) => {
    const {data, pageContext, yml} = props;
    console.log("YAML", yml)
    console.log("DATA", data)
    let content = data.allPageYaml.edges[0].node.content
    console.log(yml.news)
    return (
        <Div margin="90px 0 75px 0" flexDirection="column">
            <Div id="circles-left" display="none" display_tablet="inherit">
                {/* first column smCircles */}
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "90px", top: "121px"}} />
                <Icon icon="landingCircles/smCircle-black" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "125px", top: "121px"}} />
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "168px", top: "121px"}} />
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "205px", top: "121px"}} />
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "304px", top: "121px"}} />

                {/* second column smCircles */}
                <Icon icon="landingCircles/mdCircle-blue" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "249px", top: "153px"}} />
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "168px", top: "153px"}} />
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "125px", top: "153px"}} />
                <Icon icon="landingCircles/smCircle-black" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "70px", top: "153px"}} />
                <Icon icon="landingCircles/smCircle-yellowLight" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "35px", top: "153px"}} />
                <Icon icon="landingCircles/smCircle-red" width="27" height="27" style={{zIndex: 2, position: "absolute", left: "214px", top: "224px"}} />
                <Icon icon="landingCircles/right-mdCircle-mustard" width="79px" height="116px" style={{zIndex: 2, position: "absolute", left: "0px", top: "269px"}} />
            </Div>
            <Div id="circles-right" display="none" display_tablet="inherit">
                <Icon icon="landingCircles/smCircle-mustard" style={{zIndex: 2, position: "absolute", right: "287px", top: "115px"}} />
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", right: "270px", top: "238px"}} />
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", right: "192px", top: "238px"}} />
                <Icon icon="landingCircles/mdCircle-blue" width="53px" height="53px" style={{zIndex: 3, position: "absolute", right: "71px", top: "134px"}} />
                <Icon icon="landingCircles/smCircle-black" width="17px" height="17px" style={{zIndex: 3, position: "absolute", right: "90px", top: "238px"}} />
                <Icon icon="landingCircles/md-rightCircle-yellowLight" width="233px" height="238px" style={{zIndex: 2, position: "absolute", right: "0", top: "128px"}} />
            </Div>
            <Header
                padding="0 10px"
                padding_tablet="0 18%"
                seo_title={yml.seo_title}
                title={yml.header.title}
                paragraph={yml.header.paragraph}
            />
            <News lang={pageContext.lang} limit={content.limit} height="50px" width="120px" justifyContent="flex-start" padding="50px 10px" padding_tablet="20px 22%  70px 22%" />
            {/* <Div  flexDirection="column"> */}
            {Array.isArray(content.news) && content.news.slice(0, content.limit).map((l, i) => {
                return (
                    <>
                        {<GridContainer columns_tablet="12" background={i % 2 == 0 && Colors.lightYellow2} padding_tablet="83px 0">
                            <Div flexDirection="column" justifyContent_tablet="start" padding_tablet="70px 0 0 0" gridArea_tablet={i % 2 != 0 ? "1/1/1/6" : "1/7/1/13"}>
                                <Img
                                    key={i}
                                    style={{height: "50px", width: "100%", minWidth: "60px", margin: "22px 0"}}
                                    imgStyle={{objectPosition: "left", width: "120px", objectFit: "contain"}}
                                    alt={l.name}
                                    fluid={l.logo != null && l.logo.childImageSharp.fluid}
                                />
                                <H3 type="h3" textAlign="left" fontSize="22px" lineHeight="26.4px">{l.title}</H3>
                                <Paragraph textAlign="left" margin="15px 0" fontSize="15px" lineHeight="22px" letterSpacing="0.05em" fontWeight="300">{l.text}</Paragraph>
                                <Paragraph style={{alignItems: "center"}} padding="15px 0px" display="flex" fontWeight="700" letterSpacing="0.05em" lineHeight="16px" textAlign="left" fontSize="13px" color={Colors.blue}>
                                    <Anchor cursor="pointer"
                                        to={l.url}>
                                        {l.textUrl}
                                        <Icon style={{margin: '0 0 0 10px', placeSelf: 'center'}} icon="arrow-right" width="10" height="12px" color={Colors.blue} />
                                    </Anchor>
                                </Paragraph>
                            </Div>
                            <Div height="auto" width="100%" gridArea_tablet={i % 2 != 0 ? "1/7/1/13" : "1/1/1/6"}>
                                <StyledBackgroundSection
                                    height={`389px`}
                                    image={l.image != null && l.image.childImageSharp.fluid}
                                    bgSize={`cover`}
                                    alt={l.name}
                                />
                            </Div>
                        </GridContainer>
                        }
                    </>
                )
            })}
        </Div>
        // </Div>
    )
};
export const query = graphql`
query PressQuery($file_name: String!, $lang: String!) {
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
                }
                content{
                    limit
                    heading
                    news{
                        name
                        logo {
                            childImageSharp{
                                fluid(maxHeight:60){
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                        location
                        image {
                            childImageSharp{
                                fluid(maxHeight:277){
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                        title
                        text
                        textUrl
                        url
                    }
                }
            }
        }
    }
    allNewsYaml(filter: { fields: { lang: { eq: $lang }}}) {
    edges {
      node {
        news {
          name
          url
          image{
            childImageSharp {
                fluid(maxHeight: 60,){
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          location
        }
        fields {
            lang
        }
      }
    }
  }    
}
`;
export default BaseRender(Press);
