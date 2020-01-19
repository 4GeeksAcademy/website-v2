import React from 'react';
import {Column, Row, Divider} from '../../components/Sections'
import {useStaticQuery, graphql} from 'gatsby';
import {RoundImage, Colors} from '../Styling';
import {H2, H3, H4, Paragraph} from '../Heading'

const WhoIsHiring = () => {
  const data = useStaticQuery(graphql`
      query myQueryWhoIsHiring{
          who: allPartnersYaml {
            edges {
              node {
                partners {
                  name
                  image
                }
                coding {
                  name
                  image
                }
                influencers {
                  name
                  image
                }
              }
            }
          }
        }
      `)
  return (
    <>
      <Row>
        {data.who.edges[0].node.partners.map((partner, index) => (
          <Column size="3" customRespSize respSize="3" key={index}>
            <RoundImage url={partner.image} border=".75rem" bsize="contain" position="center" height="100px" width="100px" mb="1.25rem" />
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
      <Divider height="50px" />
    </>
  )
};

export default WhoIsHiring;
