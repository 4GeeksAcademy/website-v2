import React, {useState, useContext, useEffect} from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {Title, H1, H2, H3, H4, Span, Paragraph, Separator} from '../Heading';
import {GridContainer, Grid, Div} from '../Sections'
import {Button, Colors, RoundImage, StyledBackgroundSection} from '../Styling'
import Icon from "../Icon"
import dayjs from "dayjs"
import 'dayjs/locale/de'
import {SessionContext} from '../../session.js'
import Link from 'gatsby-link'

const Loc = ({locations, title, paragraph, lang}) => {
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
  useEffect(() => {
    const getData = async () => {
      let resp = await fetch(`${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true`);
      // let resp = await fetch(`https://breathecode.herokuapp.com/v1/admissions/cohort/all?upcoming=true`);
      let cohorts = await resp.json();
      let _types = []
      setData(oldData => ({
        cohorts: {catalog: oldData.cohorts.catalog, all: cohorts, filtered: cohorts}
      }))
    }
    getData();
  }, []);
  let loc = locations.filter(l => l.node.meta_info.unlisted != true).sort((a, b) => a.node.meta_info.position > b.node.meta_info.position ? 1 : -1)
  const nextDate = (location) => {
    let city = location.node.city.split(' ')
    let cohort = datas.cohorts.all.find(item => item.name.includes(city[0]))
    return cohort

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
      <GridContainer

        columns="2" columns_tablet="3" gridGap="0" margin_tablet="0 0 70px 0">
        {loc != null &&
          loc.map((item, i) => {
            return (
              <Div
                // onMouseLeave={() => {
                //   // setStatus({...status, hovered: false});

                //   setTimeout(() => {
                //     setIndex(index != null && null);
                //   }, 1000)
                // }}
                // onMouseEnter={() => setStatus({...status, hovered: true})}
                onMouseOver={() => setIndex(i)}
                key={i}
                style={{border: `1px solid ${Colors.black}`, position: "relative"}}
                display="flex"
                flexDirection="column"
                justifyContent="between"
                height="207px"
                padding="24px"
                background={index == i ? Colors.yellow : Colors.white}
              >
                <H3
                  textAlign="left"
                >{item.node.city}
                  <Span animated color={Colors.yellow}>_</Span>
                </H3>
                <Div
                  display="none"
                  display_tablet="block"
                >
                  <Paragraph textAlign="left" fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                    {content.label}
                  </Paragraph >
                  {nextDate(item) != undefined && <Paragraph textAlign="left" fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                    {nextDate(item).syllabus.certificate.name}
                  </Paragraph>}
                  {nextDate(item) != undefined && nextDate(item).kickoff_date && <Paragraph textAlign="left" fontSize="15px" lineHeight="22px" color={Colors.darkGray}>
                    {dayjs(nextDate(item).kickoff_date != undefined && nextDate(item).kickoff_date).add(5, "hour").locale(lang).format("ddd, DD MMM YYYY")}
                  </Paragraph>}
                </Div>
                <Link to={`/${lang}/coding-campus/${item.node.meta_info.slug}`}><Icon style={{position: "absolute", bottom: "18px", right: "18px"}} icon="arrowright" height="32px" width="32px" /></Link>
              </Div>

            )
          })
        }
      </GridContainer>
    </>
  )
};


export default Loc;