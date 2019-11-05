import React from 'react';
import styled from 'styled-components';

const PricesAndPayment = () => (
    <StaticQuery
        query={
            graphql`
            query myFinacialTest{
                financial: allFinancialsYaml {
                    edges {
                      node {
                        name
                        options {
                          months
                          payment
                        }
                        logo
                        description
                      }
                    }
                  }
              }
            `
        }
        render={data => (
            <div>{data.financial.edges[1].node.name}</div>
        )}
    />
);

export default PricesAndPayment;