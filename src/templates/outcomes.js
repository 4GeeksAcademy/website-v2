import React, {useState} from 'react';
import {graphql} from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../global/Layout';
import {Grid, Div} from '../new_components/Sections'
import {H1, H2, H3, H4, Title, Separator, Paragraph} from '../new_components/Heading'
import {Colors, Button, StyledBackgroundSection} from '../new_components/Styling'
import Icon from '../new_components/Icon'
import BaseRender from './_baseLayout'


const Outcomes = ({data, pageContext, yml}) => {
    console.log("outcomes", yml)
    return (
        <>
            {/* <Container variant="fluid" margin="28px 0" padding_md="0 0 0 171px" > */}
            <Grid height="754px" height_md="412px" columns="1" rows="1" columns_md="12" gridGap_md="11px" gridGap="0" background={Colors.lightYellow}>
                <Div flexDirection="column" justifyContent_md="start" padding="41px 0 0 0" padding_md="56px 0 0 0" gridArea_md="1/2/1/7">
                    {/* <CityH1 yml={yml} /> */}
                    <H1 margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1>
                    <H2 fontSize="50px" lineHeight="60px">{`${yml.header.title}`}</H2>
                    <Paragraph margin="26px 0" >{yml.header.paragraph}</Paragraph>
                    {/* <Paragraph textAlign_tablet="left" >{yml.info_box.phone} </Paragraph>
                    <Paragraph textAlign_tablet="left" >{yml.info_box.email} </Paragraph> */}
                </Div>
                <Div width="100%" gridArea_md="1/7/1/13" >
                    <StyledBackgroundSection
                        height={`412px`}
                        width="100%"
                        image={yml.header.image && yml.header.image.childImageSharp.fluid}
                        bgSize={`contain`}
                    // alt={yml.header.alt}
                    />
                    {/* <Icon icon="outcomes" /> */}
                </Div>
            </Grid>
            <Grid columns_md="12" >
                <Div gridArea="1/2/1/9" flexDirection="column" padding="0 65px 0 0 " >
                    {yml.sections.map((section, i) => {
                        return (
                            <>
                                <H3 margin="54px 0 0 0 " textAlign="left" >{section.title}</H3>
                                {section.paragraph.split("\n").map((m, i) =>
                                    <Paragraph key={i} textAlign="left" margin="15px 0" dangerouslySetInnerHTML={{__html: m}}></Paragraph>
                                )}
                                <Div justifyContent="between">
                                    {section.stats.map((m, i) => {
                                        return (
                                            <Div key={i} flexDirection="column" >
                                                <H2 textAlign="left" color={Colors.blue}>{m.stat}</H2>
                                                <H3 textAlign="left" >{m.content}</H3>
                                            </Div>
                                        )
                                    })}
                                </Div>
                            </>)
                    })}
                </Div>
                <Div gridArea="1/9/1/13" display="none" display_md="flex" style={{position: "relative"}}>
                    <Div style={{boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"}} borderRadius="3px" border={`1px solid #e5e5e5`} width="266px" height="219px">right</Div>
                </Div>
            </Grid>
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
                image{
                    childImageSharp {
                      fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                
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
                }
            }
            
           
            
        }
      }
    }
}
`;
export default BaseRender(Outcomes);