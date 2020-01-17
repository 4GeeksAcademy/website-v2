import React from 'react';
import styled from 'styled-components';
import {Card} from '../Card'
import {Row} from '../Sections'
import {H5, Paragraph} from '../Heading'

const Header = styled.div`
    background: black;
    border-radius: 1.25rem 1.25rem 0 0;
    height: 75px;
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
                    <a className="nav-link active" href="#">PREWORK</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">MODULE 1</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">MODULE 2</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">MODULE 3</a>
                </li>
            </ul>
        </Header>
        <Body>
            <H5 fontSize="20px">PREWORK</H5>
            <Paragraph primary margin="35px 0 15px">
                Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.
                Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </Paragraph>
            <Paragraph primary>
                Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.
                Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.
                Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </Paragraph>
        </Body>

        {/* </Row> */}
    </Card>
);

export default ProgramDescription;
