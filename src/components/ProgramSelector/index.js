import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Row, Column} from '../Sections';
import {Paragraph} from '../Heading';
import {Colors} from '../Styling';
import Select from 'react-select';

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
                state
              }
            }
          }
        }
      `)
    const [ip, setIp] = useState("ciao");
    const [location, setLocation] = useState();
    const [weeks, setWeeks] = useState();

    useEffect(() => {
        fetch(
            'http://api.ipstack.com/99.159.57.33?access_key=9b1771a432a0ca7c933a9a641b63bb00',
        )
            .then(response => response.json())
            .then(data => setLocation(data))
    }, []);
    return (
        <Row>
            <Column size="12">
                <Row>
                    <Column size="1" align="center"><Paragraph color={Colors.black} >It takes just </Paragraph></Column>
                    <Column size="1" align="center">
                        <Select
                            value={weeks}
                            onChange={e => setWeeks(e.target.value)}
                            options={options}
                        />
                    </Column>
                    <Column size="1" align="center"><Paragraph color={Colors.black} >weeks in</Paragraph></Column>
                    <Column size="1" align="center">
                        <Paragraph color={Colors.black} >

                        </Paragraph></Column>
                    <Column size="1" align="center"><Paragraph color={Colors.black} >to become a</Paragraph></Column>
                </Row>
                <Row></Row>
                <Row></Row>
                <Row></Row>
            </Column>

        </Row>

    )
};

export default ProgramSelector;