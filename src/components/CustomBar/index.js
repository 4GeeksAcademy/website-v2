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
    max-width: 650px;
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

const CustomBar = ({upcomingPath, position, showOnScrollPosition, button, lang}) => {
    const {session} = React.useContext(SessionContext);
    const [show, setShow] = useState(showOnScrollPosition == null)

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
            <Center>
                <P1 fontSize="30px">{button.heading}</P1>
            </Center>
            <Right>
                <Link to={button.link_to}><Button color={Colors.red} fs_sm="11px" textColor={Colors.white}>{button.button_text}</Button></Link>
            </Right>
        </Centered>
    </ShadowedRow>
    )
};
CustomBar.propTypes = {
    title: PropTypes.string,
    upcomingPath: PropTypes.string,
    applyPath: PropTypes.string,
    position: PropTypes.string,
    showOnScrollPosition: PropTypes.number
}
CustomBar.defaultProps = {
    title: "",
    upcomingPath: "/calendar",
    applyPath: "/apply",
    position: "static",
    showOnScrollPosition: null
};
export default CustomBar;
