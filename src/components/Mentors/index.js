import React, {useState} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {RoundImage} from '../Styling';
import {Row, Column} from '../Sections'
import {Card} from '../Card'
import ReactCardFlip from 'react-card-flip';


const Mentors = props => {
    const [isFlipped, setIsFlipped] = useState(false);

    const data = useStaticQuery(graphql`
        query myStaffQuery{
            staff: allStaffYaml {
                edges {
                  node {
                    name
                    last_name
                    image
                  }
                }
              }
            }
        `)

    return (
        <>
            <Row>
                {data.staff.edges.map((item, index) => {
                    return (
                        //     <ReactCardFlip key={index} isFlipped={isFlipped} flipDirection="vertical">
                        //         <RoundImage onMouseOver={() => setIsFlipped(!isFlipped)} mb="20px" url={item.node.image} bsize="cover" border="10px" width="100%" height="250px" move up={props.up}> </RoundImage>
                        //         <RoundImage onMouseOver={() => setIsFlipped(!isFlipped)} mb="20px" url={item.node.last_name} bsize="cover" border="10px" width="100%" height="250px" move up={props.up}> </RoundImage>
                        //     </ReactCardFlip>
                        // )
                        <Column size="3" customRespSize respSize="6" margin="10px 0" >
                            <RoundImage onMouseOver={() => setIsFlipped(!isFlipped)} mb="20px" url={item.node.image} bsize="cover" border="10px" width="100%" height="250px" move up={props.up}> </RoundImage>
                        </Column>)
                })}
            </Row>
        </>
    )
}

export default Mentors;