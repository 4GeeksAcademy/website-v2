import React, {useState, useContext, useEffect} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Title, H1, H2, H3, H4, Span, Paragraph, Separator} from '../Heading';
import {GridContainer, Grid, Div} from '../Sections'
import {Img, Button, Colors, RoundImage, StyledBackgroundSection} from '../Styling'
import Icon from "../Icon"
import dayjs from "dayjs"
import 'dayjs/locale/de'
import { getCohorts } from "../../actions"
import {SessionContext} from '../../session.js'
import Link from 'gatsby-link'

const Loc = ({locations, title, image, paragraph, lang}) => {
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
  `)
  let content = data.allLocYaml.edges.find(({node}) => node.fields.lang === lang);
  if (content) content = content.node;
  else return null;
  const {session} = useContext(SessionContext);
  const [index, setIndex] = useState(null);
  const [status, setStatus] = useState({toggle: false, hovered: false})
  const [datas, setData] = useState({
    cohorts: {catalog: [], all: [], filtered: []}
  });

  const fakeYml = [{
    title: "Online",
    content: "With the online modality you have access to our physical locations worldwide",
    sub_links: [
        {
            title: "Miami, USA",
            link_to: "/us/coding-campus/coding-bootcamp-miami"
        },
        {
            title: "Chile",
            link_to: "/us/coding-campus/coding-bootcamp-santiago"
        },
        {
            title: "Argentina",
            link_to: "/us/coding-campus/coding-bootcamp-argentina"
        },
        {
            title: "Bolivia",
            link_to: "/us/coding-campus/coding-bootcamp-bolivia"
        },
        {
          title: "Miami, USA",
          link_to: "/us/coding-campus/coding-bootcamp-miami"
      },
      {
          title: "Chile",
          link_to: "/us/coding-campus/coding-bootcamp-santiago"
      },
      {
          title: "Argentina",
          link_to: "/us/coding-campus/coding-bootcamp-argentina"
      },
      {
          title: "Bolivia",
          link_to: "/us/coding-campus/coding-bootcamp-bolivia"
      },
      {
        title: "Miami, USA",
        link_to: "/us/coding-campus/coding-bootcamp-miami"
    },
    {
        title: "Chile",
        link_to: "/us/coding-campus/coding-bootcamp-santiago"
    },
    {
        title: "Argentina",
        link_to: "/us/coding-campus/coding-bootcamp-argentina"
    },
    {
        title: "Bolivia",
        link_to: "/us/coding-campus/coding-bootcamp-bolivia"
    },
    {
      title: "Miami, USA",
      link_to: "/us/coding-campus/coding-bootcamp-miami"
  },
  {
      title: "Chile",
      link_to: "/us/coding-campus/coding-bootcamp-santiago"
  },
  {
      title: "Argentina",
      link_to: "/us/coding-campus/coding-bootcamp-argentina"
  },
  {
      title: "Bolivia",
      link_to: "/us/coding-campus/coding-bootcamp-bolivia"
  },
    ]
},
{
  title: "America",
  content: "With the online modality you have access to our physical locations worldwide",
  sub_links: [
      {
          title: "Miami, USA",
          link_to: "/us/coding-campus/coding-bootcamp-miami"
      },
      {
          title: "Chile",
          link_to: "/us/coding-campus/coding-bootcamp-santiago"
      },
      {
          title: "Argentina",
          link_to: "/us/coding-campus/coding-bootcamp-argentina"
      },
      {
          title: "Bolivia",
          link_to: "/us/coding-campus/coding-bootcamp-bolivia"
      },
  ]
},
{
  title: "Europe",
  content: "With the online modality you have access to our physical locations worldwide",
  sub_links: [
      {
          title: "Miami, USA",
          link_to: "/us/coding-campus/coding-bootcamp-miami"
      },
      {
          title: "Chile",
          link_to: "/us/coding-campus/coding-bootcamp-santiago"
      },
      {
          title: "Argentina",
          link_to: "/us/coding-campus/coding-bootcamp-argentina"
      },
      {
          title: "Bolivia",
          link_to: "/us/coding-campus/coding-bootcamp-bolivia"
      },
  ]
}];

  const [activeOpt, setActiveOpt] = useState({
    ...fakeYml[0]
  });
  console.log('IN THE NEW LOC');
  console.log(locations, 'locations');

  useEffect(() => {
    const getData = async () => {
      const cohorts = await getCohorts();
      let _types = []
      setData(oldData => ({
        cohorts: {catalog: oldData.cohorts.catalog, all: cohorts, filtered: cohorts}
      }))
    }
    getData();
  }, []);
  let loc = locations.filter(l => l.node.meta_info.unlisted != true).sort((a, b) => a.node.meta_info.position > b.node.meta_info.position ? 1 : -1)
  const nextDate = (location) => {
    let cohort = datas.cohorts.all.find(item => item.academy.slug === location.node.breathecode_location_slug)
    let onlineCohort = datas.cohorts.all.find(item => item.academy.slug === "online")
    return cohort || onlineCohort
  }
  return (
    <>
      {title &&
        <GridContainer
          margin_tablet="0 0 35px 0"
          margin="0 0 32px 0"
          gridGap="17px"

        >
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <H2 margin="0 0 15px 0" fontSize="15px" lineHeight="19px" fontWeight="900">{title}</H2>
            <Paragraph>{paragraph}</Paragraph>
          </Div>
        </GridContainer>}
      <Div
        id="locations-container"
        padding="0 10% 10% 10%"
        flexDirection_tablet="row"
        flexDirection_sm="column"
        flexDirection_xs="column"
      >
        {image &&
          <Div
            id="img-container"
            width_tablet="20%"
            width_xs="100%"
            margin_tablet="0 20px 0 0"
            margin_xs="0 0 20px 0"
          // height="100%"
          >
            <Img
              src={image}
              // borderRadius={"1.25rem"}
              borderRadius={"3px"}
              // className="pointer"
              alt={"4Geeks Academy Section"}
              margin="auto"
              width="100%"
              height="100%"
              minHeight_tablet="none"
              minHeight_sm="100px"
              backgroundSize={`cover`}
            />
          </Div>}
        <Div
          id="menu-container"
          width_tablet="80%"
          width_xs="100%"
          display="block"
        >
          <Paragraph
            textAlign="left"
            color={Colors.darkGray}
            margin="0 0 10px 0"
          >
            {`Escoge una región`}
          </Paragraph>
          <Div
            id="selectors-container"
            flexDirection_tablet="row"
            flexDirection_xs="column"
            width_xs="100%"
          >
            <Div
            id="options-container"
            flexDirection_tablet="column"
            justifyContent_tablet="start"
            flexDirection_xs="row"
            justifyContent_xs="between"
            width_tablet="33%"
            width_xs="100%"
          >
            {fakeYml.map((m, i) =>
              <Div
                color={activeOpt.title === m.title ? Colors.black : Colors.gray}
                borderLeft_tablet={activeOpt.title === m.title ? `5px solid ${Colors.blue}` : null}
                borderBottom_tablet={'none'}
                borderLeft_xs={'none'}
                borderBottom_xs={activeOpt.title === m.title ? `5px solid ${Colors.blue}` : null}
                borderRadius="none"
                padding="10px"
                onClick={() => {
                  setActiveOpt({ ...m });
                }}
                style={{ cursor: 'pointer' }}
                display="block"
              >
                <H3
                  textAlign="left"
                  fontSize="20px"
                  color={activeOpt.title === m.title ? Colors.black : Colors.gray}
                >
                  {m.title}
                </H3>
                <Paragraph
                  textAlign="left"
                  display_tablet="block"
                  display_xs="none"
                  display_sm="none"
                  color={activeOpt.title === m.title ? Colors.black : Colors.gray}
                >
                  {m.content}
                </Paragraph>
              </Div>
            )}

          </Div>
          <Paragraph
            display_tablet="none"
            display_xs="block"
            textAlign="left"
            color={Colors.darkGray}
            margin="10px 0"
          >
            {activeOpt.content}
          </Paragraph>
          <Div
            id="links-container"
            flexDirection="column"
            width_tablet="67%"
            width_xs="100%"
            flexWrap="wrap"
            // maxHeight="330px"
            // minHeight="330px"
            height="330px"
            alignContent_tablet="flex-start"
            alignContent_xs="space-between"
          >
            {activeOpt.sub_links != undefined && Array.isArray(activeOpt.sub_links) && activeOpt.sub_links.map((l, i) => {
              return (
                <Link to={l.link_to} key={i}>
                  <Div
                    margin_tablet="2px 10px 2px 60px"
                    margin_xs="2px 10px"
                    padding="10px 0 0 0"
                    alignItems="baseline"
                  >
                    <H3 
                      textAlign="left" 
                      width="fit-content" 
                      fontSize="15px" 
                      lineHeight="20px" 
                      fontWeight="400" 
                      margin="0 5px 0 0"
                      borderBottomHover="2px solid black"
                    >
                      {l.title}
                    </H3>
                  </Div></Link>
              )
            })}
          </Div>
        </Div>
          </Div>
          
      </Div>
      {/* <GridContainer columns="1" columns_sm="2" columns_tablet="3" gridGap="0" columnGap="15px" margin="0 0 50px 0" margin_tablet="0 0 70px 0">
        {loc !== null &&
          loc.map((item, i) => {
            const next = nextDate(item);
            let stringDate = "";
            if(next !== undefined && next.kickoff_date){
              stringDate = dayjs(next.kickoff_date).locale(lang).format("ddd DD MMM YYYY");
              stringDate = stringDate[0].toUpperCase() + stringDate.substr(1,2) + "." + stringDate.substr(3);
            }
            return (
              <Div
                onMouseOver={() => setIndex(i)}
                key={i}
                style={{
                  borderBottom: `1px solid ${Colors.lightGray}`,
                  position: "relative",
                  transition: "background 0.3s ease, border-left 0.3s ease",
                  borderLeft: `${index === i ? "10px solid" + Colors.yellow : "0"}`,
                }}
                display="flex"
                flexDirection="row"
                justifyContent="between"
                // height="207px"
                height="auto"
                padding="30px 24px"
                background={index === i ? Colors.verylightGray : Colors.white}
              >
                <H3
                  textAlign="left"
                >{item.node.name}
                  <Span animated color={Colors.yellow}>_</Span>
                </H3>
                <Link to={`/${lang}/coding-campus/${item.node.meta_info.slug}`}>
                  <Icon 
                    // style={{position: "absolute", bottom: "18px", right: "18px"}}
                    icon="arrowright" 
                    height="32px"
                    width="32px"
                  />
                </Link>
              </Div>
            )
          })
        }
      </GridContainer> */}
    </>
  )
};


export default Loc;