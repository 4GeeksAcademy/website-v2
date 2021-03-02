import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types"
import dayjs from "dayjs";
import {SessionContext} from '../../session';
import {Colors, Button, Link, Anchor} from '../Styling';
import {Break} from '../Responsive';
import {useScrollPosition} from "./useScrollPosition"

const ShadowedRow = styled.div`
    background: #ececec;
    font-family: 'Lato-Bold', sans-serif;
    
    box-shadow: 0 0 16px 0 rgba(50,50,50,.3);
    height: 80px;
    padding: 10px;
    width: 100%;
    z-index: 101;
    position: ${props => props.position != "static" ? "fixed" : "static"};
    top: ${props => props.position == "top" ? "0" : 'inherit'};
    bottom: ${props => props.position == "bottom" ? "0" : 'inherit'};
    display: ${props => props.hide ? "none" : 'block'};
`;
const Centered = styled.div`
    max-width: 750px;
    display: flex;
    margin: auto;
`;

const Left = styled.div`
    width: 90px;
    display: block;
    @media ${Break.md}{
        display: none;
    }
`;
const Center = styled.div`
    width: 100%;
    text-align: center;
    font-weight: 900;
    @media ${Break.xs}{
        text-align: left;
    }
`;
const P1 = styled.p`
    font-size: 28px;
    font-weight: 900;
    @media ${Break.sm}{
        padding-top: 5px;
        font-size: 24px;
    }
    @media ${Break.xs}{
        padding-top: 10px;
        font-size: 18px;
    }
`
const P2 = styled.p`
    font-size: 20px;
    @media ${Break.sm}{
        font-size: 20px;
    }
    @media ${Break.xs}{
        font-size: 14px;
        width: 190px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden !important;
    }
    @media ${Break.xxs}{
        width: 160px;
    }
`
const Right = styled.div`
    width: 300px;
    padding-top: 5px;
`;

const UpcomingProgram = ({upcomingPath, position, showOnScrollPosition, button, lang}) => {
    const { session } = React.useContext(SessionContext);
    const location = session ? session.location : null;
    const [show, setShow] = useState(showOnScrollPosition == null)
    const [cohorts, setCohorts] = useState([])

    React.useEffect(() => {
        if(location) fetch(`${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true&academy=${location.breathecode_location_slug}`)
            .then(resp => resp.json())
            .then(upcoming => setCohorts(upcoming))
            .catch(error => console.error("Error loading cohorts", error))
    },[location])

    let title = "Full Stack Development"
    let date = dayjs()
    if (cohorts.length > 0) {
        date = dayjs(cohorts[0].kickoff_date).add(1,"hour")
        title = cohorts[0].syllabus ? cohorts[0].syllabus.certificate.name : ""
    }
    
    useScrollPosition(({prevPos, currPos}) => {
        if (showOnScrollPosition && showOnScrollPosition + currPos.y < 0) {
            if (!show) setShow(true)
        }
        else {
            if (showOnScrollPosition && show) setShow(false)
        }
    }, [show])

    return (<ShadowedRow width="100%" position={position} hide={!show}>
        <Centered>
            <Left>
                <CalendarIcon month={dayjs(date).format('MMM')} day={dayjs(date).format('D')} height="60px" />
            </Left>
            <Center>
                <P1 fontSize="30px">{button.next_cohort}{" "}{dayjs(date).format('MMM D, YYYY')}</P1>
                <P2 fontSize="18px">{title}</P2>
            </Center>
            <Right>
                <Link to={button.button_link}><Button color={Colors.red} fs_sm="11px" textColor={Colors.white}>{location && location.button.apply_button_text}</Button></Link>
                <p style={{textAlign: "center"}}><Anchor className="decorated" display="inline" to={upcomingPath}>{button.other_dates}</Anchor></p>
            </Right>
        </Centered>
    </ShadowedRow>
    )
};
UpcomingProgram.propTypes = {
    title: PropTypes.string,
    upcomingPath: PropTypes.string,
    applyPath: PropTypes.string,
    position: PropTypes.string,
    showOnScrollPosition: PropTypes.number
}
UpcomingProgram.defaultProps = {
    title: "",
    upcomingPath: "/calendar",
    applyPath: "/apply",
    position: "static",
    showOnScrollPosition: null
};
export default UpcomingProgram;

