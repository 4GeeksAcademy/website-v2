import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Title, H3, H4, Paragraph} from '../Heading'
import {Container, Cont, Col, Row, Divider} from '../Sections'
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
        {data.why.edges.map(i => (
          <div className="col-md-4 col-sm-12">
            <RoundImage url={i.node.image} bsize="cover" mb="10px" height="200px" border="1.25rem"></RoundImage>
            <div className=" px-3 row">
              <div className="col-md-2 col-sm-2 col-2 p-0">
                {(i.node.slug === "job-in-tech") && <Address width="48" color={Colors.blue} fill={Colors.blue} />}
                {(i.node.slug === "finance-your-career") && <HandMoney width="48" color={Colors.blue} fill={Colors.blue} />}
                {(i.node.slug === "never-code-alone-again") && <Laptop width="48" color={Colors.blue} fill={Colors.blue} />}
              </div>
              <div className="col-md-10 col-sm-10 col-10 pr-0"><H4 up>{i.node.title}</H4></div>
            </div>
            <Row>
              <Paragraph color="gray" align="center" margin="10px 0" fontSize="14px">{i.node.description}</Paragraph>
            </Row>
          </div>
        ))}
      </Row>
    </>
  )
}


