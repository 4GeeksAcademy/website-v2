import React, {useState} from 'react';
import {graphql} from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../global/Layout';
import {Grid, Div} from '../new_components/Sections'
import {H1, H2, H3, H4, Title, Separator, Paragraph} from '../new_components/Heading'
import {Colors, Button, StyledBackgroundSection} from '../new_components/Styling'
import Icon from '../new_components/Icon'
import Badges from '../new_components/Badges'
import {Charts} from '../new_components/Chart'
import BaseRender from './_baseLayout'
import Img from "gatsby-image"


const Awards = ({data, pageContext, yml}) => {
    return (
        <>
            <Grid height="754px" height_md="412px" padding="17px" padding_md="0" columns="1" rows="1" columns_md="12" gridGap_md="11px" gridGap="0" background="rgba(199, 243, 253, 0.5)">
                <Div flexDirection="column" justifyContent_md="start" padding="41px 0 0 0" padding_md="56px 0 0 0" gridArea_md="1/3/1/7">
                    {/* <CityH1 yml={yml} /> */}
                    <H1 textAlign="left" margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1>
                    <H2 textAlign="left" fontSize="50px" lineHeight="60px">{`${yml.header.title}`}</H2>
                    <Paragraph textAlign="left" margin="26px 0" >{yml.header.paragraph}</Paragraph>
                </Div>
                <Div width="100%" gridArea_md="1/7/1/13" >
                    <StyledBackgroundSection
                        height={`412px`}
                        width="100%"
                        image={yml.header.image && yml.header.image.childImageSharp.fluid}
                        bgSize={`contain`}
                    // alt={yml.header.alt}
                    />
                </Div>
            </Grid>
            <Grid background={Colors.lightYellow} margin="0 0 58px 0" margin_md="0 0 78px 0">
                <Badges lang={pageContext.lang} />
            </Grid>
            <Grid padding="17px" columns="1" rows="1" columns_md="12" gridGap_md="11px" gridGap="0">
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
            </Grid>
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