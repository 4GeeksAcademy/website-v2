import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Row, Container, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, Address, Teacher, Glasses, Clock, Users, Comments, Button, RoundImage} from '../Styling';
import {Card} from '../Card';
import Link from 'gatsby-link'

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]
const RecentPosts = () => {
    // const [event, setEvent] = useState([])
    // useEffect(() => {
    //     fetch(
    //         'https://assets.breatheco.de/apis/event/all',
    //     )
    //         .then(response => response.json())
    //         .then(data => setEvent(data))
    // }, []);
    // let today = new Date();
    // let newEventArray = event.filter((item) => new Date(item.event_date).getTime() >= today.getTime())
    return (
        <>
            <Title
                title=""
                paragraph=""
                primary
            />
            <Divider height="50px" />
            <Row>
                {info.why.map((i, index) => (
                    <Column size="4" key={index}>
                        <Row height="50%">
                            <RoundImage url={i.image} bsize="cover" mb="10px" height="200px" border="1.25rem 1.25rem 0 0"></RoundImage>
                        </Row>
                        <Row height="50%">
                            <Column size size="12" alignSelf="center">
                                <Row height="40%">
                                    <Column size="10"><H4 uppercase>{i.title}</H4></Column>
                                </Row>
                                <Row height="60%">
                                    <Column size="10"><H4 uppercase>{i.content}</H4></Column>
                                </Row>

                            </Column>
                        </Row>
                    </Column>
                ))}
            </Row>
        </>
    )
};

export default RecentPosts;
