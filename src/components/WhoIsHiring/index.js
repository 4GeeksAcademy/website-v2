import React, {useState} from 'react';
import {Column, Row, Divider} from '../../components/Sections'
import {useStaticQuery, graphql} from 'gatsby';
import {RoundImage, Colors} from '../Styling';
import {H2, H3, H4, Paragraph} from '../Heading'

const WhoIsHiring = props => {
  const data = useStaticQuery(graphql`
      query myQueryWhoIsHiring{
        allPartnersYaml {
          edges {
            node {
              partners {
                featured
                image
                name
                slug
              }
              influencers {
                name
                slug
                image
                featured
              }
              financials {
                name
                slug
                image
                featured
              }
              coding {
                name
                slug
                image
                featured
              }
            }
          }
        }
        }
      `)
  const partners = data.allPartnersYaml.edges[0].node
  console.log("partners", data.allPartnersYaml.edges[0].node)
  return (
    <>
      {props.source === "partners"
        ?
        <>
          <Row>
            {partners.partners.map((partner, index) => (
              <Column size="3" customRespSize respSize="3" key={index}>
                <RoundImage url={partner.image} border=".75rem" bsize="contain" position="center" height="100px" width="150px" mb="1.25rem" />
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
          <Row>
            {partners.coding.map((partner, index) => (
              <Column size="3" customRespSize respSize="3" key={index}>
                <RoundImage url={partner.image} border=".75rem" bsize="contain" position="center" height="100px" width="150px" mb="1.25rem" />
              </Column>
            ))}
          </Row>
          : props.source === "influencers"
            ?
            <Row>
              {partners.influencers.map((partner, index) => (
                <Column size="3" customRespSize respSize="3" key={index}>
                  <RoundImage url={partner.image} border=".75rem" bsize="contain" position="center" height="100px" width="150px" mb="1.25rem" />
                </Column>
              ))}
            </Row>
            : props.source === "financials" &&
            <Row>
              {partners.financials.map((partner, index) => (
                <Column size="4" customRespSize respSize="4" key={index}>
                  <RoundImage url={partner.image} border=".75rem" bsize="contain" position="center" height="100px" width="150px" mb="1.25rem" />
                </Column>
              ))}
            </Row>
      }
    </>
  )
};

export default WhoIsHiring;
