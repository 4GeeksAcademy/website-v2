import React, {useState, useEffect, useContext} from 'react';
import {Row, Column, Wrapper, Header, Divider, Div, GridContainer} from '../new_components/Sections'
import {H2, H3, H4, H5, Title, Separator, Paragraph} from '../new_components/Heading'
import {Colors, Button, Img, Anchor} from '../new_components/Styling'
import Icon from '../new_components/Icon'
import Select from '../new_components/Select'
import UpcomingDates from '../new_components/UpcomingDates'
import Card from '../components/Card'
import {ZoomOut} from "../components/Animations"
import BaseRender from './_baseLayout'
import dayjs from "dayjs"
import 'dayjs/locale/de'
import LazyLoad from 'react-lazyload';
import {Link} from 'gatsby'
import {Circle} from '../new_components/BackgroundDrawing'
import {SessionContext} from '../session'


const info = {
  us: {
    "full-stack": "/us/coding-bootcamps/part-time-full-stack-developer",
    "software-engineering": "/us/coding-bootcamps/software-engineer-bootcamp",
    "machine-learning-pt-16w": "/us/coding-bootcamps/machine-learning-engineering",
    "full-stack-ft": "/us/coding-bootcamps/full-time-full-stack-developer"
  },
  es: {
    "full-stack": "/es/coding-bootcamps/full-stack-part-time",
    "software-engineering": "/es/coding-bootcamps/ingenieria-de-software-programacion",
    "machine-learning-pt-16w": "/es/coding-bootcamps/curso-inteligencia-artificial",
    "full-stack-ft": "/es/coding-bootcamps/full-stack-full-time"
  }
}
const locations = {
  us: {
    "santiago-chile": "/us/coding-campus/coding-bootcamp-santiago",
    "downtown-miami": "/us/coding-campus/coding-bootcamp-miami",
    "madrid-spain": "/us/coding-campus/coding-bootcamp-madrid",
    "online": "/us/coding-campus/online-coding-bootcamp",
    "caracas-venezuela": "/us/coding-campus/coding-bootcamp-caracas",
    "costa-rica": "/us/coding-campus/coding-bootcamp-costa-rica"
  },
  es: {
    "downtown-miami": "/es/coding-campus/bootcamp-programacion-miami",
    "santiago-chile": "/es/coding-campus/bootcamp-programacion-santiago",
    "madrid-spain": "/es/coding-campus/bootcamp-programacion-madrid",
    "online": "/es/coding-campus/online-bootcamp-programacion",
    "caracas-venezuela": "/es/coding-campus/bootcamp-programacion-caracas",
    "costa-rica": "/es/coding-campus/bootcamp-programacion-costa-rica"
  }
}
const locationText = {
  us: "or",
  es: "o"
}

