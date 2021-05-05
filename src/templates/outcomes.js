import React, {useState} from 'react';
import {graphql} from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../global/Layout';
import {Grid, Div, Header, GridContainer} from '../new_components/Sections'
import {H1, H2, H3, H4, Title, Separator, Paragraph} from '../new_components/Heading'
import {Colors, Button, StyledBackgroundSection} from '../new_components/Styling'
import Icon from '../new_components/Icon'
import {Charts} from '../new_components/Chart'
import BaseRender from './_baseLayout'
import ChooseProgram from '../new_components/ChooseProgram'
import Img from "gatsby-image"

const SVGImage = () =>
<svg width="510" height="295" viewBox="0 0 510 295" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M73.5 280L179.5 136L226 187L393 17.5L473 111" stroke="#0097CD" stroke-width="2" stroke-linecap="round"/>
<path d="M33 44V294H509" stroke="#A4A4A4" stroke-linecap="round"/>
<circle cx="58" cy="194" r="58" fill="#FFB718"/>
<circle cx="228" cy="128" r="14" fill="#FFB718"/>
<circle cx="177.5" cy="55.5" r="26.5" fill="#0097CD"/>
<circle cx="316.5" cy="8.5" r="8.5" fill="#FFB718" fill-opacity="0.2"/>
<circle cx="348.5" cy="63.5" r="8.5" fill="#FFB718" fill-opacity="0.2"/>
<circle cx="426.5" cy="27.5" r="8.5" transform="rotate(90 426.5 27.5)" fill="#FFB718" fill-opacity="0.2"/>
<circle cx="316.5" cy="43.5" r="8.5" fill="black"/>
<circle cx="348.5" cy="98.5" r="8.5" fill="black"/>
<circle cx="500.5" cy="276.5" r="8.5" transform="rotate(90 500.5 276.5)" fill="black"/>
<circle cx="316.5" cy="98.5" r="8.5" fill="#FFB718" fill-opacity="0.2"/>
<circle cx="348.5" cy="141.5" r="8.5" fill="#FFB718" fill-opacity="0.2"/>
<circle cx="348.5" cy="27.5" r="8.5" transform="rotate(90 348.5 27.5)" fill="#FFB718" fill-opacity="0.2"/>
<circle cx="316.5" cy="141.5" r="8.5" fill="#FFB718" fill-opacity="0.2"/>
<circle cx="348.5" cy="178.5" r="8.5" fill="#FFB718" fill-opacity="0.2"/>
<circle cx="316.5" cy="243.5" r="8.5" fill="#0097CD"/>
<circle cx="348.5" cy="277.5" r="8.5" fill="#FFB718" fill-opacity="0.2"/>
<rect x="398" y="76" width="77" height="11" rx="5.5" transform="rotate(90 398 76)" fill="black"/>
<rect x="278" y="209" width="77" height="11" rx="5.5" transform="rotate(90 278 209)" fill="black"/>
<rect x="183" y="209" width="77" height="11" rx="5.5" transform="rotate(90 183 209)" fill="black"/>
<rect x="398" y="167" width="119" height="11" rx="5.5" transform="rotate(90 398 167)" fill="black"/>
<rect x="433" y="167" width="119" height="11" rx="5.5" transform="rotate(90 433 167)" fill="black"/>
<rect x="470" y="220" width="66" height="11" rx="5.5" transform="rotate(90 470 220)" fill="black"/>
<circle cx="392.5" cy="17.5" r="13.5" fill="#CD0000"/>
</svg>

