import React, {useState, useEffect, useContext} from 'react';
import Layout from '../global/Layout';
import styled from 'styled-components';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, Divider} from '../components/Sections'
import {Title, H1, H2, H3, Span, Paragraph, Separator} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, RoundImage, BackgroundSection} from '../components/Styling'
import GeeksVsOthers from '../components/GeeksVsOthers'
import Mentors from '../components/Mentors'
import PricesAndPayment from '../components/PricesAndPayment'
import AlumniProjects from '../components/AlumniProjects'
import Credentials from '../components/Credentials'
import Scrollspy from 'react-scrollspy'
import BaseRender from './_baseRender'
import {SessionContext} from '../session.js'
import ProgramSelector from '../components/ProgramSelector'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {BrowserView} from "react-device-detect";

const Location = ({data, pageContext, yml}) => {
    return (<>
        <Wrapper
            style="default"
            data={yml.header.image.childImageSharp.fluid}
            image="yes"
            className={`img-header`}
            height={`300px`}
            bgSize={`cover`}
            alt={yml.header.alt}
        >
            <Divider height="50px" />
            <Row github={`/location`}>
                <Column size="12">
                    <H1 color={Colors.white} fontSize="24px" align="center">{yml.seo_title}</H1>
                </Column>
            </Row>
            {/* <ProgramSelector week={week} /> */}
            <Divider height="20px" />

            <Title
                size="5"
                title={yml.tagline}
                main
                color={Colors.white}
                fontSize="46px"
                textAlign="center"
            />
        </Wrapper>
        <Divider height="100px" />
        <Wrapper style="default">
            <Row>
                <Column
                    size="12"
                    border="bottom"
                    image="no"
                >
                    <Card shadow borders="1.25rem" height="426px" >
                        <Row
                            height="100%"
                            marginLeft="0"
                            marginRight="0"
                            customRespSize
                        >
                            <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" border="bottom">
                                <Row align="center" height="100%">
                                    <Column size="10" height="100%">
                                        <Divider height="50px" />
                                        <Row height="5%">
                                            <Column size="12">
                                                <H3 fs_xs="20px"
                                                    fs_sm="20px"
                                                    fs_md="18px"
                                                    fs_lg="20px"
                                                    fs_xl="24px"
                                                    primary align="left" >{yml.info_box.heading}</H3>
                                                <Paragraph primary margin="5px 0" align="left" ></Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="5%" align="around">
                                            <Column size="12" alignSelf="center">
                                                <Separator primary />
                                            </Column>
                                        </Row>
                                        <Row height="30%">
                                            <Column size="12">
                                                <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.info_box.address}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="5%">
                                            <Column size="12">
                                                <H3
                                                    fs_xs="20px"
                                                    fs_sm="24px"
                                                    fs_md="18px"
                                                    fs_lg="20px"
                                                    fs_xl="24px"
                                                    primary align="left" >{yml.info_box.contact_heading}</H3>
                                                <Paragraph primary margin="5px 0" align="left" ></Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="5%" align="around">
                                            <Column size="12" alignSelf="center">
                                                <Separator primary />
                                            </Column>
                                        </Row>
                                        <Row height="5%">
                                            <Column size="12">
                                                <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.info_box.phone}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="5%">
                                            <Column size="12">
                                                <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.info_box.email}</Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="">
                                            <Paragraph color={Colors.gray} fontSize="14px" lineHeight="20px" margin="20px 0 0 0" align="left" ></Paragraph>
                                        </Row>


                                    </Column>
                                </Row>
                            </Column>
                            <Column
                                size="6"
                                customRespSize
                                respSize="6"
                                paddingRight={`0`}
                                // alignSelf="center" 
                                // height="100%" 
                                // backgroundSize="cover" 
                                // image="yes" 
                                // url={yml.info_box.image} 
                                border="custom"
                                customBorderRadius="0 1.25rem 1.25rem 0"
                            >
                                <BackgroundSection
                                    className={`img-right`}
                                    height={`426px`}
                                    data={yml.info_box.image.childImageSharp.fluid}
                                    bgSize={`cover`}
                                    alt="Cnn Logo"
                                />
                            </Column>
                        </Row>
                    </Card>
                </Column>
            </Row>
        </Wrapper>
        <Divider height="100px" />
        <Wrapper style="default">
            <Row>
                <Column
                    size="12"
                    border="bottom"
                    image="no"
                >
                    <Card shadow borders="1.25rem" height="426px" >
                        <Row
                            height="100%"
                            marginLeft="0"
                            marginRight="0"
                            customRespSize
                        >
                            <Column size="6" customRespSize respSize="6" paddingLeft="0" alignSelf="center" height="100%" backgroundSize="cover" border="custom" customBorderRadius="1.25rem 0 0 1.25rem" >
                                <Carousel showIndicators={false} showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>

                                    {yml.carousel_box.images.map((item, index) => {
                                        return (
                                            <Column
                                                key={index}
                                                size="12"
                                                customRespSize
                                                respSize="12"
                                                paddingLeft={`0`}
                                                // alignSelf="center"
                                                // height="426px"
                                                // backgroundSize="cover"
                                                // image="yes"
                                                // url={item.path}
                                                border="custom"
                                                customBorderRadius="1.25rem 0 0 1.25rem"
                                            >
                                                <BackgroundSection
                                                    className={`img-left`}
                                                    height={`426px`}
                                                    data={item.path.childImageSharp.fluid}
                                                    bgSize={`cover`}
                                                    alt="Cnn Logo"
                                                />
                                            </Column>
                                        )
                                    })}
                                </Carousel>

                            </Column>
                            <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" border="bottom">
                                <Row align="center" height="100%">
                                    <Column size="10" height="100%">
                                        <Divider height="50px" />
                                        <Row height="15%">
                                            <Column size="12">
                                                <H3 fs_xs="18px"
                                                    fs_sm="20px"
                                                    fs_md="18px"
                                                    fs_lg="20px"
                                                    fs_xl="24px" primary align="left" >{yml.carousel_box.heading}</H3>
                                                <Paragraph primary margin="5px 0" align="left" ></Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="5%" align="around">
                                            <Column size="12" alignSelf="center">
                                                <Separator primary />
                                            </Column>
                                        </Row>
                                        <Row height="30%">
                                            <Column size="12">
                                                <Paragraph
                                                    fs_xs="12px"
                                                    fs_sm="12px"
                                                    fs_md="12px"
                                                    fs_lg="14px"
                                                    fs_xl="14px" color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.carousel_box.content}</Paragraph>
                                            </Column>
                                        </Row>




                                    </Column>
                                </Row>
                            </Column>

                        </Row>
                    </Card>
                </Column>
            </Row>
        </Wrapper>
        <Divider height="100px" />
    </>
    )
};

export const query = graphql`
  query LocationQuery($file_name: String!, $lang: String!) {
    allLocationYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            seo_title
            header{
                tagline
                sub_heading
                image {
                    childImageSharp {
                    fluid(maxWidth: 800){
                        ...GatsbyImageSharpFluid_withWebp
                    }
                    }
                } 
                alt
            }
            info_box{
                heading
                address
                phone
                email
                contact_heading
                image {
                    childImageSharp {
                      fluid(maxWidth: 800){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                alt 
            }
            meta_info{
                title
                description
                image
                keywords
            }
            carousel_box{
                heading
                content
                images{
                    path{
                        childImageSharp {
                          fluid(maxWidth: 300){
                            ...GatsbyImageSharpFluid_withWebp
                          }
                        }
                      } 
                    alt
                }
                
            }
            
        }
      }
    }
  }
`;

export default BaseRender(Location);
