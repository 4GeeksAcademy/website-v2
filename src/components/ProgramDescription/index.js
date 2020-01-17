import React from 'react';
import styled from 'styled-components';
import {Card} from '../Card'
import {Row} from '../Sections'
import {H5, Paragraph} from '../Heading'
import {Button, Colors} from '../Styling'

const Header = styled.div`
    background: black;
    border-radius: 1.25rem 1.25rem 0 0;
    height: 85px;
    color: white;
    font-family: 'lato', sans-serif;
    font-size: 14px;
    font-weight: 800;
    align-items: center;
`;

const Body = styled.div`
    background: white;
    height:400px;
    padding: 50px;
`


const ProgramDescription = () => (
    <Card width="100%" height="600px" color="white" shadow>
        {/* <Row marginLeft="0px" marginRight="0px" background="black"> */}
        <Header>
            <ul className="nav  nav-fill">
                <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#homes" role="tab" aria-controls="home" aria-selected="true" >PREWORK</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="true" href="#profile">MODULE 1</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">MODULE 2</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" tabindex="-1" aria-disabled="true">MODULE 3</a>
                </li>
            </ul>
        </Header>
        <Body>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="homes" role="tabpanel" aria-labelledby="home-tab">
                    <H5 fontSize="20px">PREWORK</H5>
                    <Paragraph primary margin="35px 0 15px" fontSize="14px" lineHeight="18px">
                        Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.
                        Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </Paragraph>
                    <Paragraph primary fontSize="14px" lineHeight="18px">
                        Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.
                        Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.
            </Paragraph>
                    <Button color={Colors.blue} textColor={Colors.white} margin="15px 0">DOWNLOAD SYLLABUS</Button>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Paolo</div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
            </div>

        </Body>

        {/* </Row> */}
    </Card >
);

export default ProgramDescription;
