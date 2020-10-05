import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Row, Container, Column, Divider} from '../Sections'
import {H1, H2, H3, H4, H5, Title, Separator, Span, Paragraph} from '../Heading';
import {Colors, Address, Teacher, Glasses, Clock, Users, Comments, Button, RoundImage} from '../Styling';
import {Card} from '../Card';

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
const Events = ({ }) => {
    const [event, setEvent] = useState([])
    useEffect(() => {
        const loadEvents = async () => {
            fetch(
                'https://assets.breatheco.de/apis/event/all',
            )
                .then(response => response.json())
                .then(data => setEvent(data))
        }
        loadEvents();
    }, []);
    let today = new Date();
    let newEventArray = event.filter((item) => new Date(item.event_date).getTime() >= today.getTime())
    return (
        <>


            {newEventArray != 0 && <Title
                size="10"
                title="UPCOMING EVENTS"
                variant="primary"
            />}

            <Carousel showIndicators={false} showThumbs={false} showStatus={false}>

                {event &&
                    newEventArray.map((item, index) => {
                        let date = new Date(item.event_date)
                        return (
                            // STARTED NEW LAYOUT
                            <Card key={index} borders="1.25rem" height="260px">
                                <Row
                                    height="100%"
                                    marginLeft="0"
                                    marginRight="0"
                                    customRespSize
                                >
                                    <Column size="5" customRespSize respSize="6" alignSelf="center" height="100%" image="no" borderRadius="0 0 0 1.25rem">
                                        <Row align="center" height="100%">
                                            <Column size="9" height="100%">
                                                <Divider height="30px" />
                                                <Row height="60px">
                                                    <H3 align="left" >{item.title}</H3>
                                                </Row>
                                                <Row height="30px">
                                                    <Separator variant="primary" />
                                                </Row>
                                                <Row height="20px">
                                                    <Column size="2" customRespSize respSize="4" paddingLeft="0px">
                                                        <Paragraph color={Colors.gray} fontSize="14px" align="left" >Date:</Paragraph>
                                                    </Column>
                                                    <Column size="6" customRespSize respSize="6">
                                                        <Paragraph color={Colors.gray} fontSize="14px" align="left" >{days[date.getDay()]}, {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Paragraph>
                                                    </Column>
                                                </Row>
                                                <Row height="20px">
                                                    <Column size="2" customRespSize respSize="4" paddingLeft="0px">
                                                        <Paragraph color={Colors.gray} fontSize="14px" align="left" >Time:</Paragraph>
                                                    </Column>
                                                    <Column size="6" customRespSize respSize="6">
                                                        <Paragraph color={Colors.gray} fontSize="14px" align="left" >{date.getHours()}pm</Paragraph>
                                                    </Column>
                                                </Row>
                                                <Row height="50px">
                                                    <Column size="2" customRespSize respSize="4" paddingLeft="0px">
                                                        <Paragraph color={Colors.gray} fontSize="14px" align="left" >City:</Paragraph>
                                                    </Column>
                                                    <Column size="5" customRespSize respSize="6" >
                                                        <Paragraph color={Colors.gray} fontSize="14px" align="left" >{item.city_slug}</Paragraph>
                                                    </Column>

                                                </Row>
                                                <Row height="100px">
                                                    <a href={item.url} target="_blank"  rel="noopener noreferrer nofollow">
                                                        <Button outline color={Colors.blue} textColor={Colors.black} padding=".35rem.85rem">MORE DETAILS</Button>
                                                    </a>
                                                </Row>
                                            </Column>
                                        </Row>

                                    </Column>
                                    <Column size="7" customRespSize respSize="6" alignSelf="center" width="100%" height="100%" border="custom" borderRadius="0 1.25rem 1.25rem 0" image="yes" url={item.banner_url} backgroundSize="cover" >

                                    </Column>
                                </Row>
                            </Card>



                        )
                    })

                }
            </Carousel>


        </>
    )
};

export default Events;


