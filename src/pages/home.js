import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Image from '../components/Image';
import Credentials from '../components/Credentials';
import Alumni from '../components/Alumni';
import TestCom from '../components/testCom';
import Test from '../components/Test';
import Mentors from '../components/Mentors';
import PricesAndPayment from '../components/PricesAndPayment';


const Page = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #555;
  margin-top: 60px;
`;

const Label = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-top: 12px;
  letter-spacing: 10px;
  text-transform: uppercase;
`;

const Home = ({data}) => (
  <Layout>
    <Page>
      <Alumni
        name={data.alumni.edges[0].node.name}
        content={data.alumni.edges[0].node.content}
        alumniImage={data.alumni.edges[0].node.image}
        nextName={data.alumni.edges[1].node.name}
        nextTitle={data.alumni.edges[1].node.title}


      />
      <Mentors

        mentorsArray={data.mentors.edges}
        column={3}

      />
      <Credentials
        rating={data.credentials.edges[0].node.rating}
        hired={data.credentials.edges[0].node.alumni_number}
        campuses={data.credentials.edges[0].node.hired_students}
        alumni={data.credentials.edges[0].node.campuses}
        googleImage={data.credentials.edges[0].node.images.googleImage}
        switchImage={data.credentials.edges[0].node.images.switchImage}
        reportImage={data.credentials.edges[0].node.images.reportImage}
      />
      {/* <Credentials
        rating={data.credentials.edges[0].node.rating}
        hired={data.credentials.edges[0].node.alumni_number}
        campuses={data.credentials.edges[0].node.hired_students}
        alumni={data.credentials.edges[0].node.campuses}
        googleImage={data.credentials.edges[0].node.images.googleImage}
        switchImage={data.credentials.edges[0].node.images.switchImage}
        reportImage={data.credentials.edges[0].node.images.reportImage}
      /> */}
      <PricesAndPayment />
      {/* <TestCom />
      <Test /> */}
      <Heading>Home Page</Heading>
      <Label>Starter</Label>
    </Page>
  </Layout>
);

// export const alumniQuery = graphql`
//   query myAlumniQuery{
// allAlumniYaml{
//   edges{
//     node{
//       name
//       image
//       content
//     }
//   }
// }
//   }
// `

export const myQuer = graphql`
query myQueryy{
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
  mentors: allTeachersYaml{
    edges{
      node{
        name
        image
        last_name
        nick_name
        coding_skills
      }
    }
  }
}
`
export default Home;