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
                title
                description
                image
                slug
              }
            }
          }
        }
      `)
  return (
    <>
      <Title
        title="WHY 4GEEKS?"
        primary
      />
      <Divider height="50px" />
      <Row>
        {data.why.edges.map((i, index) => (
          <Column size="4" key={index}>
            <RoundImage url={i.node.image} bsize="cover" mb="10px" height="200px" border="1.25rem"></RoundImage>
            <Row align="around" marginTop="20px">
              <Column size size="2" customRespSize respSize="2" alignSelf="center">
                {(i.node.slug === "job-in-tech") && <Address width="48" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.node.slug === "finance-your-career") && <HandMoney width="48" color={Colors.yellow} fill={Colors.yellow} />}
                {(i.node.slug === "never-code-alone-again") && <Laptop width="48" color={Colors.yellow} fill={Colors.yellow} />}
              </Column>
              <Column size size="8" customRespSize respSize="8" alignSelf="center">
                <H4 uppercase>{i.node.title}</H4>
              </Column>
            </Row>
            <Row>
              <Column size="12">
                <Paragraph color="gray" align="left" margin="10px 0" fontSize="12px">{i.node.description}</Paragraph>
              </Column>
            </Row>
          </Column>
        ))}
      </Row>
    </>
  )
}


