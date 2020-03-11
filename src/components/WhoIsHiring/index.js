import React, {useState} from 'react';
import {Column, Row, Divider} from '../../components/Sections'
import {useStaticQuery, graphql} from 'gatsby';
import {RoundImage, Colors} from '../Styling';
import {H2, H3, H4, Title, Paragraph} from '../Heading'
import Link from 'gatsby-link'

const WhoIsHiring = props => {
  const data = useStaticQuery(graphql`
      query myQueryWhoIsHiring{
        allPartnerYaml {
          edges {
            node {
              partners {
                sub_heading
                tagline
                images {
                  name
                  slug
                  image
                  featured
                }
              }
              influencers {
                sub_heading
                tagline
                images {
                  name
                  slug
                  image
                  featured
              }
            }
              financials {
                sub_heading
                tagline
                images {
                  name
                  slug
                  image
                  featured
              }
            }
              coding {
                sub_heading
                tagline
                images {
                  name
                  slug
                  image
                  featured
              }
            }
            }
          }
        }
        }
      `)
  const partners = props.lang[0].node
  console.log("partners", partners)
  return (
    <>
      {props.source === "partners"
        ?
        <>
          <Title
            title={partners.partners.tagline}
            primary
            size="8"
            paragraph={partners.partners.sub_heading}
            customParagraphSize="8"
          />
          <Divider height="100px" />
          <Row >
            {partners.partners.images.map((partner, index) => (
              <Column size="3" customRespSize respSize="3" key={index} margin="5px 0">
                <RoundImage
                  h_xs="50px"
                  h_sm="70px"
                  h_md="80px"
                  h_lg="90px"
                  h_xl="80px"
                  width="100%"
                  url={partner.image}
                  border=".75rem"
                  bsize="contain"
                  position="center"
                  mb="1.25rem"
                />
              </Column>
            ))}
          </Row>
          <Divider height="50px" />
          <Row align="center">
            <H4 primary>438 COMPANIES</H4>
          </Row>
          <Row align="center" marginTop="15px">
            <Paragraph color={Colors.blue}>Review our latest hirings</Paragraph>
          </Row>
        </>
        : props.source === "coding"
          ?
          <>
            <Title
              title={partners.coding.tagline}
              primary
              size="8"
              paragraph={partners.coding.sub_heading}
            />
            <Divider height="100px" />
            <Row>
              {partners.coding.images.map((partner, index) => (
                <Column size="3" customRespSize respSize="3" key={index} margin="5px 0">
                  <RoundImage
                    h_xs="50px"
                    h_sm="50px"
                    h_md="80px"
                    h_lg="90px"
                    h_xl="80px"
                    width="100%"
                    url={partner.image}
                    border=".75rem"
                    bsize="contain"
                    position="center"
                    mb="1.25rem" />
                </Column>
              ))}
            </Row>
          </>
          : props.source === "influencers"
            ?
            <>
              <Title
                title={partners.influencers.tagline}
                primary
                size="8"
                paragraph={partners.influencers.sub_heading}
              />
              <Divider height="100px" />
              <Row>
                {partners.influencers.images.map((partner, index) => (
                  <Column size="3" customRespSize respSize="3" key={index} margin="5px 0">
                    <RoundImage
                      h_xs="50px"
                      h_sm="50px"
                      h_md="80px"
                      h_lg="90px"
                      h_xl="80px"
                      width="100%"
                      url={partner.image}
                      border=".75rem"
                      bsize="contain"
                      position="center"
                      mb="1.25rem" />
                  </Column>
                ))}
              </Row>
            </>
            : props.source === "financials" &&
            <>
              <Title
                title={partners.financials.tagline}
                primary
                size="8"
                paragraph={partners.financials.sub_heading}
              />
              <Divider height="100px" />
              <Row>
                {partners.financials.images.map((partner, index) => (
                  <Column size="4" customRespSize respSize="4" key={index} margin="5px 0">
                    <RoundImage
                      h_xs="50px"
                      h_sm="50px"
                      h_md="80px"
                      h_lg="90px"
                      h_xl="40px"
                      width="100%"
                      url={partner.image}
                      border=".75rem"
                      bsize="contain"
                      position="center"
                      mb="1.25rem" />
                  </Column>
                ))}
              </Row>
            </>
      }
    </>
  )
};

export default WhoIsHiring;
