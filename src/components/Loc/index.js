import React, { useState, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Title, H1, H2, H3, H4, Span, Paragraph, Separator } from "../Heading";
import { GridContainer, Grid, Div } from "../Sections";
import {
  Button,
  Colors,
  RoundImage,
  StyledBackgroundSection,
} from "../Styling";
import Icon from "../Icon";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { getCohorts } from "../../actions";
import { SessionContext } from "../../session.js";
import Link from "gatsby-link";

const Loc = ({ locations, title, paragraph, lang }) => {
  const data = useStaticQuery(graphql`
    {
      allLocYaml {
        edges {
          node {
            label
            fields {
              lang
            }
          }
        }
      }
    }
  `);
  let content = data.allLocYaml.edges.find(
    ({ node }) => node.fields.lang === lang
  );
  if (content) content = content.node;
  else return null;
  const { session } = useContext(SessionContext);
  const [index, setIndex] = useState(null);
  const [status, setStatus] = useState({ toggle: false, hovered: false });
  const [datas, setData] = useState({
    cohorts: { catalog: [], all: [], filtered: [] },
  });
  useEffect(() => {
    const getData = async () => {
      const cohorts = await getCohorts();
      let _types = [];
      setData((oldData) => ({
        cohorts: {
          catalog: oldData.cohorts.catalog,
          all: cohorts,
          filtered: cohorts,
        },
      }));
    };
    getData();
  }, []);
  let loc = locations
    .filter((l) => l.node.meta_info.unlisted != true)
    .sort((a, b) =>
      a.node.meta_info.position > b.node.meta_info.position ? 1 : -1
    );
  const nextDate = (location) => {
    let cohort = datas.cohorts.all.find(
      (item) => item.academy.slug === location.node.breathecode_location_slug
    );
    let onlineCohort = datas.cohorts.all.find(
      (item) => item.academy.slug === "online"
    );
    return cohort || onlineCohort;
  };
  return (
    <>
      {title && (
        <GridContainer
          margin_tablet="0 0 35px 0"
          margin="0 0 32px 0"
          gridGap="17px"
        >
          <Div display="flex" flexDirection="column" alignItems="center">
            <H2
              margin="0 0 15px 0"
              fontSize="15px"
              lineHeight="19px"
              fontWeight="900"
            >
              {title}
            </H2>
            <Paragraph>{paragraph}</Paragraph>
          </Div>
        </GridContainer>
      )}
      <GridContainer
        columns="1"
        columns_sm="2"
        columns_tablet="3"
        gridGap="0"
        columnGap="15px"
        margin="0 0 50px 0"
        margin_tablet="0 0 70px 0"
      >
        {loc !== null &&
          loc.map((item, i) => {
            const next = nextDate(item);
            let stringDate = "";
            if (next !== undefined && next.kickoff_date) {
              stringDate = dayjs(next.kickoff_date)
                .locale(lang)
                .format("ddd DD MMM YYYY");
              stringDate =
                stringDate[0].toUpperCase() +
                stringDate.substr(1, 2) +
                "." +
                stringDate.substr(3);
            }
            return (
              <Div
                onMouseOver={() => setIndex(i)}
                key={i}
                style={{
                  borderBottom: `1px solid ${Colors.lightGray}`,
                  position: "relative",
                  transition: "background 0.3s ease, border-left 0.3s ease",
                  borderLeft: `${
                    index === i ? "10px solid" + Colors.yellow : "0"
                  }`,
                }}
                display="flex"
                flexDirection="row"
                justifyContent="between"
                // height="207px"
                height="auto"
                padding="30px 24px"
                background={index === i ? Colors.verylightGray : Colors.white}
              >
                <H3 textAlign="left">
                  {item.node.name}
                  <Span animated color={Colors.yellow}>
                    _
                  </Span>
                </H3>
                {/* <Div
                  display="block"
                  display_tablet="block"
                >
                  <Paragraph textAlign="left" fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                    {content.label}
                  </Paragraph >
                  <Paragraph textAlign="left" fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                    {next !== undefined ? next.syllabus_version?.name : "No upcoming dates at this location"}
                  </Paragraph>
                  {next !== undefined && next.kickoff_date && <Paragraph textAlign="left" fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                    <span className="capitalize">{stringDate}</span>
                  </Paragraph>}
                </Div> */}
                <Link to={`/${lang}/coding-campus/${item.node.meta_info.slug}`}>
                  <Icon
                    // style={{position: "absolute", bottom: "18px", right: "18px"}}
                    icon="arrowright"
                    height="32px"
                    width="32px"
                  />
                </Link>
              </Div>
            );
          })}
      </GridContainer>
    </>
  );
};

export default Loc;
