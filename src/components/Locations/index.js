import React from 'react';
import {Title} from '../Heading'
import {useStaticQuery, graphql} from 'gatsby';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';


const Locations = props => {
    const data = useStaticQuery(graphql`
      query myQueryLocation{
          loc:     allLocationsYaml {
            edges {
              node {
                courses
                images
              }
            }
          }
        }
      `)
    console.log("loc", data.loc.edges[0].images)
    return (
        <div className="container  mt-5">
            <Title
                title="OUR LOCATIONS"
                style="light"
                paragraph="Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
            />
            <div className="row ">
                <div className="col-md-12">
                    <Carousel>
                        {data.loc.edges.map((loc, i) => (
                            <div key={i} className="col-md-4 ">
                                <img src={loc.node.images[0]} width="100%" height="150" />
                            </div>
                        ))}
                    </Carousel>
                </div>

            </div>
            <div className="row"></div>
        </div>
    )
};


export default Locations;