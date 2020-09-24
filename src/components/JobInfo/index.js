import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Row, Container, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, ArrowRight, Teacher, Glasses, Clock, Users, Comments, Button, RoundImage} from '../Styling';
import {Card} from '../Card';
import Link from 'gatsby-link'
import Fragment from "../Fragment"

const JobInfo = () => {
  const data = useStaticQuery(graphql`
      query myJobsQuery{
        allJobYaml {
          edges {
            node {
              banner_heading
              cities
              meta_info{
                slug
              }
            }
          }
        }
        }
      `)
  let jobs = data.allJobYaml.edges
  return (
    <Fragment github="/job">
      {jobs
        ?
        jobs.map((item, index) => {
          return (
            <Row key={index}>
              <Column>
                <Card
                  style={{position: "relative"}}
                  height="100px"
                  width="100%"
                  shadow
                  padding="0 20px 0 40px"
                  margin="5px 0 10px 0"
                >
                  <Row >
                    {/* <Column size="10" customRespSize respSize="10">
                      <Row > */}
                    <Column size="12">
                      <Divider height="10%" />
                      <Row >
                        <Column size="12">
                          <H4
                            fs_xs="18px"
                            fs_sm="20px"
                            fs_md="20px"
                            fs_lg="20px"
                            fs_xl="24px"
                            color={Colors.black}>{item.node.banner_heading}</H4>
                        </Column>
                      </Row>
                      <Divider height="10%" />
                      <Row >
                        {
                          item.node.cities.map((city, index) => {
                            return (
                              // <Column key={index} size="2" customRespSize respSize="3">
                              <Card
                                key={index}
                                padding="1px 10px"
                                h_xs="10px"
                                h_sm="10px"
                                h_md="10px"
                                h_lg="10px"
                                h_xl="10px"
                                borders=".25rem"
                                width="100%"
                                color={`grey`}
                              ><Paragraph
                                color={Colors.gray}
                                align="center"
                                fs_xs="8px"
                                fs_sm="10px"
                                fs_md="10px"
                                fs_lg="10px"
                                fs_xl="12px"
                              >{city}</Paragraph>
                                {/* <Row align="around" height="100%">
                                        <Column size="12" alignSelf="center">
                                          <Paragraph
                                            color={Colors.gray}
                                            align="center"
                                            fs_xs="8px"
                                            fs_sm="10px"
                                            fs_md="10px"
                                            fs_lg="10px"
                                            fs_xl="12px"
                                          >{city}</Paragraph>
                                        </Column>
                                      </Row> */}
                              </Card>
                              // </Column>
                            )
                          })
                        }
                      </Row>
                      <Divider height="20%" />
                    </Column>
                    {/* </Row>
                    </Column> */}
                    {/* <Column size="2" customRespSize respSize="2">
                      <Row align="around" height="100%" >
                        <Column size="12" alignSelf="center" > */}
                    <Link to={`/job/${item.node.meta_info.slug}`}>
                      <ArrowRight style={{position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)"}} width="32" color={Colors.blue} fill={Colors.blue} />
                    </Link>
                    {/* </Column>
                      </Row>
                    </Column> */}
                  </Row>
                </Card>
              </Column>
            </Row>
          )
        })
        : "Loading"
      }
    </Fragment>
  )
};

export default JobInfo;


