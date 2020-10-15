import React, {useState, useEffect, useContext} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider, WrapperImage} from '../components/Sections'
import {H2, H3, H4, H5, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Colors, Button, RoundImage} from '../components/Styling'
import {Card} from '../components/Card'
import Icon from '../components/Icon'
import BaseRender from './_baseLayout'
import {SessionContext} from '../session'

const Faq = (props) => {
    const {data, pageContext, yml} = props;
    const [buttonToggle, setButtonToggle] = useState(false);
    const [toggleIndex, setToggleIndex] = useState();
    const {session, setSession} = useContext(SessionContext);
    return (
        <>
            <WrapperImage
                imageData={yml.banner.image && yml.banner.image.childImageSharp.fluid}
                border="bottom"
                height="300px"
                backgroundSize="cover"
                paddingRight={`0`}
                customBorderRadius="0 0 0 1.25rem"
            >
                <Divider height="100px" />
                <Title
                    size="5"
                    title={yml.banner.tagline}
                    variant="main"
                    color={Colors.white}
                    fontSize="46px"
                    textAlign="center"
                />
            </WrapperImage>
            <Divider height="50px" />
            <Wrapper
                github={`/page/faq.${pageContext.lang}.yml`}
            >
                {yml.faq.map((item, index) => {
                    return (
                        <Row key={index}>
                            <Column
                            >
                                <Card
                                    color={buttonToggle && index == toggleIndex && "grey"}
                                    height="auto"
                                    width="100%"
                                    shadow
                                    padding="20px "
                                    margin="5px 0 10px 0"
                                    onClick={() => toggleIndex === index ? (setToggleIndex(undefined), setButtonToggle(!buttonToggle)) : (setToggleIndex(index), setButtonToggle(true))}
                                >
                                    <Row height="100%">
                                        <Column onClick={() => {setButtonToggle(!buttonToggle), setToggleIndex(toggleIndex != undefined ? undefined : index)}} size="1" size_sm="2" align={`center`} alignSelf="center">
                                            {buttonToggle === false ?
                                                toggleIndex != index &&
                                                <Icon icon="plus"
                                                    width="32"
                                                    color={Colors.blue}
                                                    fill={Colors.blue}
                                                />
                                                :
                                                buttonToggle === true && toggleIndex === index ?
                                                    <Icon icon="minus"
                                                        width="32"
                                                        color={Colors.blue}
                                                        fill={Colors.blue}
                                                    />
                                                    :
                                                    <Icon icon="plus"
                                                        width="32"
                                                        color={Colors.blue}
                                                        fill={Colors.blue}
                                                    />
                                            }
                                        </Column>
                                        <Column size="11" size_sm="10" alignSelf="center">
                                            <H4
                                                align={`left`}
                                                align_sm={`left`}
                                                color={Colors.black}>{item.question}
                                            </H4>
                                            {buttonToggle === true && toggleIndex === index &&
                                                <Paragraph
                                                    margin={`10px 0 0 0`}
                                                    align_sm="left"
                                                    fontFamily="Lato-bold, sans-serif"
                                                    lineHeight="1rem">
                                                    {item.answer}
                                                </Paragraph>
                                            }
                                        </Column>
                                    </Row>
                                </Card>
                            </Column >
                        </Row >
                    )
                })
                }
            </Wrapper >
            <Divider height="50px" />
        </>
    )
}
export const query = graphql`
  query FaqsQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
          
          meta_info{
            slug
            title
            description
            image
            keywords
          }
          banner{
            tagline
            sub_heading
            image{
                childImageSharp {
                  fluid(maxWidth: 1200){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }  
          }
          faq{
              question
              answer
          }
      
        }
      }
    }
  }
`;
export default BaseRender(Faq);