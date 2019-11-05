import React from 'react';
import styled from 'styled-components';
import {StaticQuery, graphql} from 'gatsby';
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
            data.financial.edges.map((item, index) => {
                return (<div key={index}>{item.node.name}</div>)
            })

        )}
    />
);

export default PricesAndPayment;