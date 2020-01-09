import React from 'react';
import styled from 'styled-components';
import {Row, Container, Column} from '../Sections'
import {H5} from '../Heading'

const GeeksVsOthers = () => (
    <Row>
        <Column
            size="10"
        >
            <Row>
                <Column size="6">
                    <H5 fontSize="12px">FEATURED</H5>
                </Column>
                <Column size="3"><H5 fontSize="12px">AT 4GEEKS</H5></Column>
                <Column size="3"><H5 fontSize="12px">INDUSTRY AVERAGE</H5></Column>
            </Row>
        </Column>
    </Row>
);

export default GeeksVsOthers;