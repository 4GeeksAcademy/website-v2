import React, {useState, useEffect, useContext} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H2, H3, H4, H5, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button, RoundImage, Address, Marker, Clock, Question, Filter, Cross, AngleDown, TriangleDown} from '../components/Styling'
import {Card} from '../components/Card'
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import BaseRender from './_baseRender'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'gatsby-link'
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
function getModalStyle () {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${5}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${0}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    overflow: 'scroll',
    width: 600,
    height: '90%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '1.25rem',
    border: 'none',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),

  },
}));

const Calendar = (props) => {
  const {data, pageContext, yml} = props;
  const {session, setSession} = useContext(SessionContext);

  const [cohorts, setCohorts] = useState([]);
  const [events, setEvent] = useState([]);
  const [single, setSingle] = useState()
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredCohorts, setFilteredCohorts] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [toggleCity, setToggleCity] = useState();
  const [togglesCity, setTogglesCity] = useState();
  const [toggle, setToggle] = useState();
  const [toggles, setToggles] = useState();
  const [filterType, setFilterType] = useState();
  const [filterCity, setFilterCity] = useState();
  const [filters, setFilters] = useState({
    cityFilter: [],
    typeFilter: []
  })
  const [filterByCity, setFilterByCity] = useState([]);
  const [filterByType, setFilterByType] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const loadCohorts = async () => {
      fetch(
        'https://api.breatheco.de/cohorts/',
      )
        .then(response => response.json())
        .then(data => {
          let today = new Date();
          let newCohortsArray = data.data.filter((item) => new Date(item.kickoff_date).getTime() >= today.getTime())
          setCohorts(newCohortsArray)
        })
    }
    loadCohorts();
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      await fetch(
        // 'https://assets.breatheco.de/apis/event/all',
        'https://breathecode.herokuapp.com/v1/events/',
      )
        .then(response => response.json())
        .then(data => setEvent(data))
      // .then(data => {
      //   let today = new Date();
      //   let newEventsArray = data.filter((item) => new Date(item.event_date).getTime() >= today.getTime())
      //   setEvent(newEventsArray)
      // })
    }
    loadEvents();
  }, []);

  useEffect(() => {
    const filterEvents = async () => {
      let filteredEventsArray = []
      let filteredCohortsArray = []
      console.log("filteredEventsArray", filteredEventsArray)
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



  useEffect(() => {
    const mergeEventsAndCohorts = async () => {
      let mergeArrays = await [...cohorts, ...events]
    }
    mergeEventsAndCohorts();
  }, [cohorts, events])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadFilterCity = async () => {
      let filterCityArray = ['All'];
      try {
        let response = await session.location;
        if (response) {
          for (let i of session.locations) {
            if (!filterCityArray.includes(i.city)) {
              filterCityArray.push(i.city)
            }
          }
          setFilterCity(filterCityArray);
        }
      }
      catch (error) {
        console.log("something failed");
        console.log(error);
      }
    }
    loadFilterCity();
  }, [session])

  useEffect(() => {
    const loadFilterType = async () => {
      let filterTypeArray = ['All', 'courses'];
      for (let i = 0; i < events.length; i++) {
        if (!filterTypeArray.includes(events[i].type)) {
          filterTypeArray.push(events[i].type)
        }
      }
      setFilterType(filterTypeArray);
    }
    loadFilterType();

  }, [events])

  const handleFilterTest = (filters) => {
    console.log("FILTERS: ", filters)
    var filteredCohortsByCity = cohorts.filter(item => filters.includes(item))
    return filteredCohortsByCity;
    // var test2 = [];
    // for (let i of filters) {
    //   var test = cohorts.filter(item => item.location_slug.includes(i))
    // }
    // var test3 = test2.concat(test)
    // console.log("TEST: ", test3)
    // return test3;
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  // useEffect(() => {
  //   const handleFilter = async (filters) => {
  //     console.log("FILTERS: ", filters)
  //     var filteredCohortsByCity = await cohorts.filter(item => filters.includes(item))
  //     return filteredCohortsByCity;
  //   }
  //   handleFilter(filterByCity)
  // }, [cohorts])
  // useEffect(() => {
  //   handleFilter(filterByCity)
  // }, [filterByCity])




  // useEffect(() => {
  //   try {
  //     let response = await session.location;
  //     if (response) {
  //       var city = await response.city;
  //     } else if (response.city == undefined) {
  //       alert("no city found!!");
  //     }
  //   } catch (error) {
  //     console.log("something failed");
  //     console.log(error);
  //   }
  //   const loadFutureCohorts = async () => {
  //     let today = new Date();
  //     let newCohortsArray = cohorts.filter((item) => new Date(item.kickoff_date).getTime() >= today.getTime())
  //     setFutureCohorts(newCohortsArray)
  //   }
  //   loadFutureCohorts();

  // }, [cohorts])


  // useEffect(() => {
  //   const loadModal = async () => {
  //     let prova = event.filter((item, index) => index === single)
  //     setTest(prova)

  //   }
  //   loadModal();
  // }, []);

  return (
    <>
      <Wrapper
        style="default"
        image={yml.header.image}
        border="bottom"
        height="700px"
        backgroundSize="cover"
      >
        <Divider height="300px" />
        <Title
          size="5"
          title={yml.header.tagline}
          main
          color={Colors.white}
          fontSize="46px"
          textAlign="center"
        />
      </Wrapper>
      <Wrapper
        style="default"

        border="top"
        color={Colors.white}
      >
        <Divider height="50px" />
        <Row align="around">
          <Column size="10" alignSelf="center">
            <H4

              fs_xs="30px"
              fs_sm="30px"
              fs_md="30px"
              fs_lg="30px"
              fs_xl="30px"
            >Our Events</H4>
          </Column>
          <Column size="2" alignSelf="center" align="right">
            <Button width="100%" outline color={Colors.blue} textColor={Colors.blue} margin="1rem 0 .2rem 0" padding=".35rem.85rem">Join Our Meetup</Button>
          </Column>
        </Row>
        <Row>
          <Separator primary />
        </Row>
        <Row>
          <Column size="12">
            <Row>
              {filterByCity.length > 0 || filterByType.length > 0
                ?
                <Column size="2" margin="5px 0" align="center">
                  <Card

                    color="darkGray"
                    padding="5px 5px"
                    borders=".2rem"
                    margin="5px 3px"
                    w_xs="20px"
                  >
                    <Paragraph>Clear all filters
                  <span onClick={() => {
                        setFilterByCity([]);
                        setFilterByType([]);
                        setFilteredCohorts([]);
                      }}
                      >
                        <Cross width="16" color={Colors.blue} fill={Colors.blue} />
                      </span>
                    </Paragraph>
                  </Card>
                </Column>
                :
                null
              }
            </Row>

          </Column>
        </Row>
        <Row>
          <Column size="12" margin="5px 0">
            <Row>
              {filterByCity.length > 0
                ? filterByCity.map((filterItem, i) => {
                  return (
                    // <Column size="2" key={i} >
                    <Column size="12" key={i}>
                      <Paragraph>
                        <span onClick={() => setFilterByCity(filterByCity.filter(item => item != filterItem))}>
                          {filterItem}<Cross width="16" color={Colors.blue} fill={Colors.blue} />
                        </span>
                      </Paragraph>
                    </Column>
                  )
                })
                : null}
            </Row>
          </Column>
        </Row>
        <Row>
          <Column size="12" margin="5px 0">
            <Row>
              {filterByType.length > 0
                ? filterByType.map((filterItem, i) => {
                  return (
                    // <Column size="2" key={i} >
                    <Column size="12" key={i}>
                      <Paragraph>
                        <span onClick={() => setFilterByType(filterByType.filter(item => item != filterItem))}>
                          {filterItem}<Cross width="16" color={Colors.blue} fill={Colors.blue} />
                        </span>
                      </Paragraph>
                    </Column>
                  )
                })
                : null}
            </Row>
          </Column>
        </Row>
        <Row>
          <Column size="12">
            <Row >
              <Column size="3" >
                {/* <Button width="100%" aria-controls="simple-menu" aria-haspopup="true" color={Colors.lightGray} onClick={handleClick} textColor={Colors.gray} margin="1rem 0 2rem 0" padding=".35rem.85rem">
                  Campuses
                </Button> */}

                <Button
                  width="90%"
                  borderRadius=".25rem"
                  color={Colors.lightGray}
                  textColor={Colors.gray}
                  margin="0"
                  padding=".35rem.85rem"
                  onClick={() => toggle == false ? setToggleCity(!toggleCity) : (setToggleCity(!toggleCity), setToggle(false))}
                >
                  Campuses
                  <span>
                    <TriangleDown width="12" color={Colors.blue} fill={Colors.blue} />
                  </span>
                </Button>
                {/* <Button width="100%" onClick={handleClick} color={Colors.blue} textColor={Colors.white}>Campuses</Button> */}
                {toggleCity == true
                  ?
                  <Row marginBottom="5px" width="200px" marginRight="0" marginLeft="0" align="center" position="absolute" zIndex="1000" background={Colors.white} borderRadius="0 0 .25rem .25rem">
                    <>
                      {filterCity.map((city, index) => {
                        return (
                          <Button width="95%" textColor={Colors.gray} borderRadius=".25rem" padding="0">
                            <Card index="1" borders=".25rem" margin="2px 0" width="100%" padding={togglesCity === false && "0px"}>
                              <Row height="25px"
                                onClick={() => {setTogglesCity(!togglesCity)}}
                                backgroundHover={Colors.lightBlue}
                                colorHover={Colors.white} key={index}
                                marginBottom="5px"
                                marginTop="5px"
                                marginRight="0"
                                marginLeft="0"
                                align="around">
                                <Column size="12" alignSelf="center">
                                  <Paragraph
                                    // onClick={() => {Object.values(filters).indexOf(city) ? null : setFilters({...filters, cityFilter: [...cityFilter, city]}), setToggleCity(!toggleCity)}}
                                    onClick={() => {filterByCity.includes(city) ? null : setFilterByCity([city]), setToggleCity(!toggleCity)}}
                                    fontSize="16px" color={Colors.gray} >{city}
                                  </Paragraph>
                                </Column>
                              </Row>
                            </Card>
                          </Button>
                        )
                      })}
                    </>
                  </Row>

                  :
                  null
                }

              </Column>

              <Column size="3" >
                <Button
                  width="90%"
                  borderRadius=".25rem"
                  color={Colors.lightGray}
                  textColor={Colors.gray}
                  margin="0"
                  padding=".35rem.85rem"
                  onClick={() => toggleCity == false ? setToggle(!toggle) : (setToggle(!toggle), setToggleCity(false))}
                >
                  Event's Type
                  <span>
                    <TriangleDown width="12" color={Colors.blue} fill={Colors.blue} />
                  </span>
                </Button>
                {toggle == true
                  ?
                  <Row marginBottom="5px" width="200px" marginRight="0" marginLeft="0" align="center" position="absolute" zIndex="1000" background={Colors.white} borderRadius="0 0 .25rem .25rem">
                    <>
                      {filterType.map((type, index) => {
                        return (
                          <Button width="95%" textColor={Colors.gray} borderRadius=".25rem" padding="0">
                            <Card index="1" borders=".25rem" margin="2px 0" width="100%" padding={toggles === false && "0px"}>
                              <Row height="25px" onClick={() => {setToggles(!toggles)}} backgroundHover={Colors.lightBlue} colorHover={Colors.white} key={index} marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" align="around">
                                <Column size="12" alignSelf="center">
                                  <Paragraph
                                    onClick={() => {filterByType.includes(type) ? null : setFilterByType([type]), setToggle(!toggle)}}
                                    fontSize="16px"
                                    color={Colors.gray} >
                                    {type}
                                  </Paragraph>
                                </Column>
                              </Row>
                            </Card>
                          </Button>
                        )
                      })}
                    </>
                  </Row>

                  :
                  null
                }
              </Column>
              {/* <Column size="3">
                <Row>
                  {filterByCity.length > 0
                    ? filterByCity.map((filterItem, i) => {
                      return (
                        <Column size="12" key={i} >
                          {filterItem}
                          <span onClick={() => setFilterByCity(filterByCity.filter(item => item != filterItem))}><Cross width="16" color={Colors.blue} fill={Colors.blue} /></span>
                        </Column>
                      )
                    })
                    : null}
                </Row>
              </Column> */}

              {/* <Column size="3">

              </Column>
              <Column size="3" alignSelf="center" align="right">
                <Filter width="24" color={Colors.blue} fill={Colors.blue} />
              </Column> */}
              {/* <Column size="6">
                <Row>
                  {filter.length > 0
                    ? filter.map((filterItem, i) => {
                      return (
                        <Column size="12" key={i} >
                          {filterItem}
                          <span onClick={() => setFilter(filter.filter(item => item != filterItem))}><Cross width="16" color={Colors.blue} fill={Colors.blue} /></span>
                        </Column>
                      )
                    })
                    : null}
                </Row>
              </Column> */}
            </Row>
          </Column>
        </Row>
      </Wrapper>
      <Divider height="200px" />
      <Wrapper
        style="default"

        border="top"
        color={Colors.lightGray}
      >
        <Row>
          {events.length > 0 &&
            filterByType[0] !== 'courses' ?
            events.map((i, index) => {
              let date = new Date(i.event_date)

              return (
                <>
                  <Column size="4" key={index} margin="0 0 1rem 0">test
                    {/* <Card
                      move="up"
                      up="30%"
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
                        url={`${i.banner_url.includes('placehold') || i.banner_url.includes('hola') || i.banner_url == "" ? '/images/events-alt.jpg' : i.banner_url}`}
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
                                fs_md="16px"
                                fs_lg="16px"
                                fs_xl="18px"
                              >{i.title}
                              </H4>
                            </Column>
                          </Row>
                          <Row marginBottom=".2rem" >
                            <Column size="12">
                              <Paragraph><Clock width="24" color={Colors.blue} fill={Colors.blue} />{days[date.getDay()]}, {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Paragraph>
                            </Column>
                          </Row>
                          <Row marginBottom=".2rem" >
                            <Column size="12">
                              <Paragraph><Marker width="24" color={Colors.blue} fill={Colors.blue} />{i.city_slug}</Paragraph>
                            </Column>
                          </Row>
                          <Row marginBottom=".2rem" >
                            <Column size="12">
                              <Paragraph onClick={() => {setOpen(!open), setSingle(index)}} cursor="pointer"><Question width="24" color={Colors.blue} fill={Colors.blue} />info</Paragraph>
                            </Column>
                          </Row>
                          <Row marginBottom=".2rem" >
                            <Column size="6" align="center">
                              <a href={i.url}>
                                <Button outline width="100%" color={Colors.gray} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">Join Our Community</Button>
                              </a>
                            </Column>
                            <Column size="6" align="center">
                              <a href={i.url} target="_blank" rel="noopener noreferrer">
                                <Button outline width="100%" color={Colors.red} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">Register Now</Button>
                              </a>
                            </Column>
                          </Row>

                        </Column>
                      </Row>




                    </Card> */}
                  </Column>
                </>

              )
            })
            :
            filteredCohorts.length > 0 ?
              filteredCohorts.map((cohort, index) => {
                let cohortDate = new Date(cohort.kickoff_date)
                return (
                  <>
                    <Column size="4" key={index} margin="0 0 1rem 0">
                      <Card
                        move="up"
                        up="30%"
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
                          url={`/images/events-alt.jpg`}
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
                                <Paragraph>{cohort.profile_slug}</Paragraph>
                              </Column>
                            </Row>
                            <Row marginBottom="1rem" height="70px">
                              <Column size="12">
                                <H4
                                  fs_xs="18px"
                                  fs_sm="18px"
                                  fs_md="16px"
                                  fs_lg="16px"
                                  fs_xl="18px"
                                >{cohort.profile.name}
                                </H4>
                              </Column>
                            </Row>
                            <Row marginBottom=".2rem" >
                              <Column size="12">
                                <Paragraph><Clock width="24" color={Colors.blue} fill={Colors.blue} />{days[cohortDate.getDay()]}, {cohortDate.getDate()} {months[cohortDate.getMonth()]} {cohortDate.getFullYear()}</Paragraph>
                              </Column>
                            </Row>
                            <Row marginBottom=".2rem" >
                              <Column size="12">
                                <Paragraph><Marker width="24" color={Colors.blue} fill={Colors.blue} />{cohort.name}</Paragraph>
                              </Column>
                            </Row>
                            <Row marginBottom=".2rem" >
                              <Column size="12">
                                <Paragraph onClick={() => {setOpen(!open), setSingle(index)}} cursor="pointer"><Question width="24" color={Colors.blue} fill={Colors.blue} />info</Paragraph>
                              </Column>
                            </Row>
                            <Row marginBottom=".2rem" >
                              <Column size="6" align="center">
                                <a href={"i.url"}>
                                  <Button outline width="100%" color={Colors.gray} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">Join Our Community</Button>
                                </a>
                              </Column>
                              <Column size="6" align="center">
                                <a href={"i.url"} target="_blank" rel="noopener noreferrer">
                                  <Button outline width="100%" color={Colors.red} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">Register Now</Button>
                                </a>
                              </Column>
                            </Row>

                          </Column>
                        </Row>




                      </Card>
                    </Column>
                  </>
                )
              }) :
              cohorts.map((cohort, index) => {
                let cohortDate = new Date(cohort.kickoff_date)
                return (
                  <>
                    <Column size="4" key={index} margin="0 0 1rem 0">
                      <Card
                        move="up"
                        up="30%"
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
                          url={`/images/events-alt.jpg`}
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
                                <Paragraph>{cohort.profile_slug}</Paragraph>
                              </Column>
                            </Row>
                            <Row marginBottom="1rem" height="70px">
                              <Column size="12">
                                <H4
                                  fs_xs="18px"
                                  fs_sm="18px"
                                  fs_md="16px"
                                  fs_lg="16px"
                                  fs_xl="18px"
                                >{cohort.profile.name}
                                </H4>
                              </Column>
                            </Row>
                            <Row marginBottom=".2rem" >
                              <Column size="12">
                                <Paragraph><Clock width="24" color={Colors.blue} fill={Colors.blue} />{days[cohortDate.getDay()]}, {cohortDate.getDate()} {months[cohortDate.getMonth()]} {cohortDate.getFullYear()}</Paragraph>
                              </Column>
                            </Row>
                            <Row marginBottom=".2rem" >
                              <Column size="12">
                                <Paragraph><Marker width="24" color={Colors.blue} fill={Colors.blue} />{cohort.name}</Paragraph>
                              </Column>
                            </Row>
                            <Row marginBottom=".2rem" >
                              <Column size="12">
                                <Paragraph onClick={() => {setOpen(!open), setSingle(index)}} cursor="pointer"><Question width="24" color={Colors.blue} fill={Colors.blue} />info</Paragraph>
                              </Column>
                            </Row>
                            <Row marginBottom=".2rem" >
                              <Column size="6" align="center">
                                <a href={"i.url"}>
                                  <Button outline width="100%" color={Colors.gray} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">Join Our Community</Button>
                                </a>
                              </Column>
                              <Column size="6" align="center">
                                <a href={"i.url"} target="_blank" rel="noopener noreferrer">
                                  <Button outline width="100%" color={Colors.red} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">Register Now</Button>
                                </a>
                              </Column>
                            </Row>

                          </Column>
                        </Row>




                      </Card>
                    </Column>
                  </>
                )
              })
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
                fluid(maxWidth: 800){
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
  }
`;
export default BaseRender(Calendar);