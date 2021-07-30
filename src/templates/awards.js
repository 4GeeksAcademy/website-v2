import React, {useState} from 'react';
import {graphql} from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../global/Layout';
import {Grid, Div, GridContainerWithImage, GridContainer} from '../new_components/Sections'
import {H1, H2, H3, Paragraph} from '../new_components/Heading'
import {Colors, Button, StyledBackgroundSection} from '../new_components/Styling'
import Badges from '../new_components/Badges'
import BaseRender from './_baseLayout'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const SVGBubblesLeft = () =>
    <svg style={{top: "85px", left: "0", position: "absolute"}} width="321" height="433" viewBox="0 0 321 433" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="176.5" cy="185.5" r="13.5" fill="#CD0000"/>
        <circle cx="16" cy="375" r="58" fill="#FFB718"/>
        <circle cx="43.5" cy="40.5" r="8.5" transform="rotate(-90 43.5 40.5)" fill="#FFB718" fill-opacity="0.2"/>
        <circle cx="98.5" cy="8.5" r="8.5" transform="rotate(-90 98.5 8.5)" fill="white"/>
        <circle cx="78.5" cy="40.5" r="8.5" transform="rotate(-90 78.5 40.5)" fill="black"/>
        <circle cx="133.5" cy="8.5" r="8.5" transform="rotate(-90 133.5 8.5)" fill="black"/>
        <circle cx="133.5" cy="40.5" r="8.5" transform="rotate(-90 133.5 40.5)" fill="white"/>
        <circle cx="176.5" cy="8.5" r="8.5" transform="rotate(-90 176.5 8.5)" fill="white"/>
        <circle cx="176.5" cy="40.5" r="8.5" transform="rotate(-90 176.5 40.5)" fill="white"/>
        <circle cx="213.5" cy="8.5" r="8.5" transform="rotate(-90 213.5 8.5)" fill="white"/>
        <circle cx="257.5" cy="40.5" r="8.5" transform="rotate(-90 257.5 40.5)" fill="#0097CD"/>
        <circle cx="312.5" cy="8.5" r="8.5" transform="rotate(-90 312.5 8.5)" fill="white"/>
    </svg>

const SVGBubblesRight = () =>
    <svg style={{right: "0px", position: "absolute", top: "100px"}} width="315" height="432" viewBox="0 0 315 432" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="274" cy="313" r="119" fill="#FFB718" fill-opacity="0.2"/>
        <circle cx="14" cy="14" r="14" fill="#FFB718"/>
        <circle cx="227.5" cy="45.5" r="26.5" fill="#0097CD"/>
        <circle cx="269.5" cy="131.5" r="8.5" transform="rotate(90 269.5 131.5)" fill="#F5F5F5"/>
        <circle cx="230.5" cy="131.5" r="8.5" transform="rotate(90 230.5 131.5)" fill="black"/>
        <circle cx="191.5" cy="131.5" r="8.5" transform="rotate(90 191.5 131.5)" fill="#F5F5F5"/>
        <rect x="78" y="212" width="77" height="11" rx="5.5" fill="black"/>
        <rect x="169" y="212" width="119" height="11" rx="5.5" fill="black"/>
    </svg>



const Awards = ({data, pageContext, yml}) => {
    return (
        <>
            <Div 
                display="none" 
                position="absolute"
                width="100%"
                zIndex="0"
                display_tablet="flex"
            >
                <SVGBubblesLeft />
                <SVGBubblesRight />
            </Div>
            <GridContainer padding_tablet="80px 0" padding="40px 17px 80px 17px" background="rgba(199, 243, 253, 0.5)" margin="60px 0 0 0">
                <Div 
                    // gridColumn_tablet="1 / 6"
                    flexDirection="column" justifyContent_tablet="start" padding_tablet="60px 0">
                    <H1 type="h1" textAlign_tablet="center" margin="0 0 11px 0" color="#606060">{yml.seo_title}</H1>
                    <H2 type="h2" fontSize="40px" fontSize_tablet="50px" textAlign_tablet="center" lineHeight="60px">{`${yml.header.title}`}</H2>
                    <Paragraph textAlign_tablet="center" padding_tablet="0 28%" margin="26px 0">{yml.header.paragraph} </Paragraph>

                </Div>
                <Div display="flex" alignItems="center" justifyContent="center" display_tablet="none" height="auto" width="100%">
                    <SVGImage />
                </Div>
            </GridContainer>
            <Badges lang={pageContext.lang} background={Colors.lightYellow} padding="60px 0" padding_tablet="68px 0" margin="0 0 58px 0" margin_tablet="0 0 78px 0" />
            <GridContainer padding="17px" columns="1" rows="1" columns_tablet="12" gridGap_tablet="11px" gridGap="0">
                <Div gridArea_tablet="1/1/1/13" flexDirection="column"  >
                    {Array.isArray(yml.awards_list) && yml.awards_list.map((m, i) => {
                        return (
                            <Div key={i} flexDirection="column" flexDirection_tablet="row" margin="0 0 75px 0" >
                                <GatsbyImage
                                    style={{height: "85px", minWidth: "150px", margin: "0 24px"}}
                                    imgStyle={{objectFit: "contain"}}
                                    loading="eager"
                                    image={getImage(m.image.childImageSharp.gatsbyImageData)}
                                />
                                <Div flexDirection="column" width="100%">
                                    <H3 textAlign_tablet="left" margin="49px 0 0 " margin_tablet="0">{m.title}</H3>
                                    <Div background="#c4c4c4" height=".5px" margin="35px 0 25px 0" width="100%" />
                                    {m.paragraph.split('\n').map((p, i) =>
                                        <Paragraph textAlign_tablet="left" margin="10px 0" key={i} dangerouslySetInnerHTML={{__html: p}}></Paragraph>
                                    )}
                                </Div>
                            </Div>
                        )
                    })}
                </Div>
            </GridContainer>

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
            }
            badges{
                paragraph
            }
            awards_list{
                image{
                    childImageSharp {
                        gatsbyImageData(
                            layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                            width: 500
                            quality: 100
                            placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                            breakpoints:	[200, 340, 520, 890]
                        )
                    #   fluid(maxWidth: 500, quality: 100, srcSetBreakpoints: [ 200, 340, 520, 890 ]){
                    #     ...GatsbyImageSharpFluid_withWebp_noBase64 # Without Blur effect
                    # }
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