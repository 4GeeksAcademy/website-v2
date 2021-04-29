import React, {useState, useEffect, useContext} from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';
import {GridContainer, Div, Grid} from '../Sections'
import {H2, H3, H4, H5, Paragraph} from '../Heading'
import {Colors, Button, Img, Anchor} from '../Styling'
import dayjs from "dayjs"
import 'dayjs/locale/de'
import LazyLoad from 'react-lazyload';
import {SessionContext} from '../../session'

const UpcomingDates = ({lang}) => {
    const dataQuery = useStaticQuery(graphql`
    {
      allUpcomingDatesYaml {
        edges {
          node {
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
              location_label
            }
            footer {
              button_text
              button_text_close
              button_text_open
              button_link
            }
            fields {
                lang
              }
          }
        }
      }
    }
  `)

    const {session} = useContext(SessionContext);

    const [data, setData] = useState({
        cohorts: {catalog: [], all: [], filtered: []}
    });
    const [academy, setAcademy] = useState(null)
    const [filterType, setFilterType] = useState({label: "Upcoming Courses and Events", value: "cohorts"});
    let content = dataQuery.allUpcomingDatesYaml.edges.find(({node}) => node.fields.lang === lang);
    if (content) content = content.node;
    else return null;
    useEffect(() => {
        const getData = async () => {
            let resp = await fetch(`https://breathecode.herokuapp.com/v1/admissions/cohort/all?upcoming=true`);
            // let resp = await fetch(`${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true`);
            let cohorts = await resp.json();
            setData(oldData => ({
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
        <GridContainer padding_tablet="0" margin_tablet="0 0 48px 0">
            <Div flexDirection="column">
                <Div padding="0 0 30px 0" style={{borderBottom: "1px solid black"}} justifyContent_md="between" flexDirection="column" flexDirection_tablet="row" alignItems_tablet="center">
                    <H3 textAlign="left" width="188px">Next Dates</H3>
                    <Button outline width="100%" width_md="314px" color={Colors.black} margin="19px 0 10px 0" textColor="white">APPLY NOW</Button>
                </Div>
                {Array.isArray(data.cohorts.all) && data.cohorts.all.map((m, i) => {
                    return (
                        i < 4 &&
                        <Div key={i} flexDirection="column" flexDirection_tablet="row" style={{borderBottom: "1px solid black"}} padding="30px 0" justifyContent="between" >
                            <Div flexDirection_tablet="column" alignItems="center" alignItems_tablet="start" margin="0 0 10px 0">
                                <H4 textAlign="left" width="fit-content" margin="0 10px 0 0" fontWeight="700" lineHeight="22px">ENERO</H4>
                                <Paragraph textAlign="left" fontWeight="700">09/01 al 13/03</Paragraph>
                            </Div>
                            <Div flexDirection="column" margin="0 0 20px 0">
                                <H4 textAlign="left" textTransform="uppercase">{content.info.program_label}</H4>
                                <Paragraph textAlign="left" color={Colors.blue}>{m.syllabus.certificate.name}</Paragraph>
                            </Div>
                            <Div flexDirection="column" display="none" display_tablet="flex" >
                                <H4 textAlign="left" textTransform="uppercase">{content.info.location_label}</H4>
                                <Paragraph textAlign="left" color={Colors.blue}>{m.academy.city.name}</Paragraph>
                            </Div>
                            <Div flexDirection="column" display="none" display_tablet="flex">
                                <H4 textAlign="left" textTransform="uppercase">{content.info.duration_label}</H4>
                                <Paragraph textAlign="left">{content.info.duration_weeks}</Paragraph>
                            </Div>
                            <Div display="flex" display_tablet="none" justifyContent="between" margin="0 0 20px 0">
                                <Div flexDirection="column" width="50%">
                                    <H4 textAlign="left" textTransform="uppercase">{content.info.location_label}</H4>
                                    <Paragraph textAlign="left" color={Colors.blue}>{m.academy.city.name}</Paragraph>
                                </Div>
                                <Div flexDirection="column" width="50%">
                                    <H4 textAlign="left" textTransform="uppercase">{content.info.duration_label}</H4>
                                    <Paragraph textAlign="left">{content.info.duration_weeks}</Paragraph>
                                </Div>
                            </Div>
                            <Div flexDirection="column">
                                <Button width="fit-content" color={Colors.black} margin="10px 0" textColor="white">APPLY NOW</Button>
                            </Div>
                        </Div>
                    )
                })}
                <Link to={content.footer.button_link}><Paragraph margin="20px 0" color={Colors.blue}>{content.footer.button_text}</Paragraph></Link>
            </Div>
        </GridContainer >
    )
};

export default UpcomingDates;