import React from 'react';
import styled from 'styled-components';
import {StaticQuery, graphql} from 'gatsby';

export default () => (
    <StaticQuery
        query={
            graphql`
            query myQueryTest{
                credentials: allCredentialsDataYaml {
                    edges {
                      node {
                        rating
                        hired_students
                        alumni_number
                        campuses
                        images{
                          googleImage
                          switchImage
                          reportImage
                        }
                      }
                    }
                  }
                alumni:   allAlumniYaml{
                  edges{
                    node{
                      name
                      image
                      content
                      title
                    }
                  }
                }
              }
            `
        }
        render={data => (
            <div>{data.alumni.edges[1].node.title}</div>
        )}
    />

)
// const TestCom = () => (
//     <div>TestCom</div>
// );

// export default TestCom;