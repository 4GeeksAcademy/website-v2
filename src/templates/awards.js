import React, {useState} from 'react';
import {graphql} from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../global/Layout';
import {Grid, Div, GridContainerWithImage, GridContainer} from '../new_components/Sections'
import {H1, H2, H3, H4, Title, Separator, Paragraph} from '../new_components/Heading'
import {Colors, Button, StyledBackgroundSection} from '../new_components/Styling'
import Icon from '../new_components/Icon'
import Badges from '../new_components/Badges'
import {Charts} from '../new_components/Chart'
import BaseRender from './_baseLayout'
import Img from "gatsby-image"

const SVGImage = () =>
    <svg width="419" height="284" viewBox="0 0 419 284" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="419" y="284" width="419" height="11" rx="5.49998" transform="rotate(-180 419 284)" fill="#A4A4A4" />
        <rect x="133" y="257" width="133" height="11" rx="5.49999" transform="rotate(-180 133 257)" fill="#A4A4A4" />
        <rect x="276" y="257" width="133" height="11" rx="5.49999" transform="rotate(-180 276 257)" fill="#A4A4A4" />
        <rect x="133" y="229" width="133" height="11" rx="5.49999" transform="rotate(-180 133 229)" fill="#A4A4A4" />
        <rect x="276" y="229" width="133" height="11" rx="5.49999" transform="rotate(-180 276 229)" fill="#A4A4A4" />
        <rect x="276" y="199" width="133" height="11" rx="5.49999" transform="rotate(-180 276 199)" fill="#A4A4A4" />
        <rect x="419" y="257" width="133" height="11" rx="5.49999" transform="rotate(-180 419 257)" fill="#A4A4A4" />
        <circle cx="209.5" cy="81.5" r="58.5" fill="#FFB718" />
        <circle cx="238.5" cy="23.5" r="23.5" fill="#0097CD" />
        <circle cx="336.5" cy="81.5" r="8.5" fill="#C7F3FD" />
        <circle cx="368.5" cy="136.5" r="8.5" fill="#C7F3FD" />
        <circle cx="336.5" cy="116.5" r="8.5" fill="black" />
        <circle cx="368.5" cy="171.5" r="8.5" fill="black" />
        <circle cx="336.5" cy="171.5" r="8.5" fill="#C7F3FD" />
        <circle cx="368.5" cy="214.5" r="8.5" fill="#C7F3FD" />
        <circle cx="368.5" cy="100.5" r="8.5" transform="rotate(90 368.5 100.5)" fill="#C7F3FD" />
        <circle cx="336.5" cy="214.5" r="8.5" fill="#C7F3FD" />
        <circle cx="14" cy="122" r="14" fill="#FFB718" />
        <circle cx="95.5" cy="81.5" r="8.5" transform="rotate(90 95.5 81.5)" fill="#C7F3FD" />
        <rect x="74" y="119" width="77" height="11" rx="5.5" transform="rotate(90 74 119)" fill="black" />
        <circle cx="53.5" cy="67.5" r="13.5" fill="#CD0000" />
        <path d="M206.902 129.5C208.057 127.5 210.943 127.5 212.098 129.5L232.45 164.75C233.604 166.75 232.161 169.25 229.852 169.25H189.148C186.839 169.25 185.396 166.75 186.55 164.75L206.902 129.5Z" fill="#CD0000" />
        <path d="M184.5 147.5L156.5 153.5V132.5L134 121.5L142 104.5L124 85.5L138.5 68.5L124 54.5L148.5 41" stroke="#FFB718" stroke-width="4" stroke-linecap="round" />
        <path d="M236 148.027L263.769 154V133.093L286.083 122.142L278.149 105.218L296 86.3022L281.62 69.3778L296 55.44L271.702 42" stroke="#FFB718" stroke-width="4" stroke-linecap="round" />
    </svg>

