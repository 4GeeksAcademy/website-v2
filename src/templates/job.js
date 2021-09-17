import React, {useState, useEffect, useContext} from 'react';
import {graphql} from 'gatsby'
import styled from 'styled-components';
import Icon from '../new_components/Icon'
import {GridContainer, Div} from '../new_components/Sections'
import {Title, H1, H2, H3, H4, Span, Paragraph, Separator} from '../new_components/Heading'
import {Button, Colors} from '../new_components/Styling'
import BaseRender from './_baseLayout'
import {Link} from 'gatsby';
import {applyJob} from "../actions";

const Input = styled.input`
    background-color:${Colors.lightGray};
    height: 40px;
    width: 100%;
    border: none;
    font-family: 'Lato', sans-serif;
    
    font-size: 14px;
    font-color: ${Colors.black};
`
const Job = ({data, pageContext, yml}) => {
    const [form, setForm] = useState(false);
    const [buttonToggle, setButtonToggle] = useState();
    const [formData, setVal] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });
    return (
        <>
            <GridContainer
                github="/components/privacy"
                columns_tablet="12"
                margin_tablet="50px 0 0 0"
                margin="25px 0 0 0"

            >
                <Div flexDirection="column" gridColumn_tablet=" 2 / 12">

                    <Link to={yml.link_back}><Icon icon="arrowleft" width="32" color={Colors.blue} fill={Colors.blue} /></Link>
                    <Div alignItems="center">
                        <H1 type="h1" textAlign="left" zIndex="5" fontSize="30px" lineHeight="36px" fontWeight="700" margin="16px 0px 19px 0px">
                            {yml.banner_heading}
                        </H1>
                        <Button variant="full" color={Colors.blue} textColor={Colors.white}>{yml.button_text}</Button>
                        {/* <Button onClick={() => {setForm(!form), setButtonToggle(!buttonToggle)}} width="200px" color={Colors.blue} textColor={Colors.white}>APPLY NOW</Button> */}
                    </Div>
                    <Div flexDirection="column">
                        {yml.content.map((m, i) => {
                            return (
                                <>
                                    <H4 textAlign="left" fontSize="22px" lineHeight="26px" key={i} fontWeight="700" borderBottom="1px solid #C4C4C4" margin="0 0 15px 0" padding="74px 0 20px 0">{m.label}</H4>
                                    <ul>
                                        {m.list.map((item, i) => {
                                            return (
                                                <li key={i}><Paragraph textAlign="left" margin="10px 0" color={Colors.gray} align="left" fontSize="14px">{item}</Paragraph></li>
                                            )
                                        })}
                                    </ul>
                                </>
                            )
                        })}
                    </Div>
                    <Paragraph letterSpacing="0.05em" margin="45px 0 0 0" dangerouslySetInnerHTML={{__html: yml.date_release}}></Paragraph>
                </Div>
            </GridContainer>
        </>
    )
};

export const query = graphql`
  query JobQuery($file_name: String!, $lang: String!) {
    allJobYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            seo_title
            meta_info{
                title
                description
                image
                keywords
            }
            banner_heading
            link_back
            banner_image
            button_text
            cities
            title
            description
            content{
                label
                list
            }
            
        }
      }
    }
  }
`;

export default BaseRender(Job);
