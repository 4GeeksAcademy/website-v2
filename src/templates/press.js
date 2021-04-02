import React, {useState} from 'react';
import {Title, H1, H2, H3, H4, H5, Paragraph} from '../new_components/Heading';
import {Button, Colors, Link, StyledBackgroundSection} from '../new_components/Styling';
import Icon from '../new_components/Icon';
import BaseRender from './_baseLayout';
// new_components
import News from '../new_components/News';
import {Column, GridContainer, Div, Grid, Header} from "../new_components/Sections";
import Img from 'gatsby-image';



const Press = (props) => {
    const {data, pageContext, yml} = props;
    console.log("YAML", yml)
    console.log("DATA", data)
    let content = data.allPageYaml.edges[0].node.content
    console.log(yml.news)
    return (
        <Div margin="90px 0" flexDirection="column">
            <Header
                seo_title={yml.seo_title}
                title={yml.header.title}
                paragraph={yml.header.paragraph}
            />
                <News lang={pageContext.lang} limit={content.limit} height="50px" width="120px" justifyContent="flex-start" padding="50px 0" padding_tablet="40px 22%"/>

        <Div margin="90px 0" flexDirection="column">
            {Array.isArray(content.news) && content.news.slice(0, content.limit).map((l, i) => {
                return (
                    <>
                      <H1 type="h1">{l.name}</H1>
                      <Img
                        key={i}
                        style={{height: "50px", width: "120px", minWidth: "60px", margin: "0 20px"}}
                        imgStyle={{objectFit: "contain"}}
                        alt={l.name}
                        fluid={l.image != null && l.image.childImageSharp.fluid}
                      />
                      <Paragraph>See the notice <a href={l.url}>here</a></Paragraph>
                    </>
                )
            })}
        </Div>
            {/* <Grid height="754px" height_md="412px" columns="1" rows="1" columns_md="12" gridGap_md="11px">
                <Div
                    gridArea_md="1/3/1/11"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <H1
                        fontSize="13px"
                        lineHeight="16px"
                        fontWeight="700"
                        letterSpacing="0.05em"
                        color="#606060"
                    >{yml.seo_title}</H1>
                    <H2 fontSize="50px" lineHeight="60px" margin="16px 17px 19px 17px">{yml.header.title}</H2>
                    <Paragraph margin="0 17px 19px 17px" width_sm="70%" width_tablet="50%">{yml.header.paragraph}</Paragraph>
                    <News lang={pageContext.lang} limit={yml.news.limit} />
                </Div>
            </Grid> */}
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
                        location
                        url
                        image {
                            childImageSharp{
                                fluid(maxHeight:60){
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
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
