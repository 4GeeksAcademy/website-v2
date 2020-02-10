import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Column} from '../Sections';
import {Paragraph} from '../Heading';
import {Colors} from '../Styling';
import Select from 'react-select';
import {SessionContext} from '../../session'

const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
];

const ProgramSelector = () => {

    const data = useStaticQuery(graphql`
      query myQueryProgram{
          loc: allLocationsYaml{
            edges{
              node{
                city
                slug
                name
                latitude
                longitude
                country
              }
            }
          }
        }
      `)
    const {session, setSession} = useContext(SessionContext);
    const [location, setLocation] = useState();
    const [weeks, setWeeks] = useState();

    console.log(data.loc.edges)
    return (
        <Row align="" center>
            <Column size="12" alignSelf="center">
                <Row>
                    <Column size="2" align="center"><Paragraph color={Colors.black} >It takes just </Paragraph></Column>
                    <Column size="3" align="center">
                        <Select

                            value={session.location}
                            onChange={e => setWeeks(e.target.value)}
                            options={data.loc.edges}
                        />
                    </Column>
                    <Column size="2" align="center"><Paragraph color={Colors.black} >weeks in</Paragraph></Column>
                    <Column size="3" align="center">
                        <Select
                            defaultInputValue={session.location}
                            className="testy"
                            onChange={e => setWeeks(e.target.value)}
                            // value={location != undefined && location.region_name === "Florida" && "Miami"}
                            options={options}
                        /></Column>
                    <Column size="2" align="center"><Paragraph color={Colors.black} >to become a</Paragraph></Column>
                </Row>
                <Row></Row>
                <Row></Row>
                <Row></Row>
            </Column>

        </Row>

    )
};

export default ProgramSelector;