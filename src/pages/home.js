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
import Footer from '../components/Footer'
import {Spring} from '../components/spring'
import ReactPlayer from 'react-player'
import PricesAndPayment from '../components/PricesAndPayment';
import QueryTest from '../components/QueryTest';
import Why4Geeks from '../components/Why4Geeks';
import Jobs from '../components/Jobs';
import '../assets/css/style.css'

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
    {/* <Page> */}


    {/* <Spring /> */}

    {/* <Alumni
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
      /> */}
    {/* <Footer /> */}
    {/* <PricesAndPayment /> */}


    {/* <TestCom />
      <Test /> */}
    {/* <Heading>Home Page</Heading>
      <Label>Starter</Label> */}
    {/* <Credentials
        rating={data.credentials.edges[0].node.rating}
        hired={data.credentials.edges[0].node.alumni_number}
        campuses={data.credentials.edges[0].node.hired_students}
        alumni={data.credentials.edges[0].node.campuses}
        googleImage={data.credentials.edges[0].node.images.googleImage}
        switchImage={data.credentials.edges[0].node.images.switchImage}
        reportImage={data.credentials.edges[0].node.images.reportImage}
      /> */}
    {/* </Page> */}
    <div className="jumbotron bg-white jumbo-container">
      <div class="container">
        <div className="row">
          <div className="col-md-6 px-5">
            <div className="row jumbo-lead px-5">
              Miami Coding Bootcamp
              </div>
            <div className="row px-5 mb-3">
              <div className="col-md-1 jumbo-divider "></div>
            </div>
            <div className="row jumbo-slogan px-5">
              <div>LEARN TO CODE AND GET CAREER SUPPORT FOR LIFE</div>
            </div>
            <div className="row jumbo-paragraph px-5 mt-3">
              Join more than 500 graduates already working as coders and become a part of one of the world's biggest coding community.
              </div>
            <div className="row px-5 mt-3">
              <a className="btn text-white btn-md rounded-pill jumbo-button" href="#" role="button">CHOOSE YOUR PROGRAM </a>

            </div>
          </div>
          <div className="col-md-6">
            <ReactPlayer className="jumbo-video" url='https://www.youtube.com/watch?v=ysz5S6PUM-U' width="100%" height="500px" playIcon controls="false" />

          </div>
        </div>


      </div>
    </div>
    <QueryTest />
    <Why4Geeks />
    <Jobs />
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