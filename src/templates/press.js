import React, {useState} from 'react';
import {Column, Row, Container, Div, Grid} from "../new_components/Sections";
import {Title, H1, H2, H3, H4, H5, Paragraph} from '../new_components/Heading';
import {Button, Colors, StyledBackgroundSection} from '../new_components/Styling';
import News from '../new_components/News';
import Icon from '../new_components/Icon';
import BaseRender from './_baseLayout';
import Img from 'gatsby-image';



const Press = (props) => {
    const {data, pageContext, yml} = props;
    // let testimonials = data.allTestimonialsYaml.edges[0].node
    return (
        <>
            <Grid height="754px" height_md="412px" columns="1" rows="1" columns_md="12" gridGap_md="11px">
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
            </Grid>
        </>
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
                news{
                    limit
                    heading
                  }
            }
        }
    }
    
    
}
`;
export default BaseRender(Press);
