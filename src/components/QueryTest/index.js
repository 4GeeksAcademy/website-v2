import React from 'react';
import styled from 'styled-components';

// const QueryTest = () => (
//     <div>Query Test</div>
// );

// export default QueryTest;
export default () => {
    const classes = useStyles();



    const data = useStaticQuery(graphql`
      query myQueryTest2{
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
          
        
        cred: allFinancialsYaml{
          edges{
              node{
                  name
                  options{
                      months
                      payment
                  }
                  logo
                  description
              }
          }
      }}
      `)


    return (
        // <header>
        //     <h1>{data.alumni.edges[1].node.name}</h1>
        // </header>
        <div className="container">
            Query Test
      </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


