import React, {useState} from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {RoundImage} from '../Styling';
import {Row, Column} from '../Sections'
import {Card} from '../Card'

const styles = {
    container: {
        position: 'relative',
        '&:hover': {
            opacity: '1'
        }
    },
    overlay:
    {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        height: '100%',
        width: '100%',
        opacity: '0',
        transition: '.5s ease',
        backgroundColor: '#008CBA',
        '&:hover': {
            opacity: '1'
        }

    },

    text:
    {
        color: 'black',
        fontSize: '20px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        textAlign: 'center',
    }

}

const Mentors = props => {

    const data = useStaticQuery(graphql`
        query myStaffQuery{
            allStaffYaml {
                edges {
                  node {
                    staff {
                      name
                      last_name
                      nick_name
                      slug
                      job_title
                      github
                      linkdin
                      twitter
                      website
                      image
                      age
                      location
                      interests
                      coding_skills
                    }
                  }
                }
              }
            }
        `)
    let staff = data.allStaffYaml.edges;
    function Over () {

    }
    return (
        <>
            <Row>
                {staff[0].node.staff.map((item, index) => {
                    return (
                        <>
                            {/* <Column style={styles.container} key={index} size="3" customRespSize respSize="6" margin="10px 0" >
                                <RoundImage mb="20px" url={item.image} bsize="cover" border="10px" width="100%" height="250px" move up={props.up}> </RoundImage>
                            </Column> */}
                            <Column style={styles.container} key={index} size="3" customRespSize respSize="6">
                                <RoundImage mb="20px" url={item.image} bsize="cover" border="10px" width="100%" height="250px" move up={props.up}> </RoundImage>
                                <div style={styles.overlay}>
                                    <div style={styles.text}>Hello World</div>
                                </div>
                            </Column>
                        </>
                    )
                })}
            </Row>
        </>
    )
}

export default Mentors;