const Outcomes = ({data, pageContext, yml}) => {
    return (
        <>
            <Header
                hideArrowKey 
                paddingParagraph="0px 14% 0px 0"   
                textAlign="left"        
                seo_title={yml.seo_title}
                title={yml.header.title}
                paragraph={yml.header.paragraph}
                svg_image={<SVGImage />}
                background={Colors.lightYellow}
            >
            </Header>
            {/* <GridContainer columns_tablet="12" background={Colors.lightYellow2} padding_tablet="83px 0">
                <Div flexDirection="column" justifyContent_tablet="start" padding_tablet="70px 0 0 0" gridArea_tablet="1/7/1/13">
                    <H1 type="h1" textAlign="left" fontSize="22px" lineHeight="26.4px">{yml.seo_title}</H1>
                    <H2>{yml.header.title}</H2>
                    <Paragraph textAlign="left" margin="15px 0" fontSize="15px" lineHeight="22px" letterSpacing="0.05em" fontWeight="300">{yml.header.paragraph}</Paragraph>
                </Div>
                
                <Div height="auto" width="100%" gridArea_tablet="1/1/1/6">

                    <Icon icon="landingChart/chart"/>
                </Div>
            </GridContainer> */}
            
            {/* {i % 2 != 0 ? "1/1/1/6" : "1/7/1/13"} */}
            {/* {i % 2 != 0 ? "1/7/1/13" : "1/1/1/6"} */}



            <GridContainer columns="12" padding="0 17px" padding_tablet="0 65px 0 0 " >
                <Div gridArea="1/2/1/9" flexDirection="column"  >
                    {yml.sections.map((section, i) => {
                        return (
                            <>
                                <H3 margin="54px 0 0 0 " textAlign="left" >{section.title}</H3>
                                <Div style={{margin: "40px 0", height: "1px", background: "#c4c4c4"}} />
                                {section.paragraph.split("\n").map((m, i) =>
                                    <Paragraph key={i} textAlign="left" margin="10px 0" >{m}</Paragraph>
                                )}
                                <Grid justifyContent="between" columns_md={Array.isArray(section.stats) && section.stats.length} margin="41px 0 0 0">
                                    {section.stats.map((m, i) => {
                                        return (
                                            <Div key={i} flexDirection="column" margin="0 0 38px 0">
                                                <H2 textAlign_md="left" color={Colors.blue}>{m.stat}</H2>
                                                <H3 textAlign_md="left" >{m.content}</H3>
                                            </Div>
                                        )
                                    })}
                                </Grid>
                                {
                                    Array.isArray(section.sub_sections) && section.sub_sections.map((m, i) => {

                                        return (
                                            <React.Fragment key={i}>
                                                <H4 textAlign="left" textTransform="uppercase" fontWeight="700" margin="42px 0 13px 0">{m.title}</H4>
                                                <Paragraph textAlign="left" margin_md="10px 0" dangerouslySetInnerHTML={{__html: m.content}}></Paragraph>
                                                {
                                                    Array.isArray(m.image_section) && m.image_section.map((m, i) => {
                                                        return (
                                                            <React.Fragment key={i}>
                                                                {/* <Img
                                                                    style={{height: "100%"}}
                                                                    imgStyle={{objectFit: "contain"}}
                                                                    loading="eager"
                                                                    style={{margin: "38px 0"}}
                                                                    fadeIn={false}
                                                                    // alt={l.name}
                                                                    fluid={m.image != undefined && m.image.childImageSharp.fluid}
                                                                /> */}
                                                                <Paragraph textAlign="left">{m.image_paragraph}</Paragraph>
                                                                <Grid gridTemplateColumns_tablet="3">
                                                                    {m.chart &&
                                                                        yml.charts.chart_list.map((c, i) => {
                                                                            return (
                                                                                <Div flexDirection="column" key={i}>
                                                                                    <Charts dataArray={c.data} />
                                                                                    <H4 textTransform="uppercase" fontSize="15px" LineHeight="19px" fontWeight="900">{c.title}</H4>
                                                                                </Div>
                                                                            )
                                                                        })
                                                                    }
                                                                </Grid>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </>)
                    })}
                </Div>
                <Div gridArea="1/9/1/13" margin="54px 0 0 0" display="none" display_md="flex" style={{position: "relative"}}>
                    <Div flexDirection="column" style={{boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", position: "sticky", top: "85px"}} borderRadius="3px" border={`1px solid #e5e5e5`} width="266px" height="219px">
                    {
                        yml.sections.filter(i => i.title !== "").map((m, i) => {
                            return (
                                <Div
                                padding="25px 25px 0"
                                key={i}
                                // goTo={goToChooseProgram}
                                // margin="40px 0"
                                textAlign="center"
                                textAlign_tablet="left"
                                >
                                 {m.title}
                             </Div>
                         )
                        })
                    }
                    <ChooseProgram
                        width="80%"
                        padding="28px 0"
                        textAlign={`center`}
                        // left="15px"
                        // marginTop="-3px"
                        borderRadius="0 .75rem .75rem .75rem"
                        openLabel={`DOWNLOAD REPORT`}
                        closeLabel={`DOWNLOAD REPORT`}
                    />
                    </Div>
                </Div>
            </GridContainer>
            {/* <Paragraph dangerouslySetInnerHTML={{__html: yml.date_release}} margin="20px 0"></Paragraph> */}
            {/* </Container> */}
        </>
    )
};
export const query = graphql`
query OutcomesQuery($file_name: String!, $lang: String!) {
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
            sections{
                title
                paragraph
                stats{
                    stat
                    content
                }
                sub_sections{
                    title
                    content
                    image_section{

                        image_paragraph  
                        chart
                    }
                }
            }
            charts{
                    chart_list{
                        title
                        data
                    }
                    
                    
            }
           
            
        }
      }
    }
}
`;
export default BaseRender(Outcomes);



// image{
//     childImageSharp {
//       fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
//         ...GatsbyImageSharpFluid_withWebp
//       }
//     }
//   }