const Awards = ({data, pageContext, yml}) => {
    return (
        <>            
            <GridContainer columns_tablet="12" padding_tablet="48px 0" background="rgba(199, 243, 253, 0.5)">
                <Div gridColumn_tablet="1 / 7" flexDirection="column" justifyContent_tablet="start" padding_tablet="70px 0 0 0">
                    {/* <H1 textAlign_tablet="left" margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1> */}
                    <H2 textAlign_tablet="left" fontSize="50px" lineHeight="60px">{`${yml.header.title}`}</H2>
                    <Paragraph textAlign_tablet="left" margin="26px 0">{yml.header.paragraph} </Paragraph>
                    {/* <Paragraph textAlign_tablet="left" >{yml.info_box.phone} </Paragraph>
                    <Paragraph textAlign_tablet="left" >{yml.info_box.email} </Paragraph> */}

                </Div>
                <Div gridColumn_tablet="8 / 13" display="none" justifyContent="center" display_tablet="flex" height="auto" width="100%">
                    <SVGImage />
                    {/* <StyledBackgroundSection
                        height={`623px`}
                        width="100%"
                        image={yml.header.image && yml.header.image.childImageSharp.fluid}
                        bgSize={`contain`}
                    /> */}
                </Div>
            </GridContainer>
            {/* <Grid background={Colors.lightYellow} margin="0 0 58px 0" margin_md="0 0 78px 0"> */}            
            <Badges lang={pageContext.lang} background={Colors.lightYellow} padding="60px 0" padding_tablet="68px 0" margin="0 0 58px 0" margin_tablet="0 0 78px 0" />
            {/* </Grid> */}            
            <GridContainer padding="17px" columns="1" rows="1" columns_md="12" gridGap_md="11px" gridGap="0">
                <Div gridArea_md="1/3/1/11" flexDirection="column"  >
                    {Array.isArray(yml.awards_list) && yml.awards_list.map((m, i) => {
                        return (
                            <Div key={i} flexDirection="column" flexDirection_md="row" margin="0 0 75px 0" >
                                <Img
                                    style={{height: "85px", minWidth: "150px", margin: "0 24px"}}
                                    imgStyle={{objectFit: "contain"}}
                                    loading="eager"
                                    fadeIn={false}
                                    // alt={l.name}
                                    fluid={m.image.childImageSharp.fluid}
                                />
                                <Div flexDirection="column">
                                    <H3 textAlign_md="left" margin="49px 0 0 " margin_md="0">{m.title}</H3>
                                    <Div background="#c4c4c4" height=".5px" margin="35px 0 25px 0" />
                                    {m.paragraph.split('\n').map((p, i) =>
                                        <Paragraph textAlign_md="left" margin="10px 0" key={i}>{p}</Paragraph>
                                    )}
                                </Div>
                            </Div>
                        )
                    })}
                </Div>
            </GridContainer>
            {/* <Grid columns_md="12" padding="0 17px" padding_md="0 65px 0 0 " gridGap="0" gridGap_md="11px">
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
                                                                <Img
                                                                    style={{height: "100%"}}
                                                                    imgStyle={{objectFit: "contain"}}
                                                                    loading="eager"
                                                                    style={{margin: "38px 0"}}
                                                                    fadeIn={false}
                                                                    // alt={l.name}
                                                                    fluid={m.image && m.image.childImageSharp.fluid}
                                                                />
                                                                <Paragraph textAlign="left">{m.image_paragraph}</Paragraph>
                                                                <Grid columns_md="3">
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
            </Grid> */}
            {/* <Paragraph dangerouslySetInnerHTML={{__html: yml.date_release}} margin="20px 0"></Paragraph> */}
            {/* </Container> */}
        </>
    )
};
export const query = graphql`
query AwardsQuery($file_name: String!, $lang: String!) {
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
            awards_list{
                image{
                    childImageSharp {
                      fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                title
                paragraph
            }
            
            
           
            
        }
      }
    }
}
`;
export default BaseRender(Awards);