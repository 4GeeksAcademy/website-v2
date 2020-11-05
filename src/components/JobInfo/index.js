import React, {useState, useEffect} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Container, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors} from '../Styling';
import Card from '../Card';
import Link from 'gatsby-link'
import Icon from '../Icon'
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
                  padding="20px"
                  margin="5px 0 10px 0"
                >
                  <Row >
                    <Column size="12">
                      <H4
                        fs_xs="18px"
                        fs_sm="20px"
                        fs_md="20px"
                        fs_lg="20px"
                        fontSize="24px"
                        color={Colors.black}>{item.node.banner_heading}</H4>
                    </Column>
                  </Row>
                  <Row justifyContent={`center`} margin={`10px 0 0 0`}>
                    {
                      item.node.cities.map((city, index) => {
                        return (
                          <Card
                            key={index}
                            padding="3px 10px"
                            borders=".25rem"
                            width="100%"
                            color={`grey`}
                            margin={`3px`}
                          ><Paragraph
                            color={Colors.gray}
                            align="center"
                            fs_sm="12px"
                          >{city}</Paragraph>
                          </Card>
                        )
                      })
                    }
                  </Row>
                  <Link to={`/job/${item.node.meta_info.slug}`}>
                    <Icon icon="arrowright" style={{position: "absolute", right: "10px", bottom: "5px"}} width="32" color={Colors.blue} fill={Colors.blue} />
                  </Link>
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


