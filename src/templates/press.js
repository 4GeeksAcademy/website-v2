import React, {useState} from 'react';
import {Title, H1, H2, H3, H4, H5, Paragraph} from '../new_components/Heading';
import BaseRender from './_baseLayout';
// new_components
import Img from 'gatsby-image';
import News from '../new_components/News';
import Icon from '../new_components/Icon';
import {Colors} from '../new_components/Styling'
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
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "90px", top: "121px"}}/>
                <Icon icon="landingCircles/smCircle-black" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "125px", top: "121px"}}/>
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "168px", top: "121px"}}/>                
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "205px", top: "121px"}}/>
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "304px", top: "121px"}}/>

                {/* second column smCircles */}
                <Icon icon="landingCircles/mdCircle-blue" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "249px", top: "153px"}}/>
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "168px", top: "153px"}}/>
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "125px", top: "153px"}}/>
                <Icon icon="landingCircles/smCircle-black" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "70px", top: "153px"}}/>
                <Icon icon="landingCircles/smCircle-yellowLight" width="17px" height="17px" style={{zIndex: 3, position: "absolute", left: "35px", top: "153px"}}/>
                <Icon icon="landingCircles/smCircle-red" width="27" height="27" style={{zIndex: 2, position: "absolute", left: "214px", top: "224px"}}/>
                <Icon icon="landingCircles/right-mdCircle-mustard" width="79px" height="116px" style={{zIndex: 2, position: "absolute", left: "0px", top: "269px"}}/>
            </Div>
            <Div id="circles-right" display="none" display_tablet="inherit">
                <Icon icon="landingCircles/smCircle-mustard" style={{zIndex: 2, position: "absolute", right: "287px", top: "115px"}}/>
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", right: "270px", top: "238px"}}/>
                <Icon icon="landingCircles/smCircle-gray" width="17px" height="17px" style={{zIndex: 3, position: "absolute", right: "192px", top: "238px"}}/>
                <Icon icon="landingCircles/mdCircle-blue" width="53px" height="53px" style={{zIndex: 3, position: "absolute", right: "71px", top: "134px"}}/>
                <Icon icon="landingCircles/smCircle-black" width="17px" height="17px" style={{zIndex: 3, position: "absolute", right: "90px", top: "238px"}}/>
                <Icon icon="landingCircles/md-rightCircle-yellowLight" width="233px" height="238px" style={{zIndex: 2, position:"absolute", right: "0", top: "128px"}}/>
            </Div>
            <Header
                padding="0 10px"
                padding_tablet="0 18%"
                seo_title={yml.seo_title}
                title={yml.header.title}
                paragraph={yml.header.paragraph}
            />
            <News lang={pageContext.lang} limit={content.limit} height="50px" width="120px" justifyContent="flex-start" padding="50px 10px" padding_tablet="20px 22%  70px 22%"/>
            <Div  flexDirection="column">
                {Array.isArray(content.news) && content.news.slice(0, content.limit).map((l, i) => {
                    return (
                        <>
                        {
                            // It identifies and separates the left[0, 2] and right[1, 3] section 
                            (i % 2 == 0) ? (
                            <GridContainer background={Colors.lightYellow} manageTabletColumns={true} numberColumns="13" columns_tablet="2" gridGap="30px
                            " padding="38px 30px" padding_tablet="50px 0">
                                <Div style={{position: "relative"}} height="100%" alignItems="center">
                                    <Img
                                        key={i}
                                        style={{height: "276px", width: "100%", minWidth: "120px"}}
                                        imgStyle={{ marginLeft: "auto", marginRight: "auto", right: "0", left: "0", objectPosition: "left", width: "416px", objectFit: "contain"}}
                                        alt={l.name}
                                        fluid={l.image != null && l.image.childImageSharp.fluid}
                                    />
                                </Div>
                                <Div justifyContent="center" flexDirection="column" padding="0" >
                                    <Div flexDirection="column" margin= "0" margin_tablet="0 0 30px 0">
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
                                            <a href={l.url}>{l.textUrl}</a>
                                            <Icon style={{margin: '0 0 0 10px'}} icon="arrow-right" width="5" height="10px" color={Colors.blue}/>
                                        </Paragraph>
                                    </Div>
                                </Div>
                            </GridContainer>
                            ) : (
                            <GridContainer direction="rtl" manageTabletColumns={true} numberColumns="13" columns_tablet="2" gridGap_md="50px" gridGap="30px" padding="38px 30px" padding_tablet="50px 0">
                                <Div style={{position: "relative"}} height="100%" alignItems="center">
                                    <Img
                                        key={i}
                                        style={{height: "276px", width: "100%", minWidth: "120px"}}
                                        imgStyle={{marginLeft: "auto", marginRight: "auto", right: "0", left: "0", objectPosition: "left", width: "416px", objectFit: "contain"}}
                                        alt={l.name}
                                        fluid={l.image != null && l.image.childImageSharp.fluid}
                                    />
                                </Div>
                                <Div justifyContent="center" flexDirection="column" padding="0" >
                                    <Div flexDirection="column" margin= "0" margin_tablet="0 0 30px 0">
                                        <Img
                                            key={i}
                                            style={{height: "50px", width: "100%", minWidth: "60px", margin: "22px 0"}}
                                            imgStyle={{objectPosition: "left", width: "120px", objectFit: "contain"}}
                                            alt={l.name}
                                            fluid={l.logo != null && l.logo.childImageSharp.fluid}
                                        />
                                        <H3 type="h3" textAlign="left" fontSize="22px" lineHeight="26.4px">{l.title}</H3>
                                        <Paragraph textAlign="left" margin="15px 0" fontSize="15px" lineHeight="22px" letterSpacing="0.05em" fontWeight="300">{l.text}</Paragraph>
                                        <Paragraph style={{alignItems: "center"}} direction="ltr" padding="15px 0px" display="flex" fontWeight="700" letterSpacing="0.05em" lineHeight="16px" textAlign="left" fontSize="13px" color={Colors.blue}>
                                            <a href={l.url}>{l.textUrl}</a>
                                            {/* <Icon style={{margin: '0 0 0 10px'}} icon="arrow-right" width="5" height="10px" color={Colors.blue}/> */}
                                        </Paragraph>
                                    </Div>
                                </Div>
                            </GridContainer>
                            )
                        }
                        </>
                    )
                })}
            </Div>
        </Div>
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
