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
  console.log(jobs)
  return (
    <>
      {jobs
        ?
        jobs.map((item, index) => {
          console.log("item", item)
          return (
            <Row key={index}>
              <Column>
                <Card
                  height="100px"
                  width="100%"
                  shadow
                  padding="0 20px 0 40px"
                  move="up"
                  up="50%"
                  margin="5px 0 10px 0"
                >
                  <Row height="100%">
                    <Column size="10" customRespSize respSize="10">
                      <Row height="100%">
                        <Column size="12">
                          <Divider height="10%" />
                          <Row height="40%" >
                            <Column size="12">
                              <H4 fontSize="22px" color={Colors.black}>{item.node.banner_heading}</H4>
                            </Column>
                          </Row>
                          <Divider height="10%" />
                          <Row height="20%">
                            {
                              item.node.cities.map((city, index) => {
                                return (
                                  <Column size="2" customRespSize respSize="2"><Card padding="1px 10px" height="100%" borders=".25rem" width="100%" color="grey"><Row align="around" height="100%"><Column size="12" alignSelf="center"><Paragraph color={Colors.gray} align="center" fontSize="12px">{city}</Paragraph></Column></Row></Card></Column>
                                )
                              })
                            }
                          </Row>
                          <Divider height="20%" />
                        </Column>
                      </Row>
                    </Column>
                    <Column size="2" customRespSize respSize="2">
                      <Row align="around" height="100%" >
                        <Column size="12" alignSelf="center" >
                          <Link to={`/job/${item.node.meta_info.slug}`}><ArrowRight width="32" color={Colors.blue} fill={Colors.blue} /></Link>
                        </Column>
                      </Row>
                    </Column>
                  </Row>
                </Card>
              </Column>
            </Row>
          )
        })
        : "Loading"
      }
    </>
  )
};

export default JobInfo;


