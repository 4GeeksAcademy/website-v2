import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Title, H3, H4, Paragraph} from '../Heading'
import {Container, Cont, Column, Row, Divider} from '../Sections'
import {Address, HandMoney, Laptop, Colors, RoundImage} from '../Styling'
import {Player, PosterImage, ControlBar, BigPlayButton} from 'video-react';
import ReactPlayer from 'react-player'

export default (props) => {
  const info = props.lang[0].node;
  return (
    <>
      <Title
        title={info.heading}
        primary
      />
      <Divider height="50px" />
      {/* <Row height="180px">
        {info.why.map((v, t) => {
          return (
            <Column size="4">
              <ReactPlayer
                className='react-player'
                light={v.image}
                controls={true}
                url={v.video}
                width='100%'
                height='100%'
              />
            </Column>
          )
        })}
      </Row> */}

      <Row height="auto">
        {info.why.map((i, index) => (
          <Column size="4" key={index}>
            <ReactPlayer
              className='react-player'
              light={i.image}
              controls={true}
              url={i.video}
              width='100%'
              height='100%'
            />
            {/* <RoundImage
              url={i.image}
              bsize="cover"
              mb="10px"
              border="1.25rem"
              position="center"
              h_xs="150px"
              h_sm="200px"
              h_md="140px"
              h_lg="170px"
              h_xl="180px"
            /> */}
            <Row align="around" marginTop="20px">
              <Column size size="2" p_xs="0 5px 0 0" p_sm="0 5px 0 0" customRespSize respSize="2" t_align="right" alignSelf="center">
                {(i.slug === "job-in-tech" || i.slug === "trabaja-en-tecnologia") && <Address width="32" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.slug === "finance-your-career" || i.slug === "financiamos-tu-carrera") && <HandMoney width="32" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.slug === "never-code-alone-again" || i.slug === "nunca-programes-solo-otra-vez") && <Laptop width="32" color={Colors.yellow} fill={Colors.yellow} />}
              </Column>
              <Column size size="8" p_xs="0" p_sm="0" customRespSize respSize="10" alignSelf="center" >
                <H4
                  align="left"
                  uppercase
                  fs_xs="20px"
                  fs_sm="24px"
                  fs_md="14px"
                  fs_lg="18px"
                  fs_xl="20px"
                >{i.title}</H4>
              </Column>
            </Row>
            <Row>
              <Column size="12">
                <Paragraph color="gray" align="left" margin="10px 0" fontSize="12px">{i.description}</Paragraph>
              </Column>
            </Row>
          </Column>
        ))}
      </Row>
    </>
  )
}