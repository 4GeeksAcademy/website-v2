import React, {useState, useEffect} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H2, H3, H4, H5, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button, RoundImage, Address, Marker, Clock, Question, Filter} from '../components/Styling'
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

const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 100vh;
`;

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

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

const Events = ({data, pageContext, yml}) => {
  console.log("jo", yml);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [event, setEvent] = useState([]);
  const [single, setSingle] = useState();
  const [test, setTest] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState();
  const [toggleCity, setToggleCity] = useState();
  const [togglesCity, setTogglesCity] = useState();
  const [toggle, setToggle] = useState();
  const [toggles, setToggles] = useState();
  const [filterType, setFilterType] = useState();
  const [filterCity, setFilterCity] = useState();
  const [cities, setCities] = useState([]);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const loadFilterType = async () => {
      let filterCityArray = [];
      let filterTypeArray = [];
      for (let i = 0; i < event.length; i++) {
        if (filterTypeArray.includes(event[i].type)) {
          console.log("####", event[i].type)
        }
        else {
          filterTypeArray.push(event[i].type)
        }
        if (filterCityArray.includes(event[i].city_slug)) {
          console.log("####", event[i].city_slug)
        }
        else {
          filterCityArray.push(event[i].city_slug)
        }
      }
      setFilterType(filterTypeArray);
      setFilterCity(filterCityArray);
    }
    loadFilterType();

  }, [event])

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
  useEffect(() => {
    const loadModal = async () => {
      let prova = event.filter((item, index) => index === single)
      setTest(prova)

    }
    loadModal();
  }, [single]);
  return (
    <>
      <Wrapper
        style="default"
        image="yes"
        url={yml.banner.image}
        border="bottom"
        height="700px"
        backgroundSize="cover"
      >
        <Divider height="300px" />
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
            <Row >
              <Column size="3" >
                {/* <Button width="100%" aria-controls="simple-menu" aria-haspopup="true" color={Colors.lightGray} onClick={handleClick} textColor={Colors.gray} margin="1rem 0 2rem 0" padding=".35rem.85rem">
                  Campuses
                </Button> */}

                <Button width="100%" onClick={() => toggle == false ? setToggleCity(!toggleCity) : (setToggleCity(!toggleCity), setToggle(false))} color={Colors.lightGray} textColor={Colors.gray} margin="1rem 0 .2rem 0" padding=".35rem.85rem">Campuses</Button>
                {/* <Button width="100%" onClick={handleClick} color={Colors.blue} textColor={Colors.white}>Campuses</Button> */}
                {toggleCity == true
                  ?
                  <Row marginBottom="5px" marginRight="0" marginLeft="0" align="center">
                    <>
                      {filterCity.map((item, index) => {
                        return (
                          <Button width="95%" textColor={Colors.gray} borderRadius=".25rem" padding="0">
                            <Card index="1" borders=".25rem" margin="2px 0" width="100%" padding={togglesCity === false && "0px"}>
                              <Link to="#">
                                <Row height="25px" onClick={() => {setProgram(item), setTogglesCity(!togglesCity)}} backgroundHover={Colors.lightBlue} colorHover={Colors.white} key={index} marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" align="around">
                                  <Column size="12" alignSelf="center"><Paragraph fontSize="16px" color={Colors.gray} >{item}</Paragraph></Column>
                                </Row>
                              </Link>
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
                <Button width="100%" onClick={() => toggleCity == false ? setToggle(!toggle) : (setToggle(!toggle), setToggleCity(false))} color={Colors.lightGray} textColor={Colors.gray} margin="1rem 0 .2rem 0" padding=".35rem.85rem">Event's Type</Button>
                {toggle == true
                  ?
                  <Row marginBottom="5px" marginRight="0" marginLeft="0" align="center" >
                    <>
                      {filterType.map((item, index) => {
                        return (
                          <Button width="95%" textColor={Colors.gray} borderRadius=".25rem" padding="0">
                            <Card index="1" borders=".25rem" margin="2px 0" width="100%" padding={toggles === false && "0px"}>
                              <Link to="#">
                                <Row height="25px" onClick={() => {setProgram(item), setToggles(!toggles)}} backgroundHover={Colors.lightBlue} colorHover={Colors.white} key={index} marginBottom="5px" marginTop="5px" marginRight="0" marginLeft="0" align="around">
                                  <Column size="12" alignSelf="center"><Paragraph fontSize="16px" color={Colors.gray} >{item}</Paragraph></Column>
                                </Row>
                              </Link>
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

              </Column>
              <Column size="3" alignSelf="center" align="right">
                <Filter width="24" color={Colors.blue} fill={Colors.blue} />
              </Column> */}
            </Row>
          </Column>
        </Row>
      </Wrapper>
      <Divider height="200px" />
      <Wrapper
        style="default"
        image="no"
        border="top"
        color={Colors.lightGray}
      >


        <Row>
          {event && event.map((i, index) => {
            let date = new Date(i.event_date)
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
                              fs_md="18px"
                              fs_lg="18px"
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
                            <a href={i.url} target="_blank">
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
          })}
        </Row>
      </Wrapper>
      <Divider height="50px" />

      {test.length > 0 ?
        <Modal
          className="test-prova"
          disableScrollLock={true}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          {/* <div style={modalStyle} className={classes.paper}> */}
          <Card
            style={modalStyle} className={classes.paper}
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
              url={`${test[0].banner_url.includes('placehold') || test[0].banner_url.includes('hola') || test[0].banner_url == "" ? '/images/events-alt.jpg' : test[0].banner_url}`}
              bsize="cover"
              mb="10px"
              border="1.25rem 1.25rem 0 0"
              position="center center"
              h_xs="250px"
              h_sm="250px"
              h_md="250px"
              h_lg="250px"
              h_xl="250px"
            />
            <Row marginLeft="0" marginRight="0">
              <Column size="12">
                <Row marginBottom="1rem" >
                  <Column size="12">
                    <Paragraph>{test[0].type}</Paragraph>
                  </Column>
                </Row>
                <Row marginBottom="1rem" height="40px">
                  <Column size="12">
                    <H4
                      fs_xs="18px"
                      fs_sm="18px"
                      fs_md="18px"
                      fs_lg="18px"
                      fs_xl="18px"
                    >{test[0].title}
                    </H4>
                  </Column>
                </Row>
                <Row marginBottom=".2rem" >
                  <Column size="12">
                    <Paragraph><Clock width="24" color={Colors.blue} fill={Colors.blue} />{test[0].event_date}</Paragraph>
                  </Column>
                </Row>
                <Row marginBottom=".2rem" >
                  <Column size="12">
                    <Paragraph><Marker width="24" color={Colors.blue} fill={Colors.blue} />{test[0].city_slug}</Paragraph>
                  </Column>
                </Row>
                <Row marginBottom=".2rem" >
                  <Column size="12">
                    <Paragraph onClick={handleOpen}><Question width="24" color={Colors.blue} fill={Colors.blue} />{test[0].address}</Paragraph>
                  </Column>
                </Row>
                <Row>
                  <Column size="12">

                    <div className="single-event" dangerouslySetInnerHTML={{__html: test[0].description}}></div>
                  </Column>
                </Row>
                <Row marginBottom=".2rem" align="center">
                  {/* <Column size="6" align="center">
                  <a href="#">
                    <Button outline width="100%" color={Colors.gray} textColor={Colors.black} margin="2rem 0" padding=".35rem.85rem">Join Our Community</Button>
                  </a>
                </Column> */}
                  <Column size="6" align="center">
                    <a href="#" target="_blank">
                      <Button width="100%" color={Colors.red} textColor={Colors.white} margin="2rem 0" padding=".35rem.85rem">Register Now</Button>
                    </a>
                  </Column>
                </Row>

              </Column>
            </Row>


          </Card>
          {/* </div> */}
        </Modal> : null}

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