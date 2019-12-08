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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserFriends, faGlasses, faClock, faChalkboardTeacher, faCommentAlt} from '@fortawesome/free-solid-svg-icons'
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
const friend = <FontAwesomeIcon icon={faUserFriends} size="2x" />
const glasses = <FontAwesomeIcon icon={faGlasses} size="2x" />
const clock = <FontAwesomeIcon icon={faClock} size="2x" />
const teacher = <FontAwesomeIcon icon={faChalkboardTeacher} size="2x" />
const comment = <FontAwesomeIcon icon={faCommentAlt} size="2x" />
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

    {/* WHAT MAKES PROGRAM STAND OUT? */}
    <div className="container program-container mt-5">
      <div className="row pt-5">
        <div class="col-md-6 offset-md-3 program-title text-white text-center">
          WHAT MAKES THIS PROGRAM STAND OUT?
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className=" program-divider"></div></div>
      <div className="row">
        <div class="col-md-6 offset-md-3 program-lead text-white text-center">
          View full comparison table >
        </div>
      </div>
      <div className="row program-features justify-content-center mt-5">
        <div className="col-md-8 program-stand">
          <div className="row program-stand-row-header">
            <div className="col-md-6 program-stand-features-header pt-4 pl-5">
              FEATURES
            </div>
            <div className="col-md-6 program-stand-features-header-right pt-4 pl-5">
              <div className="row">
                <div className="col-md-6">AT 4GEEKS</div>
                <div className="col-md-6"> INDUSTRY AVERAGE</div>
              </div>

            </div>
          </div>
          <div className="row program-stand-row-body">
            <div className="col-md-6 program-stand-features-body  pt-3">
              <div className="row ">
                <div className="col-md-3 program-icon">{teacher}</div>
                <div className="col-md-9 text-white program-body-title">ONE TEACHER EVERY FIVE</div>
              </div>
              <div className="row ">
                <div className="col-md-3 program-icon">{glasses}</div>
                <div className="col-md-9 text-white program-body-title">SENIOR TEACHERS PER STUDENT</div>
              </div>
              <div className="row">
                <div className="col-md-3 program-icon">{clock}</div>
                <div className="col-md-9 text-white program-body-title">AVERAGE TIME TO GET HELP</div>
              </div>
              <div className="row">
                <div className="col-md-3 program-icon">{friend}</div>
                <div className="col-md-9 text-white program-body-title">ONE-ON-ONE MENTORING</div>
              </div>
              <div className="row">
                <div className="col-md-3 program-icon">{comment}</div>
                <div className="col-md-9 text-white program-body-title">INTERVIEW PREPARATION</div>
              </div>
            </div>
            <div className="col-md-6 program-stand-features-body-right pt-3 ">
              <div className="row">
                <div className="col-md-6">1:5</div>
                <div className="col-md-6">1:7</div>
              </div>
              <div className="row">
                <div className="col-md-6">1:10</div>
                <div className="col-md-6">1:30</div>
              </div>
              <div className="row">
                <div className="col-md-6">15 MIN</div>
                <div className="col-md-6">NOT MEASURED</div>
              </div>
              <div className="row">
                <div className="col-md-6">UNLIMITED</div>
                <div className="col-md-6">LIMITED</div>
              </div>
              <div className="row">
                <div className="col-md-6">TARGETED</div>
                <div className="col-md-6">GENERAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>


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