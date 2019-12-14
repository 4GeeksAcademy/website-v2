import React from 'react';
import {Container} from '../../components/Sections'
import {useStaticQuery, graphql} from 'gatsby';

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
        <Container>
            <div className="row who-one mb-3">
                <div class="col-md-6 offset-md-3 program-title text-white text-center">
                    <div className="row justify-content-center mt-5 who-title">WHO IS HIRING OUR STUDENTS ?</div>
                    <div className="row justify-content-center mb-3">
                        <div className=" program-divider"></div>
                    </div>
                    <div className="row justify-content-center who-lead ">
                        Our hiring partners are growing everyday and our students have been hired from dozens of comapnies in the U.S. and worldwide.
                </div>
                </div>
            </div>
            <div className="row  mt-5 p-3">
                {data.who.edges[0].node.partners.map((partner, index) => (
                    <div key={index} className="col-6 col-xs-6 col-sm-3">
                        <div className="card partner-card ">
                            <img src={partner.image} width="100%" height="150" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="row justify-content-center mb1 who-title-small">
                438 COMPANIES
                </div>
            <div className="row justify-content-center who-lead-small ">
                Review our latest hirings
                </div>
        </Container>
    )
};

export default WhoIsHiring;
