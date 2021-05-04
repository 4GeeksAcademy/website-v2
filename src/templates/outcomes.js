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
import Img from "gatsby-image"

const SVGImage = () =>
    <svg width="100%" height="412px" viewBox="0 0 360 229" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49 219L120.64 121.903L152.066 156.291L264.932 42L319 105.046" stroke="#0097CD" stroke-width="2" stroke-linecap="round" />
        <path d="M21 58V228H344" stroke="#A4A4A4" stroke-linecap="round" />
        <ellipse cx="38.5" cy="160" rx="39.5" ry="39" fill="#FFB718" />
        <circle cx="153.5" cy="115.5" r="9.5" fill="#FFB718" />
        <ellipse cx="120" cy="66.5" rx="18" ry="18.5" fill="#0097CD" />
        <ellipse cx="213.5" cy="35" rx="6.5" ry="6" fill="#FFB718" fill-opacity="0.2" />
        <circle cx="235" cy="72" r="6" fill="#FFB718" fill-opacity="0.2" />
        <ellipse cx="287.5" cy="48.5" rx="5.5" ry="5.5" transform="rotate(90 287.5 48.5)" fill="#FFB718" fill-opacity="0.2" />
        <ellipse cx="213.5" cy="58.5" rx="6.5" ry="5.5" fill="black" />
        <ellipse cx="235" cy="95.5" rx="6" ry="6.5" fill="black" />
        <ellipse cx="337.5" cy="216" rx="6" ry="6.5" transform="rotate(90 337.5 216)" fill="black" />
        <circle cx="213.5" cy="95.5" r="6.5" fill="#FFB718" fill-opacity="0.2" />
        <ellipse cx="235" cy="124.5" rx="6" ry="5.5" fill="#FFB718" fill-opacity="0.2" />
        <ellipse cx="235" cy="48.5" rx="5.5" ry="6" transform="rotate(90 235 48.5)" fill="#FFB718" fill-opacity="0.2" />
        <ellipse cx="213.5" cy="124.5" rx="6.5" ry="5.5" fill="#FFB718" fill-opacity="0.2" />
        <circle cx="235" cy="150" r="6" fill="#FFB718" fill-opacity="0.2" />
        <ellipse cx="213.5" cy="193.5" rx="6.5" ry="5.5" fill="#0097CD" />
        <circle cx="235" cy="216" r="6" fill="#FFB718" fill-opacity="0.2" />
        <rect x="268" y="81" width="52" height="7" rx="3.5" transform="rotate(90 268 81)" fill="black" />
        <rect x="186" y="170" width="52" height="6" rx="3" transform="rotate(90 186 170)" fill="black" />
        <rect x="122" y="170" width="52" height="7" rx="3.5" transform="rotate(90 122 170)" fill="black" />
        <rect x="268" y="142" width="80" height="7" rx="3.5" transform="rotate(90 268 142)" fill="black" />
        <rect x="292" y="142" width="80" height="7" rx="3.5" transform="rotate(90 292 142)" fill="black" />
        <rect x="317" y="178" width="44" height="8" rx="4" transform="rotate(90 317 178)" fill="black" />
        <circle cx="398.5" cy="96.5" r="96.5" fill="#FFB718" fill-opacity="0.2" />
        <ellipse cx="264" cy="41.5" rx="9" ry="9.5" fill="#CD0000" />
    </svg>

const Outcomes = ({data, pageContext, yml}) => {
    return (
        <>
            {/* <Container variant="fluid" margin="28px 0" padding_md="0 0 0 171px" > */}
            <Header
                seo_title={yml.seo_title}
                title={yml.header.title}
                paragraph={yml.header.paragraph}
                svg_image={<SVGImage />}
                background={Colors.lightYellow}
            />
{/*TODO: remover overflow hiddedn en html !important */}


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
                <Div gridArea="1/9/1/13" display="none" display_md="flex" style={{position: "relative"}}>
                    <Div style={{boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"}} borderRadius="3px" border={`1px solid #e5e5e5`} width="266px" height="219px">right</Div>
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