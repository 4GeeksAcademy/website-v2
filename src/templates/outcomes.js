import React, {useCallback, useState} from 'react';
import {graphql} from 'gatsby'
import {Grid, Div, Header, GridContainer} from '../new_components/Sections'
import {H2, H3, H4, Paragraph} from '../new_components/Heading'
import {Colors} from '../new_components/Styling'
import Icon from '../new_components/Icon'
import {Charts} from '../new_components/Chart'
import BaseRender from './_baseLayout'
import ChooseProgram from '../new_components/ChooseProgram'
import { StyledBackgroundSection } from '../components/Styling';

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

    const [active, setActive] = useState(false);

    // Create and Gets Ref for each property by title
    let findMappedRef = yml.sections.reduce((acc, section) =>{
        acc[section.title] = React.createRef();
        return acc;
    }, {});

    const ExecuteScroll = React.forwardRef((props, ref) => {

        // selectedButton for each Ref properties from Button
        let selectedButton = useCallback(() => props.onSelectedRef(props.keyToScroll), [props.keyToScroll])
        
        // Gets the container title reference to Enable autoScroll <Div ref={findMappedRef[section.title]}>
        let executeScroll= (e, ref) =>{
            e.preventDefault();
            window.scrollTo({
              top: ref.current?.offsetTop - 30,
              behavior: "smooth"
            })
        }

        let executeFunctions = (e, ref) => {
            executeScroll(e, ref)
            selectedButton()
        }
        return (
            <Div 
                flexDirection="column"
                isActive={props.isActive}
                borderLeftActive="5px solid black"
                backgroundActive="#F5F5F5"
                borderLeft="5px solid white" 
                padding_tablet="5px 10px 5px 20px"
            >
                <Paragraph
                    cursor="pointer"
                    key={props.keyToScroll}
                    fontSize="13"
                    onClick={(e) => executeFunctions(e, props.actionRef)}
                    transitionSec="3"
                    isActive={props.isActive}
                    textAlign="center"
                    textAlign_tablet="left"
                    >
                    {props.title.toUpperCase()}
                </Paragraph>
            </Div>
        ) 
      })


    return (
        <Div padding="0 0 50px 0" flexDirection="column">
            <Header
                hideArrowKey 
                paddingParagraph="0px 14% 0px 0"   
                textAlign_tablet="left"        
                seo_title={yml.seo_title}
                title={yml.header.title}
                paragraph={yml.header.paragraph}
                svg_image={<SVGImage />}
                background={Colors.lightYellow}
            />

            <GridContainer columns="12" padding="0 17px" padding_tablet="0 65px 0 0 " >
                <Div gridArea="1/2/1/12" flexDirection="column"  >
                    {yml.sections.filter(section => section.title !== "").map((section, i) => {
                        return (
                            <>
                                <Div key={i}  ref={findMappedRef[section.title]}>
                                    <H2 type="h2" padding="10px 0" margin="54px 0 0 0 " textAlign="left" >{section.title}</H2>
                                </Div>
                                <Div style={{margin: "20px 0", height: "1px", background: "#c4c4c4"}} />
                                {section.paragraph.split("\n").map((m, i) =>
                                    <Paragraph key={i} textAlign="left" margin="10px 0" >{m}</Paragraph>
                                )}
                                <GridContainer justifyContent="between" gridGap_tablet="30px" containerColumns_tablet={`0fr repeat(12, 1fr) 1fr`} columns_tablet={Array.isArray(section.stats) && section.stats.length} margin="41px 0 0 0">
                                    {section.stats.map((m, i) => {
                                        return (
                                            <Div key={i} gap="0" gridColumnGap="40px" flexDirection="column" margin="0 0 38px 0">
                                                <H2 type="h2" textAlign_tablet="left" color={Colors.blue}>{m.stat}</H2>
                                                <H3 type="h3" textAlign_tablet="left" >{m.content}</H3>
                                            </Div>
                                        )
                                    })}
                                </GridContainer>
                                {
                                    Array.isArray(section.sub_sections) && section.sub_sections.filter(section => section.title !== "").map((m, i) => {

                                        return (
                                            <React.Fragment key={i}>
                                                <H4 type="h4" textAlign="left" textTransform="uppercase" fontWeight="700" margin="42px 0 13px 0">{m.title}</H4>
                                                <Paragraph textAlign="left" margin_md="10px 0" dangerouslySetInnerHTML={{__html: m.content}}></Paragraph>
                                                {
                                                    Array.isArray(m.image_section) && m.image_section.map((m, i) => {
                                                        return (
                                                            <React.Fragment key={i}>
                                                                {/*
                                                                // probably it's not necesary, it returns warning on SSR
                                                                
                                                                <Img
                                                                    style={{height: "100%"}}
                                                                    imgStyle={{objectFit: "contain"}}
                                                                    // loading="eager"
                                                                    style={{margin: "38px 0"}}
                                                                    // fadeIn={false}
                                                                    alt={section.title}
                                                                    fluid={m.image.childImageSharp.fluid}
                                                                /> */}
                                                                <StyledBackgroundSection
                                                                    margin="30px 0"
                                                                    minHeight={`100px`}
                                                                    height={`255px`}
                                                                    width="100%"
                                                                    image={m.image && m.image.childImageSharp.fluid}
                                                                    bgSize={`contain`}
                                                                />


                                                                <Paragraph justifyContent="center" padding="50px 0 0" display="none" display_tablet="flex" textAlign="left">{m.image_paragraph}</Paragraph>
                                                                <GridContainer columns_tablet="3" justifyContent="center" justifyContent_tablet="center" gridTemplateColumns_tablet="3">
                                                                    {m.chart &&
                                                                        yml.charts.chart_list.map((c, i) => {
                                                                            return (
                                                                                <Div flexDirection="column" key={i}>
                                                                                    <Charts dataArray={c.data} />
                                                                                    <H4 textTransform="uppercase" fontSize="15px" lineHeight="19px" fontWeight="900">{c.title}</H4>
                                                                                </Div>
                                                                            )
                                                                        })
                                                                    }
                                                                </GridContainer>
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
                <Div gridArea="1/9/1/13" gridColumn_tablet="1 ​/ span 1" margin="54px 0 0 0" display="none" display_md="flex" style={{position: "relative"}}>
                    <Div flexDirection="column" style={{boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", position: "sticky", top: "85px"}} borderRadius="3px" border={`1px solid #e5e5e5`} width="266px" height="219px">
                        <Div margin="25px 0px 0" flexDirection="column" justifyContent="space-around" gap="8px">
                        {
                            yml.sections.filter(i => i.title !== "").map((m, i) => {
                                return (
                                    <ExecuteScroll 
                                        keyToScroll={i} 
                                        title={m.title} 
                                        actionRef={findMappedRef[m.title]}
                                        onSelectedRef={setActive} 
                                        isActive={active === i}
                                    />
                                    )
                                })
                            }
                        </Div>
                        <ChooseProgram
                            width="80%"
                            padding="20px 0"
                            textAlign={`-webkit-center`}
                            displayButton="block"
                            borderRadius="0 .75rem .75rem .75rem"
                            openLabel={`DOWNLOAD REPORT`}
                            closeLabel={`DOWNLOAD REPORT`}
                        />
                    </Div>
                </Div>
            </GridContainer>
        </Div>
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
                ref
                paragraph
                stats{
                    stat
                    content
                }
                sub_sections{
                    title
                    content
                    image_section{
                        image{
                            childImageSharp {
                                fluid(maxWidth: 500, quality: 100){
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
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