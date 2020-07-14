import React, {useState, useEffect, useContext} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H2, H3, H4, H5, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Colors, Button, RoundImage, Address, Marker, Clock, Plus, Minus} from '../components/Styling'
import {Card} from '../components/Card'
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import BaseRender from './_baseRender'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'gatsby-link'
import {SessionContext} from '../session'

const Faq = (props) => {
    const {data, pageContext, yml} = props;
    const [buttonToggle, setButtonToggle] = useState(false);
    const [toggleIndex, setToggleIndex] = useState();
    console.log("FAQ: ", yml)
    const {session, setSession} = useContext(SessionContext);
    return (
        <><Wrapper
            style="default"
            image="yes"
            url={yml.banner.image}
            border="bottom"
            height="300px"
            backgroundSize="cover"
        >
            <Divider height="100px" />
            <Title
                size="5"
                title={yml.banner.tagline}
                main
                color={Colors.white}
                fontSize="46px"
                textAlign="center"
            />
        </Wrapper>
            <Divider height="50px" />
            <Wrapper
                style="default">
                {yml.faq.map((item, index) => {
                    return (
                        <Row key={index}>
                            <Column>
                                <Card
                                    color={buttonToggle && index == toggleIndex && "grey"}
                                    height="auto"
                                    width="100%"
                                    shadow
                                    padding="20px "
                                    // move="up"
                                    // up="50%"
                                    margin="5px 0 10px 0"
                                >
                                    <Row height="100%">
                                        <Column size="10" customRespSize respSize="10">
                                            <Row height={buttonToggle === false ? 'auto' : 'auto'} align="around">
                                                <Column size="10" customRespSize respSize="10" alignSelf="center">
                                                    <H4
                                                        fs_xs="18px"
                                                        fs_sm="20px"
                                                        fs_md="20px"
                                                        fs_lg="20px"
                                                        fs_xl="24px"
                                                        color={Colors.black}>{item.question}
                                                    </H4>

                                                </Column>
                                                <Column onClick={() => {setButtonToggle(!buttonToggle), setToggleIndex(toggleIndex != undefined ? undefined : index)}} size="2" customRespSize respSize="2" alignSelf="center">
                                                    {buttonToggle === false ?
                                                        toggleIndex != index &&
                                                        <Plus
                                                            width="32"
                                                            color={Colors.blue}
                                                            fill={Colors.blue}

                                                        />
                                                        :
                                                        buttonToggle === true && toggleIndex === index ?
                                                            < Minus
                                                                width="32"
                                                                color={Colors.blue}
                                                                fill={Colors.blue}

                                                            />
                                                            :
                                                            <Plus
                                                                width="32"
                                                                color={Colors.blue}
                                                                fill={Colors.blue}

                                                            />
                                                    }



                                                </Column>
                                            </Row>
                                            {buttonToggle === true && toggleIndex === index &&
                                                <Row height="auto" marginTop="10px">
                                                    <Column size="10" align="left">
                                                        <Paragraph
                                                            fontFamily="Lato-bold, sans-serif"
                                                            lineHeight="1rem">
                                                            {item.answer}
                                                        </Paragraph>
                                                    </Column>
                                                </Row>}
                                        </Column>

                                    </Row>
                                </Card>
                            </Column>
                        </Row>
                    )
                })
                }
            </Wrapper>
            <Divider height="50px" />
        </>
    )
}
export const query = graphql`
  query FaqsQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
          
          meta_info{
            slug
            title
            description
            image
            keywords
          }
          banner{
            tagline
            sub_heading
            image 
          }
          faq{
              question
              answer
          }
      
        }
      }
    }
  }
`;
export default BaseRender(Faq);