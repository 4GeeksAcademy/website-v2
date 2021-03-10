import React, {useState, useContext} from 'react';
import {Colors} from '../components/Styling'
import BaseRender from './_baseLayout'
import {SessionContext} from '../session'

// Added new_components
import Link from 'gatsby-link'
import Icon from '../new_components/Icon'
import Card from '../new_components/Card'
import {Container} from '../new_components/Sections'
import {Row, Column, Divider, Div, Grid} from '../new_components/Sections'
import {H1, H2, H3, H4, Paragraph} from '../new_components/Heading'

const Faq = (props) => {
    const {data, pageContext, yml} = props;
    const [buttonToggle, setButtonToggle] = useState(false);
    const [toggleIndex, setToggleIndex] = useState();
    const {session, setSession} = useContext(SessionContext);

    return (
        <>
            <Divider height="64px" />
            <H1
                zIndex="5"
                fontSize="13px"
                lineHeight="16px"
                fontWeight="700"
                letterSpacing="0.05em"
                color="#606060"
            >4GEEKS ACADEMY</H1>

            <H2 zIndex="5" fontSize="50px" lineHeight="60px" margin="16px 0px 19px 0px">{yml.banner.tagline}</H2>
            <Paragraph padding_sm="0 35px" padding_tablet="0 12em" padding_md="0 30%" padding_xs="0 5%" >{yml.banner.sub_heading} 
                <Link to={`/${yml.fields.lang}/${yml.banner.pathContact}`} style={{color: "#52a6d1"}}
                >
                    {yml.banner.sub_heading_contact}
                </Link>
            </Paragraph>

            <Divider height="50px" />
            <Grid
                padding="0 4%"
                gridGap="0px"
                padding_tablet="0 20%"
                padding_lg="0 26%"        
                github={`/page/faq.${pageContext.lang}.yml`}
            >
                <H3 borderBottom="1px solid" borderColor="#C4C4C4" padding="30px" >{yml.topic}</H3>
                {yml.faq.map((item, index) => {
                    return (
                        <>
                        <Row key={index} display="contents">
                          
                                <Card
                                    color={buttonToggle && index == toggleIndex}
                                    height="auto"
                                    width="100%"
                                    borders= "0"
                                    borderBottom="1px solid"
                                    borderColor=" #C4C4C4"
                                    padding="20px"
                                    onClick={() => toggleIndex === index ? (setToggleIndex(undefined), setButtonToggle(!buttonToggle)) : (setToggleIndex(index), setButtonToggle(true))}
                                >
                                    <Row display="flex" height="100%">
                                        <Div onClick={() => {setButtonToggle(!buttonToggle), setToggleIndex(toggleIndex != undefined ? undefined : index)}} display="flex" width="100%" align={`center`} alignSelf="center">
                                            <H4
                                                textAlign="left"
                                                align={`left`}
                                                align_sm={`left`}
                                                color={Colors.black}
                                                paddingRight="5%"
                                                textTransform="uppercase"
                                                fontWeight="700"
                                                >{item.question}</H4>

                                            {buttonToggle === false ?
                                                toggleIndex != index &&
                                                <Icon icon="plus"
                                                    width="24"
                                                />
                                                :
                                                buttonToggle === true && toggleIndex === index ?
                                                    <Icon icon="minus"
                                                        width="24"
                                                    />
                                                    :
                                                    <Icon icon="plus"
                                                        width="24"
                                                    />
                                            }
                                        </Div>

                                        <Div size="12" size_sm="12" alignSelf="center">
                                            {buttonToggle === true && toggleIndex === index &&
                                                <Paragraph
                                                    textAlign="left"
                                                    letterSpacing="0.05em"
                                                    lineHeight="22px"
                                                    fontWeight="normal"
                                                    dangerouslySetInnerHTML={{__html: item.answer}}
                                                    margin={`20px 0 0 0`}
                                                    align_sm="left"
                                                    fontFamily="Lato, sans-serif">
                                                </Paragraph>
                                            }
                                        </Div>

                                    </Row>
                                </Card>
                        </Row >
                        </>
                    )
                })
                }
            </Grid >
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
            sub_heading_contact
            pathContact
            image{
                childImageSharp {
                  fluid(maxWidth: 1200){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }  
          }
          topic
          faq {
            answer
            question
          }
          fields {
            lang
          }
      
        }
      }
    }
  }
`;
export default BaseRender(Faq);