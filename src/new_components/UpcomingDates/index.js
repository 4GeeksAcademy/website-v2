import React, {useState, useEffect, useContext} from 'react';
import {GridContainer, Div, Grid} from '../Sections'
import {H2, H3, H4, H5, Paragraph} from '../Heading'
import {Colors, Button, Img, Anchor} from '../Styling'
import dayjs from "dayjs"
import 'dayjs/locale/de'
import LazyLoad from 'react-lazyload';
import {Link} from 'gatsby'
import {SessionContext} from '../../session'

const UpcomingDates = ({lang}) => {
    const {session} = useContext(SessionContext);

    const [data, setData] = useState({
        cohorts: {catalog: [], all: [], filtered: []}
    });
    const [academy, setAcademy] = useState(null)
    const [filterType, setFilterType] = useState({label: "Upcoming Courses and Events", value: "cohorts"});

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
                        <Div key={i} flexDirection="column" flexDirection_md="row" style={{borderBottom: "1px solid black"}} padding="30px 0" justifyContent="between" >
                            <Div flexDirection_md="column" alignItems="center" alignItems_md="start">
                                <H4 textAlign="left" width="fit-content" margin="0 10px 0 0" fontWeight="700" lineHeight="22px">ENERO</H4>
                                <Paragraph textAlign="left" fontWeight="700">09/01 al 13/03</Paragraph>
                            </Div>
                            {/* <Div > */}
                            <Div flexDirection="column">
                                <H4 textAlign="left">LOCATION</H4>
                                <Paragraph textAlign="left" color={Colors.blue}>{m.academy.city.name}</Paragraph>
                            </Div>
                            <Div flexDirection="column">
                                <H4 textAlign="left">DURATION</H4>
                                <Paragraph>16 weeks</Paragraph>
                            </Div>
                            {/* </Div> */}
                            <Div flexDirection="column">
                                <Button width="200px" color={Colors.black} margin="10px 0" textColor="white">APPLY NOW</Button>
                            </Div>
                        </Div>
                    )
                })}
                <Paragraph margin="20px 0" color={Colors.blue}>See more dates</Paragraph>
            </Div>
        </GridContainer >
    )
};

export default UpcomingDates;