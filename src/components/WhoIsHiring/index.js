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
    let content = [];
    console.log("content", content)
    data.who.edges[0].node.partners.map((partner, i) => {
        if ((i + 1) % 4 == 0) {
            content.push(
                <div className="row" key={i}>
                    <div key={i} className="col-md-3">
                        <img src={partner.image} width="128px" alt={partner.name} />
                    </div>
                </div>
            )
        } else {
            content.push(<div key={i} className="col-md-3"><img src={partner.image} width="128px" alt={partner.name} /></div>);
        }
    });
    return (
        <div className="row">
            {content}
        </div>
    );

};

export default WhoIsHiring;