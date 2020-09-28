import React, {useState, useEffect, useContext} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, WrapperImage, Divider, Div} from '../components/Sections'
import {H2, H3, H4, H5, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button, RoundImage, Address, Marker, ArrowRight, Clock, Question, Filter, Cross, AngleDown, TriangleDown, StyledBackgroundSection} from '../components/Styling'
import {Card} from '../components/Card'
import BaseRender from './_baseRender'
import Link from 'gatsby-link'
import dayjs from "dayjs"
import LazyLoad from 'react-lazyload';
import {SessionContext} from '../session'

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
function rand () {
  return Math.round(Math.random() * 20) - 10;
}


const Calendar = (props) => {
  const {data, pageContext, yml} = props;
  const {session, setSession} = useContext(SessionContext);

  const [cohorts, setCohorts] = useState([]);
  const [events, setEvent] = useState([]);
  const [academy, setAcademy] = useState(null);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState({toggle: false, hovered: false})
  const [single, setSingle] = useState()
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredCohorts, setFilteredCohorts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [toggleCity, setToggleCity] = useState();
  const [togglesCity, setTogglesCity] = useState();
  const [toggle, setToggle] = useState();
  const [toggles, setToggles] = useState();
  const [filterType, setFilterType] = useState();
  const [filterCity, setFilterCity] = useState();
  const [test, setTest] = useState([]);
  const [filterByCity, setFilterByCity] = useState(() => (session && session.location) ? [session.location.city] : ["Locations"]);
  const [filterByType, setFilterByType] = useState(["Courses"]);
  // https://breathecode.herokuapp.com/v1/admissions/cohort/all?upcoming=true&academy=santiago-chile
  // https://breathecode.herokuapp.com/v1/admissions/cohort/all?upcoming=true
  // https://breathecode.herokuapp.com/v1/admissions/cohort/all

  // https://breathecode.herokuapp.com/v1/events/all
  // https://breathecode.herokuapp.com/v1/events/all?upcoming=true
  // https://breathecode.herokuapp.com/v1/events/all?academy=downtown-miami&type=workshop

  useEffect(() => {
    const loadCohorts = () => {
      if (academy == null) {
        fetch(
          `${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true`,
        )
          .then(response => response.json())
          .then(data => {
            setCohorts(data)
          })
      }
      else {
        fetch(
          `${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true&academy=${academy}`,
        )
          .then(response => response.json())
          .then(data => {
            setCohorts(data)
          })

      }
    }

    const loadEvents = () => {
      if (academy == null) {
        fetch(
          `${process.env.GATSBY_BREATHECODE_HOST}/events/all?upcoming=true`,
        )
          .then(response => response.json())
          .then(data => setEvent(data))
      }
      else {
        fetch(
          `${process.env.GATSBY_BREATHECODE_HOST}/events/all?academy=${academy}&type=${filterByType[0]}`,
        )
          .then(response => response.json())
          .then(data => setEvent(data))
      }
    }

    loadCohorts();
    loadEvents();
  }, [academy]);

  useEffect(() => {
    const loadFilterCity = async () => {
      let filterCityArray = [{city: 'All Locations', slug: ''}];
      try {
        let response = await session.location;
        if (response) {
          for (let i of session.locations) {
            filterCityArray.push({city: i.city, slug: i.breathecode_location_slug})
          }
          setFilterCity(filterCityArray);
        }
      }
      catch (error) {
        console.error("Something failed", error);
      }
    }
    loadFilterCity();
  }, [session])
  useEffect(() => {
    const loadFilterType = async () => {
      let filterTypeArray = ['courses', 'events'];
      for (let i = 0; i < events.length; i++) {
        if (!filterTypeArray.includes(events[i].event_type.name)) {
          filterTypeArray.push(events[i].event_type.name)
        }
      }
      setFilterType(filterTypeArray);
    }
    loadFilterType();

  }, [events])
  useEffect(() => {
    const filterEvents = async () => {
      if (filterByCity.length > 0) {
        const filteredCohortByCity = cohorts.filter(item => item.slug.includes(filterByCity[0].toLowerCase()))
        if (filteredCohortByCity.length > 0) {
          setFilteredCohorts(filteredCohortByCity)
        }
        else {
          setFilteredCohorts([])
        }
      }
      else {
        setFilteredCohorts([])
      }

    }
    filterEvents();
  }, [filterByCity, filterByType])
  if (!cohorts) return <Row align={`center`}> <Paragraph align="center" fontSize="18px" >"Loading..."</Paragraph></Row>
  return (
    <>
      <WrapperImage

        imageData={yml.header.image && yml.header.image.childImageSharp.fluid}
        border="bottom"
        height="300px"
        bgSize="cover"
        paddingRight={`0`}
        customBorderRadius="0 0 0 1.25rem"
      >
        <Divider height="100px" />
        <Title
          size="5"
          title={yml.header.tagline}
          variant="main"
          color={Colors.white}
          fontSize="46px"
          textAlign="center"
        />
      </WrapperImage>
      <Wrapper


        border="top"
        color={Colors.white}
      >
        <Divider height="50px" />
        <Row marginBottom={`10px`} align={`end`}>
          {/* <Column size="2" alignSelf="center" align="right"> */}
          <a href={`https://www.meetup.com/4Geeks-Academy/`} target="_blank" rel="noopener noreferrer"><Button width="100%" outline color={Colors.blue} textColor={Colors.blue} margin="1rem 0 .2rem 0" padding=".35rem.85rem">Join Our Meetup</Button></a>
          {/* </Column> */}
        </Row>

        <Row
          padding={`10px 20px`}
          background={Colors.lightGray}
          borderRadius={`.5rem`}
          alignItems={`center`}
          customRespSize
          alignResp={`space-between`}
          flexDirection_sm={`column`}
        >
          <Div
            justifyContent={`center`}
            onMouseLeave={() => {
              setTimeout(() => {
                setToggle(false);
                setToggleCity(false);
              }, 500)
            }}
          >
            <Card
              color={`grey`}
              borders={`.5rem`}
            >
              <Button
                display={`flex`}
                alignItems={`center`}
                width="100%"
                onClick={() => {toggle == false ? setToggleCity(!toggleCity) : (setToggleCity(!toggleCity), setToggle(false))}}
                color={Colors.lightGray}
              >
                <Paragraph
                  fontWeight={`500`}
                  fs_xs="18px"
                  fs_sm="18px"
                  fs_md="18px"
                  fs_lg="18px"
                  fs_xl="20px"
                  margin={`0 5px 0 0`}>{filterByCity}</Paragraph>
                <TriangleDown width="16" color={Colors.gray} fill={Colors.gray} />
              </Button>
              {toggleCity &&
                <Row marginBottom="5px" marginTop="3px" marginRight="0" marginLeft="0" width="250px" align="center" position="absolute" zIndex="1000" background={Colors.white} borderRadius=".5rem" shadow>
                  {Array.isArray(filterCity) && filterCity.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        colorHover={Colors.lightBlue}
                        onClick={() => {item.city in filterCity ? null : item.city != "All Locations" ? setAcademy(item.slug) : setAcademy(null), setFilterByCity([item.city]), setToggleCity(!toggleCity)}}
                        // onClick={() => {item.city in filterCity ? null : setFilterByCity([item]), setToggleCity(!toggleCity)}}
                        textColor={Colors.gray}
                        fontSize={"16px"}
                        borderRadius=".5rem" padding="10px"
                      >
                        <Paragraph
                          fontSize="16px"
                          color={Colors.gray} >
                          {item.city}
                        </Paragraph>

                      </Button>
                    )
                  })}
                </Row>
              }
            </Card>
          </Div>
          <Div
            justifyContent={`center`}
            onMouseLeave={() => {
              setTimeout(() => {
                setToggle(false);
                setToggleCity(false);
              }, 500)
            }}
          >
            <Card
              color={`grey`}
              borders={`.5rem`}
            >
              <Button
                display={`flex`}
                alignItems={`center`}
                width="100%"
                onClick={() => {toggleCity == false ? setToggle(!toggle) : (setToggle(!toggle), setToggleCity(false))}}
                color={Colors.lightGray}
              >
                <Paragraph
                  fontWeight={`500`}
                  fs_xs="18px"
                  fs_sm="18px"
                  fs_md="18px"
                  fs_lg="18px"
                  fs_xl="20px"
                  margin={`0 15px 0 0`}>{filterByType}</Paragraph>
                <TriangleDown width="16" color={Colors.gray} fill={Colors.gray} />
              </Button>
              {toggle &&
                <Row marginBottom="5px" marginTop="3px" marginRight="0" marginLeft="0" width="250px" align="center" position="absolute" zIndex="1000" background={Colors.white} borderRadius=".5rem" shadow>
                  {Array.isArray(filterType) && filterType.map((type, index) => {
                    return (
                      <Button
                        key={index}
                        colorHover={Colors.lightBlue}
                        onClick={() => {filterByType.includes(type) ? null : setFilterByType([type]), setToggle(!toggle)}}
                        textColor={Colors.gray}
                        fontSize={"16px"}
                        borderRadius=".5rem" padding="10px"
                      >
                        <Paragraph
                          fontSize="16px"
                          color={Colors.gray} >
                          {type}
                        </Paragraph>
                      </Button>
                    )
                  })}
                </Row>
              }
            </Card>
          </Div>

          {/* ******* */}
          {/* CLEAR FILTERS */}

          {
            // academy != null || filterByType.length > 0
            //   ?
            filterByCity[0] != "Locations"
              || filterByType[0] != "Courses"
              ?
              <Div
                style={{border: "1px solid #0097CE", borderRadius: "5px", width: "max-content"}}
                padding={`5px`}
                margin={`10px 0`}
                justifyContent={`center`}
                alignItems={`center`}
                cursor={`pointer`}
                onClick={() => {
                  setFilterByCity(["Locations"]);
                  setFilterByType(["Courses"]);
                  setFilteredCohorts([]);
                  setAcademy(null);
                }}>

                <Paragraph
                  fs_xs="18px"
                  fs_sm="18px"
                  fs_md="18px"
                  fs_lg="18px"
                  fs_xl="20px"
                  fontWeight={`500`}
                  margin={`0 5px`}
                  cursor={`pointer`}
                  color={Colors.blue}
                >Clear all filters
                </Paragraph>
                <Cross
                  onClick={() => {
                    setFilterByCity(["Locations"]);
                    setFilterByType(["Courses"]);
                    setFilteredCohorts([]);
                    setAcademy(null);
                  }}
                  width="18" color={Colors.blue} fill={Colors.blue} />

              </Div>
              :
              null
          }
        </Row>
      </Wrapper>
      <Wrapper


        border="top"
        background={cohorts.length > 0 ? Colors.lightGray : ""}
      >
        <Row>
          {
            filterByType[0].toLowerCase() === "courses".toLowerCase() ?
              cohorts.length > 0 ?
                cohorts.map((cohort, index) => {
                  return (
                    <>
                      <Column size="4" size_sm="12" key={index} margin="0 0 1rem 0">
                        <Link to={`/${session ? session.language : "us"}/${cohort.certificate.slug}`}>
                          <Card
                            overflow={`hidden`}
                            onMouseOver={() => setSelected(index)}
                            onClick={() => setSelected(index)}
                            h_xs="auto"
                            h_sm="auto"
                            h_md="auto"
                            h_lg="auto"
                            h_xl="auto"
                            width="100%"
                            color={index === selected ? 'grey' : 'white'}
                            shadow
                          >
                            <img src={cohort.academy.logo_url}
                              style={{
                                height: `130px`,
                                width: "100%",
                                objectFit: "cover",
                              }}
                              className={`img-event`}
                            />
                            <Row
                              marginLeft="0"
                              marginRight="0"
                              padding={`15px`}>
                              <Column size="12"
                                onMouseOver={() => setSelected(index)}
                                onMouseOut={() => setSelected()}
                                onClick={() => setSelected(index)}>
                                <Row marginBottom="1rem" >
                                  <H4
                                    fs_xs="18px"
                                    fs_sm="18px"
                                    fs_md="16px"
                                    fs_lg="16px"
                                    fs_xl="20px"
                                  >{cohort.certificate.name}
                                  </H4>
                                </Row>
                                <Row marginBottom=".2rem" alignItems={`center`} >
                                  <Clock width="24" color={Colors.blue} fill={Colors.blue} />
                                  <Paragraph
                                    margin={`0 0 0 10px`}
                                    fs_xs="18px"
                                    fs_sm="18px"
                                    fs_md="9px"
                                    fs_lg="11px"
                                    fs_xl="14px">
                                    {dayjs(cohort.kickoff_date).add(5, "hour").format("ddd, DD MMM YYYY")}
                                  </Paragraph>
                                </Row>
                                <Row marginBottom=".2rem" alignItems={`center`} >
                                  <Marker width="24" color={Colors.blue} fill={Colors.blue} />
                                  <Paragraph
                                    margin={`0 0 0 10px`}
                                    fs_xs="18px"
                                    fs_sm="18px"
                                    fs_md="9px"
                                    fs_lg="11px"
                                    fs_xl="14px">
                                    {cohort.academy.city.name}, {cohort.academy.country.name}
                                  </Paragraph>
                                </Row>
                                <Row height="5%" align="end">
                                  <a href={`#`} target="_blank" rel="noopener noreferrer">
                                    <ArrowRight
                                      width="32"
                                      color={Colors.blue}
                                      fill={Colors.blue} />
                                  </a>
                                </Row>
                              </Column>
                            </Row>
                          </Card>
                        </Link>
                      </Column>
                    </>
                  )
                }) :

                <Paragraph
                  margin={`0 0 0 10px`}
                  fs_xs="18px"
                  fs_sm="18px"
                  fs_md="16px"
                  fs_lg="18px"
                  fs_xl="18px">
                  {academy != null ? "It seems we could not found any result." : "Loading..."}
                </Paragraph>
              :
              events.length ?
                events.map((event, index) => {
                  let eventDate = new Date(event.starting_at)
                  return (
                    <>
                      <Column size="4" size_sm="12" key={index} margin="0 0 1rem 0">
                        <a href={event.url} target="_blank" rel="noopener noreferrer">
                          <Card
                            overflow={`hidden`}
                            h_xs="auto"
                            h_sm="auto"
                            h_md="auto"
                            h_lg="auto"
                            h_xl="auto"
                            width="100%"
                            color={index === selected ? 'grey' : 'white'}

                            shadow
                          >
                            {!event.banner.indexOf("http") ?
                              <StyledBackgroundSection
                                image={data.cohort_img.childImageSharp.fluid}
                                height={`230px`}
                                bgSize={`cover`}
                                className={`img-event`}
                              ></StyledBackgroundSection>
                              :
                              <LazyLoad scroll={true} height={230}>
                                <RoundImage
                                  url={event.banner}
                                  bsize="cover"
                                  mb="10px"
                                  border="1.25rem 1.25rem 0 0"
                                  position="center center"
                                  width="230px"
                                />
                              </LazyLoad>}
                            <Row marginLeft="0" marginRight="0" padding={`15px`}>
                              <Column
                                onMouseOver={() => setSelected(index)}
                                onMouseOut={() => setSelected()}
                                onClick={() => setSelected(index)}
                                size="12" >
                                <Row marginBottom="1rem" align={`center`}>
                                  <Paragraph>{event.event_type.name}</Paragraph>
                                </Row>
                                <Row marginBottom="1.25rem" >
                                  <H4
                                    fs_xs="18px"
                                    fs_sm="18px"
                                    fs_md="16px"
                                    fs_lg="16px"
                                    fs_xl="20px"
                                  >{event.title}
                                  </H4>
                                </Row>
                                <Row marginBottom=".2rem" alignItems={`center`} >
                                  <Clock width="24" color={Colors.blue} fill={Colors.blue} />
                                  <Paragraph
                                    margin={`0 0 0 10px`}
                                    fs_xs="18px"
                                    fs_sm="18px"
                                    fs_md="9px"
                                    fs_lg="11px"
                                    fs_xl="14px">
                                    {days[eventDate.getDay()]}, {eventDate.getDate()} {months[eventDate.getMonth()]} {eventDate.getFullYear()}
                                  </Paragraph>
                                </Row>
                                <Row marginBottom="1.25rem" alignItems={`center`} >
                                  <Marker width="24" color={Colors.blue} fill={Colors.blue} />
                                  <Paragraph
                                    margin={`0 0 0 10px`}
                                    fs_xs="18px"
                                    fs_sm="18px"
                                    fs_md="12px"
                                    fs_lg="14px"
                                    fs_xl="16px">
                                    {event.academy.name}
                                  </Paragraph>
                                </Row>
                                <Row marginBottom=".2rem" alignItems={`center`} >
                                  <H3
                                    fs_xs="18px"
                                    fs_sm="18px"
                                    fs_md="16px"
                                    fs_lg="14px"
                                    fs_xl="16px"
                                  >Description:
                            </H3>
                                  <Paragraph
                                    margin={`10px 0 0 0`}
                                    fs_xs="18px"
                                    fs_sm="18px"
                                    fs_md="12px"
                                    fs_lg="14px"
                                    fs_xl="16px">
                                    {event.exerpt}
                                  </Paragraph>
                                </Row>
                                <Row height="5%" align="end">
                                  <a href={event.url} target="_blank" rel="noopener noreferrer">
                                    <ArrowRight
                                      width="32"
                                      color={Colors.blue}
                                      fill={Colors.blue} />
                                  </a>
                                </Row>
                              </Column>
                            </Row>
                          </Card>
                        </a>
                      </Column>
                    </>
                  )
                }) : <Paragraph
                  margin={`0 0 0 10px`}
                  fs_xs="18px"
                  fs_sm="18px"
                  fs_md="16px"
                  fs_lg="18px"
                  fs_xl="18px">
                  It seems we could not found any result.
                </Paragraph>

          }
        </Row>
      </Wrapper>

      <Divider height="50px" />

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
          header{
            tagline
            sub_heading
            image{
              childImageSharp {
                fluid(maxWidth: 1500){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            } 
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
    cohort_img: file(relativePath: { eq: "images/events-alt.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
export default BaseRender(Calendar);