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
import {SessionContext} from '../session'

const ListCard = ({image, title, date, address, link, slug, applyButtonLink, detailsButtonLink, applyButtonText, detailsButtonText, eventLink, eventText, context, bg_size}) => <Column size="4" size_sm="12" margin="0 0 1rem 0">
  <Anchor to={link}>
    <Card
      overflow={`hidden`}
      height="auto"
      shadow
    >
      <LazyLoad scroll={true} height={230}>

        <Img
          src={image}
          bsize="cover"
          mb="10px"
          border="1.25rem 1.25rem 0 0"
          position="center center"
          height="180px"
          h_lg="120px"
          h_md="140px"
          h_sm="220px"
          bg_hover={bg_size}
        />
      </LazyLoad>
      <Row
        display="flex"
        marginLeft="0"
        marginRight="0"
        padding={`15px`}>
        <Column size="12">
          <Row marginBottom="1rem" display="flex">
            <H4
              fs_xs="18px"
              fs_sm="18px"
              fs_md="16px"
              fs_lg="16px"
              fontSize="20px"
            >{title}
            </H4>
          </Row>
          <Row marginBottom=".2rem" alignItems={`center`} display="flex">
            <Icon icon="clock" width="24" color={Colors.blue} fill={Colors.blue} />
            {context == "us" ? <Paragraph
              margin={`0 0 0 10px`}
              fs_xs="18px"
              fs_sm="18px"
              fs_md="9px"
              fs_lg="11px"
              fs_xl="14px">
              {dayjs(date).add(5, "hour").locale("en").format("ddd, DD MMM YYYY")}
            </Paragraph>
              : <Paragraph
                margin={`0 0 0 10px`}
                fs_xs="18px"
                fs_sm="18px"
                fs_md="9px"
                fs_lg="11px"
                fs_xl="14px">
                {dayjs(date).add(5, "hour").locale("es").format("ddd, DD MMM YYYY")}
              </Paragraph>}
          </Row>
          <Row marginBottom=".2rem" alignItems={`center`} display="flex">
            <Icon icon="marker" width="24" color={Colors.blue} fill={Colors.blue} />
            <Paragraph
              margin={`0 0 0 10px`}
              fs_xs="18px"
              fs_sm="18px"
              fs_md="9px"
              fs_lg="11px"
              fs_xl="14px">
              {address}
            </Paragraph>
          </Row>
          {slug && <Row marginBottom=".2rem" alignItems={`center`} display="flex">
            <Icon icon="laptop" width="24" color={Colors.blue} fill={Colors.blue} />
            <Paragraph
              margin={`0 0 0 10px`}
              fs_xs="18px"
              fs_sm="18px"
              fs_md="9px"
              fs_lg="11px"
              fs_xl="14px">
              {slug.includes("-ft") ? "Full Time" : "Part Time"}
            </Paragraph>
          </Row>}
          {applyButtonLink && detailsButtonLink && <Row justifyContent={`center`} display="flex">
            <Div padding="10px" d_lg="block" d_sm="flex" justifyContent="center" display="flex">
              <Link to={applyButtonLink}>
                <Button outline color={Colors.red} padding="10px 12px" textColor={Colors.white}>{applyButtonText}</Button>
              </Link>
              &nbsp;
              <Link to={detailsButtonLink}>
                <Button outline color={Colors.blue} padding="10px 17px" textColor={Colors.white}>{detailsButtonText}</Button>
              </Link>
            </Div>
          </Row>}
          {eventLink && eventText && <Row justifyContent={`end`} display="flex">
            <Div padding="10px" d_lg="block" d_sm="flex" justifyContent="center" display="flex">
              <Anchor to={eventLink}>
                <Button outline color={Colors.blue} padding="10px 17px" textColor={Colors.white}>{eventText}</Button>
              </Anchor>
            </Div>
          </Row>}
        </Column>
      </Row>
    </Card>
  </Anchor>
