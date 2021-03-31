import React from 'react'
import {navigate} from 'gatsby'
import { H1, H2, H3, H4, Title, Separator, Paragraph, Span } from '../../Heading'
import { Grid, Div, Header, Container, Row, Column, Divider, Wrapper, WrapperImage } from '../../Sections'
import styled from "styled-components"
import { Colors, Button } from '../../Styling'

//Este componente es usado por la pagina blog.js
const CareerInfo = ({ yml, story_posts, page_context }) => {
    
  const Boton = styled.button`    
    border: 1px solid gray;
    border-radius: 3px;
    color: #3A3A3A;
    cursor: pointer;
    display: inline-block; 
    font-family: 'Lato';
    font-weight: 700;
    font-size: 13px;
    height: 40px;
    letter-spacing: 1px;
    margin: 0px 10px 25px 10px; 
    padding: 0 20px 0 20px; 
    text-transform: uppercase;   
    &:hover {
      color: ${Colors.blue};       
    };
  `  
  function go(txt){
 
    let lang = 'es'
 
    navigate('/careerinfo/', { state: { yml, story_posts, page_context } });
    
  };
 
  return (
    <> 
      
        <Grid background={Colors.lightGray} height="auto" width="100%" columns="1" padding="0px 175px 0px 175px">
          
          <Div margin="56px 0 0 0">
            <H2>
              {yml.question}
            </H2>
          </Div>
                
          <Div width="100%" margin="auto" textAlign="center" justifyContent="center" padding="45px 0px 40px 0px" style={{ zIndex: 1, flexWrap: 'wrap' }}>
            {
              yml.topics.map((topic, i) => {
                return <Boton margin="0 7px 0 8px" onClick={() => go(topic)}>{topic}</Boton>
              })
            }
          </Div>

        </Grid>

    </>
  )
}

export default CareerInfo;

