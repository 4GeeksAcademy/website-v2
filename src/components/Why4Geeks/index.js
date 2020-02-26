import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Title, H3, H4, Paragraph} from '../Heading'
import {Container, Cont, Column, Row, Divider} from '../Sections'
import {Address, HandMoney, Laptop, Colors, RoundImage} from '../Styling'

export default () => {
  const data = useStaticQuery(graphql`
      query myQueryWhy{
          why: allWhy4GeeksYaml {
            edges {
              node {
                heading
                sub_heading
                why {
                  title
                  description
                  image
                  slug
                }
              }
            }
          }
        }
      `)
  const info = data.why.edges[0].node;
  return (
    <>
      <Title
        title={info.heading}
        primary
      />
      <Divider height="50px" />
      <Row>
        {info.why.map((i, index) => (
          <Column size="4" key={index}>
            <RoundImage
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
            />
            <Row align="around" marginTop="20px">
              <Column size size="2" customRespSize respSize="2" alignSelf="center">
                {(i.slug === "job-in-tech") && <Address width="48" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.slug === "finance-your-career") && <HandMoney width="48" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.slug === "never-code-alone-again") && <Laptop width="48" color={Colors.yellow} fill={Colors.yellow} />}
              </Column>
              <Column size size="8" customRespSize respSize="8" alignSelf="center">
                <H4 uppercase>{i.title}</H4>
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