</Column>;
const Calendar = (props) => {
  const {pageContext, yml} = props;
  const [limit, setLimit] = useState(true);
  const {session} = useContext(SessionContext);
  const [backgroundSize, setBackgroundSize] = useState("100%");
  const [data, setData] = useState({
    events: {catalog: [], all: [], filtered: []},
    cohorts: {catalog: [], all: [], filtered: []}
  });
  // console.log("calendar: ", yml)
  const [academy, setAcademy] = useState(null)
  // const [filterType, setFilterType] = useState({label: "Upcoming Courses and Events", value: "cohorts"});
  // useEffect(() => {
  //   const getData = async () => {
  //     // let resp = await fetch(`${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true`);
  //     let resp = await fetch(`https://breathecode.herokuapp.com/v1/admissions/cohort/all?upcoming=true`);
  //     let cohorts = await resp.json();
  //     console.log("RESP: ", cohorts)
  // let resp2 = await fetch(`${process.env.GATSBY_BREATHECODE_HOST}/events/all`);
  const [filterType, setFilterType] = useState(pageContext.lang == "us" ? {label: "Upcoming Courses and Events", value: "cohorts"} : {label: "Próximos Cursos y Eventos", value: "cohorts"});

  useEffect(() => {
    const getData = async () => {
      let resp = await fetch(`https://breathecode.herokuapp.com/v1/admissions/cohort/all?upcoming=true`);
      //   ${process.env.GATSBY_BREATHECODE_HOST}
      let cohorts = await resp.json();
      let resp2 = await fetch(`https://breathecode.herokuapp.com/v1/events/all`);
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
        ...data,
        cohorts: {
          ...data.cohorts,
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
        padding_tablet="72px 0 40px 0"
        background={Colors.veryLightBlue}
      />
      {yml.events.title &&
        <GridContainer columns_tablet="1" margin="30px 0" margin_tablet="48px 0 38px 0">
          <H3 textAlign="left">{yml.events.title}</H3>
        </GridContainer>
      }
      <GridContainer columns_tablet="3" margin="0 0 73px 0" margin_tablet="0 0 30px 0">
        <>
          {
            data.events.filtered.map((m, i) => {
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
                      <Button outline color={Colors.black} padding="10px 17px" textColor={Colors.white}>{yml.button.event_register_button_link}</Button>
                    </Anchor>

                  </Div>
                </Div>
              )
            })
          }
        </>
      </GridContainer>
      {limit && data.events.filtered.length > 5 &&
        <GridContainer columns_tablet="1" margin="30px 0" margin_tablet="48px 0 38px 0">
          <Paragraph color={Colors.blue} cursor="pointer" onClick={() => setLimit(!limit)}>Show more</Paragraph>
        </GridContainer>
      }{!limit && data.events.filtered.length > 5 &&
        <GridContainer columns_tablet="1" margin="30px 0" margin_tablet="48px 0 38px 0">
          <Paragraph color={Colors.blue} cursor="pointer" onClick={() => setLimit(!limit)}>Show less</Paragraph>
        </GridContainer>
      }
      <UpcomingDates lang={pageContext.lang} />
      {/* <WrapperImage
        imageData={yml.header.image && yml.header.image.childImageSharp.fluid}
        border="bottom"
        bgSize="cover"
        paddingRight={`0`}
        customBorderRadius="0 0 0 1.25rem"
      >
        <Divider height="100px" />
        <Title
          size="5"
          type="h1"
          title={yml.header.tagline}
          variant="main"
          color={Colors.white}
          textAlign="center"
        />
      </WrapperImage> */}
      {/* <Wrapper border="top" color={Colors.white}>
        <Divider height="50px" />
        <Row marginBottom={`10px`} justifyContent={`end`} display="flex">
          <a href={`https://www.meetup.com/4Geeks-Academy/`} target="_blank" rel="noopener noreferrer">
            <Button width="100%" outline color={Colors.blue} textColor={Colors.blue} margin="1rem 0 .2rem 0" padding=".35rem.85rem">
              {pageContext.lang == "us" ? "Join Our Meetup" : "Únete a nuestro Meetup"}
            </Button>
          </a>
          <H4 margin="20px 0 0 0" align="left" a_sm="left">{pageContext.lang == "us" ? "Filter courses and events:" : "Filtra por cursos y eventos:"}</H4>
        </Row>
        <Row
          padding={`10px 20px`}
          background={Colors.lightGray}
          borderRadius={`.5rem`}
          alignItems={`center`}
          customRespSize
          alignResp={`space-between`}
          flexDirection_sm={`column`}
          display="flex"
        >
          <Select
            margin="0 10px 0 0"
            top="40px"
            left="20px"
            width="300px"
            m_sm="5px"
            maxWidth="100%"
            shadow="0px 0px 6px 2px rgba(0, 0, 0, 0.2)"
            options={console.log("catalog", data.cohorts.catalog) || data.cohorts.catalog}
            openLabel={pageContext.lang == "us" ? academy ? "Campus: " + academy.label : "Select one academy" : academy ? "Campus: " + academy.label : "Escoge una academia"}
            closeLabel={pageContext.lang == "us" ? academy ? "Campus: " + academy.label : "Select one academy" : academy ? "Campus: " + academy.label : "Escoge una academia"}
            onSelect={(opt) => {
              setAcademy(opt)
              setData({
                ...data,
                [filterType.value]: {
                  ...data[filterType.value],
                  filtered: opt.label !== 'All Locations' ? data[filterType.value].all.filter(elm => elm.academy.slug === opt.value) : data[filterType.value].all
                }
              });
            }}
          />
          <Select
            top="40px"
            left="20px"
            width="300px"
            maxWidth="100%"
            m_sm="5px"
            shadow="0px 0px 6px 2px rgba(0, 0, 0, 0.2)"
            options={pageContext.lang == "us" ? [
                {label: "Courses", value: "cohorts"},
                {label: "Events", value: "events"}] : 
                [{label: "Cursos", value: "cohorts"},
                {label: "Eventos", value: "events"}]}
            openLabel={filterType.label}
            closeLabel={filterType.label}
            onSelect={(opt) => setFilterType(opt)}
          />
        </Row>
      </Wrapper> */}
      {/* <Wrapper border="top">
        <Row display="flex">
          {
            filterType.value === "cohorts" ?
              data.cohorts.filtered.length == 0 ?
                <Paragraph margin={`0 0 0 10px`} fontSize="18px">
                  {pageContext.lang == "us" ? academy != null ? "It seems we could not found any result." : "Loading..." : academy != null ? "Parece que no pudimos conseguir ningún resultado." : "Cargando..."}
                </Paragraph>
                :
                data.cohorts.filtered.map((cohort, index) =>
                  <ListCard
                    key={index}
                    title={cohort.syllabus ? cohort.syllabus.certificate.name : ""}
                    address={`${cohort.academy.city.name}, ${cohort.academy.country.name}`}
                    image={cohort.academy.logo_url}
                    link={`/${session ? session.language : "us"}/${cohort.syllabus ? cohort.syllabus.certificate.slug : ""}`}
                    date={cohort.kickoff_date}
                    slug={cohort.slug}
                    applyButtonText={yml.button.apply_button_text}
                    applyButtonLink={yml.button.apply_button_link}
                    detailsButtonText={yml.button.cohort_more_details_text}
                    detailsButtonLink={`/${pageContext.lang}/${cohort.syllabus.certificate.slug}`}
                    context={pageContext.lang}
                    bg_size="cover"
                  />
                )
              :
              data.events.filtered.length === 0 ?
                <Paragraph margin={`0 0 0 10px`} fontSize="18px">
                  {pageContext.lang == "us" ? academy != null ? "It seems we could not found any result." : "Loading..." : academy != null ? "Parece que no pudimos conseguir ningún resultado." : "Cargando..."}
                </Paragraph>
                :
                data.events.filtered.map((event, index) =>
                  <ListCard
                    key={index}
                    title={event.title}
                    address={event.online_event ? "Online" : event.academy.city ? event.academy.city.name : event.academy.name}
                    image={event.banner}
                    link={event.url}
                    date={event.starting_at}
                    exerpt={event.excerpt}
                    eventLink={event.url}
                    eventText={yml.button.event_register_button_link}
                    context={pageContext.lang}
                    onMouseOver={() => setBackgroundSize("contain")}
                  // bg_size={backgroundSize}

                  />
                )
          }
        </Row>
      </Wrapper>
      <Divider height="50px" /> */}
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