import React, { useState, useEffect, useContext, useRef } from "react";
import { Header, Div, GridContainer } from "../components/Sections";
import { H3, H4, Paragraph } from "../components/Heading";
import { Colors, Button, Img, Anchor } from "../components/Styling";
import UpcomingDates from "../components/UpcomingDates";
import { getEvents } from "../actions";
import BaseRender from "./_baseLayout";
import dayjs from "dayjs";
import "dayjs/locale/de";
import LazyLoad from "react-lazyload";
import { graphql } from "gatsby";
import { Circle } from "../components/BackgroundDrawing";
import { SessionContext } from "../session";

const Calendar = (props) => {
  const { pageContext, yml, data } = props;
  const [limit, setLimit] = useState(true);
  const eventsTitle = useRef(null);
  const { session } = useContext(SessionContext);
  const [datas, setData] = useState({
    events: { catalog: [], all: [], filtered: [] },
  });
  const WHITE_LABEL_ACADEMY = process.env.WHITE_LABEL_ACADEMY || '';
  let content = data.allPageYaml.edges[0].node;

  useEffect(() => {
    const getData = async () => {
      let eventsQuery = { academy: WHITE_LABEL_ACADEMY };
      let events = await getEvents(eventsQuery);

      let _types = [];
      for (let i = 0; i < events.length; i++) {
        if (
          events[i].event_type &&
          !_types.includes(events[i].event_type.name)
        ) {
          _types.push({
            label: events[i].event_type.name,
            value: events[i].event_type.name,
          });
        }
      }
      setData({
        events: { catalog: _types, all: events, filtered: events },
      });
    };
    getData();
  }, []);
  useEffect(() => {
    if (session && Array.isArray(session.locations)) {
      const _data = {
        ...datas,
      };
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
        height="auto"
        margin="95px 0 0 0"
        padding_tablet="70px 0 0 0"
        padding="70px 0 0 0"
      >
        <Circle
          color="yellow"
          width="17px"
          height="17px"
          top="30px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
          opacity="0.2"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="122px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          top="65px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="87px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="122px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="165px"
          left="74px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="165px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="53px"
          height="53px"
          top="63px"
          right="61px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          top="200px"
          left="106px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="red"
          width="27px"
          height="27px"
          top="27px"
          left="252px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          bottom="56px"
          right="37px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="black"
          width="17px"
          height="17px"
          bottom="56px"
          right="76px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="grey"
          width="17px"
          height="17px"
          bottom="56px"
          right="115px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="yellow"
          width="21px"
          height="21px"
          top="44px"
          right="287px"
          zIndex="1"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="blue"
          width="57px"
          height="57px"
          top="32px"
          right="61px"
          display="none"
          display_tablet="inline"
        />
        <Circle
          color="red"
          width="25px"
          height="25px"
          top="60px"
          right="30px"
          display="inline"
          display_tablet="none"
        />
        <Div
          flexDirection_tablet="row"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          margin_tablet="0 0 50px 0"
        />
      </Header>

      <UpcomingDates
        id="upcoming_dates"
        lang={pageContext.lang}
        message={yml.cohorts.title}
        locations={data.allLocationYaml.edges}
      />

      {yml.events.title && (
        <Div ref={eventsTitle} display="block">
          <GridContainer
            columns_tablet="1"
            margin="30px 0"
            margin_tablet="48px 0 38px 0"
            id="upcoming-events"
          >
            <H3 textAlign="left">{yml.events.title}</H3>
          </GridContainer>
        </Div>
      )}
      <GridContainer
        columns_tablet="3"
        margin="0 0 73px 0"
        margin_tablet="0 0 65px 0"
      >
        <>
          {datas.events.filtered.map((m, i) => {
            const limits = limit ? 6 : 100;
            return (
              i < limits && (
                <Div
                  display="flex"
                  flexDirection="column"
                  justifyContent="between"
                  borderBottom={`1px solid ${Colors.lightGray}`}
                  border={`1px solid ${Colors.lightGray}`}
                  key={i}
                  style={{ borderRadius: `3px` }}
                >
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
                    <H3
                      textAlign="left"
                      margin_tablet="0 0 45px 0"
                      margin="0 0 30px 0"
                    >
                      {m.title}
                    </H3>
                    <H4
                      textAlign="left"
                      fontSize="15px"
                      fontWeight="700"
                      textTransform="uppercase"
                      lineHeight="22px"
                    >
                      {dayjs(m.starting_at)
                        .locale(pageContext.lang == "es" ? "es" : "en")
                        .format("ddd, DD MMM YYYY")}
                    </H4>
                    <H4
                      textAlign="left"
                      fontSize="15px"
                      textTransform="uppercase"
                      lineHeight="22px"
                      margin_tablet="0 0 25px 0"
                      margin="0 0 15px 0"
                    >
                      {m.online_event
                        ? "Online"
                        : m.academy.city
                        ? m.academy.city.name
                        : m.academy.name}
                    </H4>
                    <Anchor to={m.url}>
                      <Button
                        variant="outline"
                        color={Colors.black}
                        padding="10px 17px"
                        textColor={Colors.white}
                      >
                        {yml.button.event_register_button_link}
                      </Button>
                    </Anchor>
                  </Div>
                </Div>
              )
            );
          })}
        </>
      </GridContainer>
      {limit && datas.events.filtered.length > 6 && (
        <GridContainer
          columns_tablet="1"
          margin="30px 0"
          margin_tablet="48px 0 38px 0"
        >
          <Paragraph
            color={Colors.blue}
            cursor="pointer"
            onClick={() => setLimit(!limit)}
          >
            {content.show_more}
          </Paragraph>
        </GridContainer>
      )}
      {!limit && datas.events.filtered.length > 6 && (
        <GridContainer
          columns_tablet="1"
          margin="30px 0"
          margin_tablet="48px 0 38px 0"
        >
          <Paragraph
            color={Colors.blue}
            cursor="pointer"
            onClick={() => {
              setLimit(!limit);
              if (eventsTitle?.current) eventsTitle.current.scrollIntoView();
            }}
          >
            {content.show_less}
          </Paragraph>
        </GridContainer>
      )}
    </>
  );
};
export const query = graphql`
  query EventsQuery($file_name: String!, $lang: String!) {
    allPageYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          meta_info {
            slug
            title
            description
            image
            keywords
          }
          show_more
          show_less
          events {
            title
            paragraph
          }
          button {
            apply_button_text
            apply_button_link
            cohort_more_details_text
            event_register_button_link
          }
          seo_title
          header {
            title
            paragraph
          }
          cohorts {
            no_dates_message
            actionMessage
            title
            paragraph
            button {
              text
              top_label
            }
            info {
              button_link
              button_text
              program_label
              duration_label
              duration_weeks
              duration_part_time
              duration_full_time
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
    allLocationYaml(
      filter: {
        fields: { lang: { eq: $lang } }
        meta_info: { visibility: { nin: ["hidden", "unlisted"] } }
      }
    ) {
      edges {
        node {
          id
          city
          country
          name
          active_campaign_location_slug
          breathecode_location_slug
          fields {
            lang
            file_name
          }
          button {
            apply_button_text
          }
          meta_info {
            slug
            description
            title
            image
            position
            visibility
            keywords
            redirects
            region
          }
          header {
            sub_heading
            tagline
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
              }
            }
          }
          chart_section {
            data {
              percentage
              color
              description
            }
          }
          button {
            apply_button_link
            apply_button_text
            cohort_more_details_text
            syllabus_button_text
            syllabus_submit_text
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
      }
    }
  }
`;
export default BaseRender(Calendar);