const dateText = {
  us: "to",
  es: "al"
}
const Calendar = (props) => {
  const {pageContext, yml, data} = props;
  const [limit, setLimit] = useState(true);
  const {session} = useContext(SessionContext);
  const [backgroundSize, setBackgroundSize] = useState("100%");
  const [datas, setData] = useState({
    events: {catalog: [], all: [], filtered: []},
    cohorts: {catalog: [], all: [], filtered: []}
  });
  let content = data.allPageYaml.edges[0].node
  const [academy, setAcademy] = useState(null)
  const [filterType, setFilterType] = useState(pageContext.lang == "us" ? {label: "Upcoming Courses and Events", value: "cohorts"} : {label: "Próximos Cursos y Eventos", value: "cohorts"});

  useEffect(() => {
    const getData = async () => {
      let resp = await fetch(`${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true`);
      // let resp = await fetch(`https://breathecode.herokuapp.com/v1/admissions/cohort/all?upcoming=true`);
      let cohorts = await resp.json();
      let resp2 = await fetch(`${process.env.GATSBY_BREATHECODE_HOST}/events/all`);
      // let resp2 = await fetch(`https://breathecode.herokuapp.com/v1/events/all`);
      let events = await resp2.json();
      let _types = []
      for (let i = 0; i < events.length; i++) {
        if (events[i].event_type && !_types.includes(events[i].event_type.name)) {
          _types.push({label: events[i].event_type.name, value: events[i].event_type.name})
        }
      }
      setData(oldData => ({
        events: {catalog: _types, all: events, filtered: events},
        cohorts: {catalog: oldData.cohorts.catalog, all: cohorts, filtered: cohorts}
      }))
    }
    getData();
  }, []);
  useEffect(() => {
    if (session && Array.isArray(session.locations)) {
      const _data = {
        ...datas,
        cohorts: {
          ...datas.cohorts,
          catalog: [{label: 'All Locations', value: null}].concat(
            session.locations.map(l => ({label: l.city, value: l.breathecode_location_slug}))
          )
        }
      }
      setData(_data);
    }
  }, [session]);
  return (
    <>
      <Header
        seo_title={yml.seo_title}
        title={yml.header.title}
        background={Colors.veryLightBlue}
        position="relative"
        height="240px"
        margin="120px 0 0 0 "

      >
        <Circle color="yellow" width="17px" height="17px" top="30px" left="74px" zIndex="1" display="none" display_tablet="inline" opacity="0.2" />
        <Circle color="black" width="17px" height="17px" top="122px" left="106px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="black" width="17px" height="17px" top="65px" left="74px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="87px" left="106px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="122px" left="74px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="165px" left="74px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="165px" left="106px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="blue" width="53px" height="53px" top="63px" right="61px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" top="200px" left="106px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="red" width="27px" height="27px" top="27px" left="252px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" bottom="56px" right="37px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="black" width="17px" height="17px" bottom="56px" right="76px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="grey" width="17px" height="17px" bottom="56px" right="115px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="yellow" width="21px" height="21px" top="44px" right="287px" zIndex="1" display="none" display_tablet="inline" />
        <Circle color="blue" width="57px" height="57px" top="32px" right="61px" display="none" display_tablet="inline" />
        <Circle color="red" width="25px" height="25px" top="60px" right="30px" display="inline" display_tablet="none" />
        <Div flexDirection_tablet="row" flexDirection="column" justifyContent="center" alignItems="center" margin_tablet="0 0 50px 0"></Div>
      </Header>

      <GridContainer padding_tablet="0" margin="65px 0 65px 0" margin_tablet="65px 0 65px 0">
        <Div flexDirection="column">
          <Div padding="0 0 30px 0" style={{borderBottom: "1px solid black"}} justifyContent_md="between" flexDirection="column" flexDirection_tablet="row" alignItems_tablet="center">
            <H3 textAlign="left" width="188px">{yml.cohorts.title}</H3>
            {/* <Button outline width="100%" width_md="314px" color={Colors.black} margin="19px 0 10px 0" textColor="white">APPLY NOW</Button> */}
            <Select
              // margin="0 10px 0 0"
              top="40px"
              left="20px"
              width="300px"
              maxWidth="100%"
              shadow="0px 0px 6px 2px rgba(0, 0, 0, 0.2)"
              options={datas.cohorts.catalog}
              openLabel={pageContext.lang == "us" ? academy ? "Campus: " + academy.label : "Select one academy" : academy ? "Campus: " + academy.label : "Escoge una academia"}
              closeLabel={pageContext.lang == "us" ? academy ? "Campus: " + academy.label : "Select one academy" : academy ? "Campus: " + academy.label : "Escoge una academia"}
              onSelect={(opt) => {
                setAcademy(opt)
                setData({
                  ...datas,
                  [filterType.value]: {
                    ...datas[filterType.value],
                    filtered: opt.label !== 'All Locations' ? datas[filterType.value].all.filter(elm => elm.academy.slug === opt.value) : datas[filterType.value].all
                  }
                });
              }}
            />
          </Div>
          {Array.isArray(datas.cohorts.filtered) && datas.cohorts.filtered.map((m, i) => {
            return (
              i < 4 &&
              <Div key={i} flexDirection="column" flexDirection_tablet="row" style={{borderBottom: "1px solid black"}} padding="30px 0" justifyContent="between" >
                <Div flexDirection_tablet="column" width_tablet="15%" alignItems="center" alignItems_tablet="start" margin="0 0 10px 0">
                  <H4 textAlign="left" textTransform="uppercase" width="fit-content" margin="0 10px 0 0" fontWeight="700" lineHeight="22px">{dayjs(m.kickoff_date).locale(`${pageContext.lang === "us" ? "en" : "es"}`).format("MMMM")}</H4>
                  <Paragraph textAlign="left" fontWeight="700">{`
                      ${pageContext.lang === "us" ? dayjs(m.kickoff_date).add(5, "hour").locale("en").format("MM/DD") : dayjs(m.kickoff_date).add(5, "hour").locale("es").format("DD/MM")} 
                      ${dateText[pageContext.lang]}
                      ${pageContext.lang === "us" ? dayjs(m.ending_date).add(5, "hour").locale("en").format("MM/DD") : dayjs(m.ending_date).add(5, "hour").locale("es").format("DD/MM")}
                  `}</Paragraph>
                </Div>
                <Div flexDirection="column" width_tablet="35%" margin="0 0 20px 0">
                  <H4 textAlign="left" textTransform="uppercase">{content.cohorts.info.program_label}</H4>
                  <Link to={info[pageContext.lang][m.syllabus.certificate.slug] || ""}><Paragraph textAlign="left" color={Colors.blue}>{m.syllabus.certificate.name}</Paragraph></Link>
                </Div>
                <Div flexDirection="column" display="none" display_tablet="flex" >
                  <H4 textAlign="left" textTransform="uppercase">{content.cohorts.info.location_label}</H4>
                  <Div>
                    <Link to={locations[pageContext.lang][m.academy.slug] || ""}>
                      <Paragraph textAlign="left" color={Colors.blue}>{m.academy.city.name}</Paragraph>
                    </Link>
                    {m.academy.slug != "online" && <Paragraph textAlign="left" margin="0 0 0 3px">
                      {locationText[pageContext.lang]} <Link color={Colors.blue} to={locations[pageContext.lang]['online'] || ""}>{`Online`}</Link>
                    </Paragraph>}
                  </Div>
                </Div>
                <Div flexDirection="column" display="none" display_tablet="flex">
                  <H4 textAlign="left" textTransform="uppercase">{content.cohorts.info.duration_label}</H4>
                  <Paragraph textAlign="left">{content.cohorts.info.duration_weeks}</Paragraph>
                </Div>
                <Div display="flex" display_tablet="none" justifyContent="between" margin="0 0 20px 0">
                  <Div flexDirection="column" width="50%">
                    <H4 textAlign="left" textTransform="uppercase">{content.cohorts.info.location_label}</H4>
                    <Div>
                      <Link to="">
                        <Paragraph textAlign="left" color={Colors.blue}>{m.academy.city.name}</Paragraph>
                      </Link>
                      {m.academy.slug != "online" && <Link to={locations[pageContext.lang]['online'] || ""}>
                        <Paragraph textAlign="left" margin="0 0 0 3px" color={Colors.blue}>{`${locationText[pageContext.lang]} Online`}</Paragraph>
                      </Link>}
                    </Div>
                  </Div>
                  <Div flexDirection="column" width="50%">
                    <H4 textAlign="left" textTransform="uppercase">{content.cohorts.info.duration_label}</H4>
                    <Paragraph textAlign="left">{content.cohorts.info.duration_weeks}</Paragraph>
                  </Div>
                </Div>
                <Div flexDirection="column">
                  <Link to={content.cohorts.info.button_link}>
                    <Button variant="full" width="fit-content" color={Colors.black} margin="10px 0" textColor="white">{content.cohorts.info.button_text}</Button>
                  </Link>
                </Div>
              </Div>
            )
          })}
        </Div>
      </GridContainer >
      {limit && datas.events.filtered.length > 6 &&
        <GridContainer columns_tablet="1" margin="30px 0" margin_tablet="48px 0 38px 0">
          <Paragraph color={Colors.blue} cursor="pointer" onClick={() => setLimit(!limit)}>Show more</Paragraph>
        </GridContainer>
      }{!limit && datas.events.filtered.length > 6 &&
        <GridContainer columns_tablet="1" margin="30px 0" margin_tablet="48px 0 38px 0">
          <Paragraph color={Colors.blue} cursor="pointer" onClick={() => setLimit(!limit)}>Show less</Paragraph>
        </GridContainer>
      }


      {yml.events.title &&
        <GridContainer columns_tablet="1" margin="30px 0" margin_tablet="48px 0 38px 0">
          <H3 textAlign="left">{yml.events.title}</H3>
        </GridContainer>
      }
      <GridContainer columns_tablet="3" margin="0 0 73px 0" margin_tablet="0 0 65px 0">
        <>
          {
            datas.events.filtered.map((m, i) => {
              const limits = limit == true ? 6 : 100
              return i < limits && (
                <Div
                  display="flex"
                  flexDirection="column"
                  justifyContent="between"
                  borderBottom={`1px solid ${Colors.lightGray}`}
                  border={`1px solid ${Colors.lightGray}`}
                  key={i}
                  style={{borderRadius: `3px`}}>
                  <LazyLoad scroll={true} height={230}>
                    <Img
                      src={m.banner}
                      bsize="cover"
                      mb="10px"
                      position="center center"
                      height="180px"

                    />
                  </LazyLoad>
                  <Div padding="25px" flexDirection="column">
                    <H3 textAlign="left" margin_tablet="0 0 45px 0" margin="0 0 30px 0">{m.title}</H3>
                    <H4 textAlign="left" fontSize="15px" fontWeight="700" textTransform="uppercase" lineHeight="22px" >{dayjs(m.starting_at).add(5, "hour").locale("en").format("ddd, DD MMM YYYY")}</H4>
                    <H4 textAlign="left" fontSize="15px" textTransform="uppercase" lineHeight="22px" margin_tablet="0 0 25px 0" margin="0 0 15px 0">
                      {m.online_event ? "Online" : m.academy.city ? m.academy.city.name : m.academy.name}
                    </H4>
                    <Anchor to={m.url}>
                      <Button variant="outline" color={Colors.black} padding="10px 17px" textColor={Colors.white}>{yml.button.event_register_button_link}</Button>
                    </Anchor>

                  </Div>
                </Div>
              )
            })
          }
        </>
      </GridContainer>

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
          events{
            title
            paragraph
          }
          button{
            apply_button_text
            apply_button_link
            cohort_more_details_text
            event_register_button_link
          }
          seo_title
          header{
            title
            paragraph
            
          }
          cohorts{
            title
            paragraph
            button{
              text
              top_label
            }
            info {
              button_link
              button_text
              program_label
              duration_label
              duration_weeks
              location_label
            }
            footer {
              button_text_close
              button_text_open
            }
          }
          
        }
      }
    }
    cohort_img: file(relativePath: { eq: "images/events-alt.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
          width: 400
          placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
        )
        # fluid(maxWidth: 400) {
        #   ...GatsbyImageSharpFluid_withWebp
        # }
      }
    }
  }
`;
export default BaseRender(Calendar);