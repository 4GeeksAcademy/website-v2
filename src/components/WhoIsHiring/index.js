import React from 'react';
import {Container} from '../../components/Sections'

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
            <div className="row who-two">
                <div class="col-md-12  program-title text-white text-center">
                    <div className="row  mt-5 who-boxes justify-content-center">
                        <div className="col-md-2 mr-3"></div>
                        <div className="col-md-2 mr-3"></div>
                        <div className="col-md-2 mr-3"></div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="row justify-content-center mt-3 who-boxes">
                        <div className="col-md-2 mr-3"></div>
                        <div className="col-md-2 mr-3"></div>
                        <div className="col-md-2 mr-3"></div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="row justify-content-center mt-3 who-boxes">
                        <div className="col-md-2 mr-3"></div>
                        <div className="col-md-2 mr-3"></div>
                        <div className="col-md-2 mr-3"></div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="row justify-content-center mb1 who-title-small">
                        438 COMPANIES
                </div>
                    <div className="row justify-content-center who-lead-small ">
                        Review our latest hirings
                </div>
                </div>
            </div>
        </Container>
    )
};

export default WhoIsHiring;