const CalendarIcon = ({month, day, height}) => <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 469.333 469.333" style={{enableBackground: "new 0 0 469.333 469.333", height}} xmlSpace="preserve">
    <path style={{fill: "#303C42"}} d="M469.333,85.333c0-23.531-19.146-42.667-42.667-42.667h-64v-32C362.667,4.771,357.896,0,352,0	c-5.896,0-10.667,4.771-10.667,10.667v32h-192v-32C149.333,4.771,144.563,0,138.667,0S128,4.771,128,10.667v32H42.667	C19.146,42.667,0,61.802,0,85.333v341.333c0,23.531,19.146,42.667,42.667,42.667h309.313v-0.004l0.021,0.004	c2.771,0,5.5-1.083,7.542-3.125l106.667-106.667c2.034-2.042,2.708-4.767,2.711-7.542h0.414V85.333z"></path>
    <path style={{fill: "#D32F2F"}} d="M42.667,64H128v21.333c-11.771,0-21.333,9.573-21.333,21.333S116.229,128,128,128	c11.771,0,21.333-9.573,21.333-21.333V64h192v21.333c-11.771,0-21.333,9.573-21.333,21.333S329.563,128,341.333,128	s21.333-9.573,21.333-21.333V64h64C438.438,64,448,73.573,448,85.333v64H21.333v-64C21.333,73.573,30.896,64,42.667,64z"></path>
    <g>
        <rect x="149.333" y="64" style={{opacity: 0.2, fill: "#FFFFFF", enableBackground: "new"}} width="192" height="10.667"></rect>
        <path style={{opacity: 0.2, fill: "#FFFFFF", enableBackground: "new"}} d="M42.667,74.667H128V64H42.667	c-11.771,0-21.333,9.573-21.333,21.333V96C21.333,84.24,30.896,74.667,42.667,74.667z"></path>
        <path style={{opacity: 0.2, fill: "#FFFFFF", enableBackground: "new"}} d="M426.667,64h-64v10.667h64C438.438,74.667,448,84.24,448,96	V85.333C448,73.573,438.438,64,426.667,64z"></path>
        <path style={{fill: "#FFFFFF"}} d="M341.333,384v64H42.667c-11.771,0-21.333-9.573-21.333-21.333v-256H448v170.667h-64	C360.479,341.333,341.333,360.469,341.333,384z"></path>
    </g>
    <path style={{fill: "#E6E6E6"}} d="M362.667,432.917V384c0-11.76,9.563-21.333,21.333-21.333h48.917L362.667,432.917z"></path>
    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-61.0365" y1="621.1511" x2="-47.0365" y2="607.1511" gradientTransform="matrix(21.3333 0 0 -21.3333 1430.1112 13315.2227)">
        <stop offset="0" style={{stopColor: "#000000", stopOpacity: 0.1}}></stop> <stop offset="1" style={{stopColor: "#000000", stopOpacity: 0}}></stop>
    </linearGradient>
    <g>
        <text x="130" y="330" style={{fontWeight: "bold", fontSize: "200px", fill: "#303C42"}}>{day}</text>
        <text x="140" y="420" style={{fontWeight: "bold", fontSize: "95px", fill: "#303C42"}}>{month.toUpperCase()}</text>
    </g>
    <path style={{fill: "url(#SVGID_2_)"}} d="M469.333,85.333c0-23.531-19.146-42.667-42.667-42.667h-64v-32C362.667,4.771,357.896,0,352,0	c-5.896,0-10.667,4.771-10.667,10.667v32h-192v-32C149.333,4.771,144.563,0,138.667,0S128,4.771,128,10.667v32H42.667	C19.146,42.667,0,61.802,0,85.333v341.333c0,23.531,19.146,42.667,42.667,42.667h309.313v-0.004l0.021,0.004	c2.771,0,5.5-1.083,7.542-3.125l106.667-106.667c2.034-2.042,2.708-4.767,2.711-7.542h0.414V85.333z"></path>
</svg>;