import React from 'react';
import {Container, Row} from '../../components/Sections'
import {useStaticQuery, graphql} from 'gatsby';
import {RoundImage, Colors} from '../Styling';
import {H2, H3, Paragraph} from '../Heading'

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
              }
            }
          }
        }
      `)

  return (
    <>
      <Row>
        {
          props => props.hasTitle &&
            <div class="col-md-6 offset-md-3 text-white text-center">
              <div className="row justify-content-center mt-5">WHO IS HIRING OUR STUDENTS ?</div>
              <div className="row justify-content-center mb-3">
                <div className=""></div>
              </div>
              <div className="row justify-content-center">
                Our hiring partners are growing everyday and our students have been hired from dozens of comapnies in the U.S. and worldwide.
                </div>
            </div>
        }
      </Row>
      <Row>
        {data.who.edges[0].node.partners.map((partner, index) => (
          <div key={index} className="col-6 col-xs-6 col-sm-3">
            <RoundImage url={partner.image} border=".75rem" bsize="contain" height="150px" move up="80px" mb="1.25rem" />
            {/* <div className="card">
              <img src={partner.image} width="100%" height="150" />
            </div> */}
          </div>
        ))}
      </Row>
      <Row center>
        <H3 primary>438 COMPANIES</H3>
      </Row>
      <Row center>
        <Paragraph color={Colors.blue}>Review our latest hirings</Paragraph>
      </Row>
    </>
  )
};

export default WhoIsHiring;
