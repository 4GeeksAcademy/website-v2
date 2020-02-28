import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, Address, Teacher, Glasses, Clock, Users, Comments, Button, RoundImage} from '../Styling';
import {Card} from '../Card';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Link} from 'gatsby';

const Alumni = props => {
    const data = useStaticQuery(graphql`
      query myQueryAlumni{
        allAlumniYaml {
            edges {
              node {
                header{
                  tagline
                  sub_heading
                  button_text
                }
                alumni {
                  name
                  last_name
                  slug
                  job_title
                  job_name
                  image
                  content
                  video
                }
                button_section{
                  button_text
                }
              }
            }
          }
        }
      `)
    let alumni = data.allAlumniYaml.edges[0].node
    console.log("alumni", alumni)
    return (
        <>

            <Row>
                <Column
                    size="12"
                    border="bottom"
                    image="no"
                    color={Colors.white}
                ><Carousel showIndicators={false} showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>

                        {alumni != null &&
                            alumni.alumni.map((item, index) => {
                                return (
                                    <Card key={index} shadow borders="1.25rem" height="500px">
                                        <Row
                                            height="100%"
                                            marginLeft="0"
                                            marginRight="0"
                                            customRespSize

                                        >
                                            <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" border="bottom">
                                                <Row align="center" height="100%">
                                                    <Column size="9" height="100%">
                                                        <Divider height="10%" />
                                                        <Row height="20%">
                                                            <Column size="12">
                                                                <H3 primary align="left" >{`Meet ${item.name} `}</H3>
                                                                <Paragraph primary fs_md="10px" margin="5px 0" align="left" >{`Now ${item.job_title} at ${item.job_name}`}</Paragraph>
                                                            </Column>
                                                            {/* <H3 primary align="left" >SUPPORT FOR LIFE</H3> */}
                                                        </Row>
                                                        <Row height="10%" align="around">

                                                            <Separator primary al_xs="center" />

                                                        </Row>
                                                        <Row height="30%">
                                                            <Column size="12">
                                                                <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{item.content}</Paragraph>
                                                            </Column>
                                                        </Row>
                                                        <Row height="20%">
                                                            <Column size="12">
                                                                <Row height="100%" align="around">
                                                                    <Column size="2" alignSelf="center">
                                                                        <RoundImage border="100%" width="30px" height="30px" bsize="contain" url="/staff/marcelo.png" />
                                                                    </Column>
                                                                    <Column size="10" alignSelf="center">
                                                                        <Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${item.name} ${item.last_name}, ${item.job_title}`}</Paragraph>
                                                                    </Column>
                                                                </Row>
                                                            </Column>
                                                        </Row>

                                                        <Row height="10%">
                                                            <Column size="12">
                                                                <Paragraph color={Colors.blue} align="left" fontSize="14px" lineHeight="20px">{alumni.header.button_text}</Paragraph>
                                                            </Column>
                                                        </Row>
                                                    </Column>
                                                </Row>


                                            </Column>
                                            <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="yes" url="/images/alumni-bg.png" border="custom" customBorderRadius="0 1.25rem 1.25rem 0" />
                                        </Row>
                                    </Card>
                                )
                            })

                        }
                    </Carousel>
                </Column>
            </Row>
            <Row height="10%">
                <Column size="6"><Link to="/graduates"><Button outline width="200px" color={Colors.gray} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">{alumni.button_section.button_text}</Button></Link></Column>
            </Row>

        </>)

};

export default Alumni;