import React, {useState, useEffect} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H2, H3, H4, H5, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button, RoundImage, Address, Marker, Clock, Question} from '../components/Styling'
import {Card} from '../components/Card'
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import BaseRender from './_baseRender'
import JobInfo from '../components/JobInfo'
import Link from 'gatsby-link'

const Events = ({data, pageContext, yml}) => {
  console.log("jo", yml)
  const [event, setEvent] = useState([])
  useEffect(() => {
    const loadEvents = async () => {
      fetch(
        'https://assets.breatheco.de/apis/event/all',
      )
        .then(response => response.json())
        .then(data => setEvent(data))
    }
    loadEvents();
  }, []);
  return (
    <>
      <Wrapper
        style="default"
        image="yes"
        url={yml.banner.image}
        border="bottom"
        height="300px"
        backgroundSize="cover"
      >
        <Divider height="100px" />
        <Title
          size="5"
          title={yml.banner.tagline}
          main
          color={Colors.white}
          fontSize="46px"
          textAlign="center"
        />
      </Wrapper>
      <Wrapper
        style="default"
        image="no"
        border="top"
        color={Colors.lightGray}
      >
        <Divider height="50px" />
        <Row align="left">
          <Column size="12">
            <H4

              fs_xs="30px"
              fs_sm="30px"
              fs_md="30px"
              fs_lg="30px"
              fs_xl="30px"
            >Our Events</H4>
          </Column>
        </Row>
        <Row>
          <Separator primary />
        </Row>
        <Row>
          <Column size="8">
            <Row>
              <Column size="4">
                <Button width="100%" color={Colors.gray} textColor={Colors.white} margin="1rem 0 2rem 0" padding=".35rem.85rem">Campuses</Button>
              </Column>
              <Column size="4">
                <Button width="100%" color={Colors.gray} textColor={Colors.white} margin="1rem 0 2rem 0" padding=".35rem.85rem">Event's Type</Button>
              </Column>
            </Row>
          </Column>
        </Row>

        <Row>
          {event.map((i, index) => (
            <Column size="4" key={index} margin="0 0 1rem 0">
              <Card
                h_xs="auto"
                h_sm="auto"
                h_md="auto"
                h_lg="auto"
                h_xl="auto"
                width="100%"
                color="white"

                shadow
                move="up">

                <RoundImage
                  url={i.banner_url}
                  bsize="cover"
                  mb="10px"
                  border="1.25rem 1.25rem 0 0"
                  position="center center"
                  h_xs="230px"
                  h_sm="230px"
                  h_md="230px"
                  h_lg="230px"
                  h_xl="230px"
                />
                <Row marginLeft="0" marginRight="0">
                  <Column size="12">
                    <Row marginBottom="1rem" >
                      <Column size="12">
                        <Paragraph>{i.type}</Paragraph>
                      </Column>
                    </Row>
                    <Row marginBottom="1rem" height="70px">
                      <Column size="12">
                        <H4
                          fs_xs="18px"
                          fs_sm="18px"
                          fs_md="18px"
                          fs_lg="18px"
                          fs_xl="18px"
                        >{i.title}
                        </H4>
                      </Column>
                    </Row>
                    <Row marginBottom=".2rem" >
                      <Column size="12">
                        <Paragraph><Clock width="24" color={Colors.blue} fill={Colors.blue} />{i.event_date}</Paragraph>
                      </Column>
                    </Row>
                    <Row marginBottom=".2rem" >
                      <Column size="12">
                        <Paragraph><Marker width="24" color={Colors.blue} fill={Colors.blue} />{i.city_slug}</Paragraph>
                      </Column>
                    </Row>
                    <Row marginBottom=".2rem" >
                      <Column size="12">
                        <Paragraph><Question width="24" color={Colors.blue} fill={Colors.blue} />{i.type}</Paragraph>
                      </Column>
                    </Row>
                    <Row marginBottom=".2rem" >
                      <Column size="6" align="center">
                        <a href={i.url}>
                          <Button outline width="100%" color={Colors.gray} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">Join Our Community</Button>
                        </a>
                      </Column>
                      <Column size="6" align="center">
                        <a href={i.url} target="_blank">
                          <Button outline width="100%" color={Colors.red} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">Register</Button>
                        </a>
                      </Column>
                    </Row>

                  </Column>
                </Row>



                {/* <Row>
                <Column size="12">

                  <div className="single-post" dangerouslySetInnerHTML={{__html: i.description}}></div>
                </Column>
              </Row> */}
              </Card>
            </Column>
          ))}
        </Row>
      </Wrapper>

      {/* <Wrapper
        style="default">
        <JobInfo />
      </Wrapper>
      <Divider height="50px" />
      <Wrapper
        style="default"
        height="400px"

      >
        <Title
          title={yml.about.heading}
          primary
          size="8"
          paragraph={yml.about.sub_heading}
        />
        <Divider height="50px" />
        <Row>
          <Column
            size="12"
            border="bottom"
            image="no"
          >
            <Card shadow borders="1.25rem" height="426px" >
              <Row
                height="100%"
                marginLeft="0"
                marginRight="0"
                customRespSize
              >
                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" border="bottom">
                  <Row align="center" height="100%">
                    <Column size="8" height="100%">
                      <Row height="5%" />
                      <Row height="70%" align="around">
                        <Column size="12" alignSelf="center">
                          <Paragraph
                            color={Colors.gray}
                            fs_xs="12px"
                            fs_sm="12px"
                            fs_md="12px"
                            fs_lg="12px"
                            fs_xl="12px"
                            lineHeight="20px"
                            margin="20px 0 0 0"
                            align="left"
                          >
                            {yml.about.content}
                          </Paragraph>
                        </Column>
                      </Row>
                      <Row height="20%" align="around">
                        <Column size="12" alignSelf="center">
                          <Link to={yml.about.button_link}>
                            <Paragraph
                              color={Colors.blue}
                              fs_xs="12px"
                              fs_sm="12px"
                              fs_md="12px"
                              fs_lg="12px"
                              fs_xl="12px"
                              lineHeight="20px"
                              margin="20px 0 0 0"
                              align="left"
                            >
                              {yml.about.button}
                            </Paragraph></Link>
                        </Column>
                      </Row>
                      <Row height="5%" />


                    </Column>
                  </Row>
                </Column>
                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" backgroundSize="cover" image="yes" url={yml.about.image} border="custom" customBorderRadius="0 1.25rem 1.25rem 0" />
              </Row>
            </Card>
          </Column>
        </Row>
      </Wrapper>

      <Divider height="350px" /> */}

    </>
  )
};
export const query = graphql`
  query EventsQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
          
          meta_info{
            slug
            title
            description
            image
            keywords
          }
          banner{
            tagline
            sub_heading
            image 
          }
          about{
            heading
            sub_heading
            image
            content
            button
            button_link
          }
        }
      }
    }
  }
`;
export default BaseRender(Events);