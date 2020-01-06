import React from 'react';
import Layout from '../global/Layout';
import {Column, Row, Container, Divider} from "../components/Sections"
import {H2} from '../components/Heading'
import {Button, Colors} from '../components/Styling'

const Careers = () => (
    <Layout>
        <Container fluid height="200px">
            <Row>
                <Column size="1" />
                <Column border size="11" padding="7% 0" image url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80" height="100%">
                    <Row>
                        <Column size="2" />
                        <Column size="4">
                            <H2 uppercase color={Colors.white}>Open Jobs at 4geeks academy</H2>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Container>
        <Container fluid>
            <Row>
                <Column size="1" />
                <Column size="11" >
                    <Row>
                        <Column size="2" />
                        <Column size="4">

                        </Column>
                    </Row>
                </Column>
            </Row>
        </Container>
    </Layout>
);

export default Careers;