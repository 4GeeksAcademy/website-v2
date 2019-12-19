import React from 'react';
import styled from 'styled-components';
import {useStaticQuery, graphql} from 'gatsby';
import {Title} from '../Heading'
import {Container, Cont, Col, Row, Divider} from '../Sections'
import {Address, HandMoney, Laptop, Colors} from '../Styling'

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
        style="light"
      />
      <Row>
        <div className="col-lg-8 offset-lg-1 text-center">
          <Row>
            {data.why.edges.map(i => (
              <div className="col-md-4 col-sm-12">
                <div className="card-why4 p-3 text-center row">
                  <img src={i.node.image} width="100%" height="150" />
                </div>
                <div className=" px-3 row">
                  <div className="col-md-3 col-sm-2 icons">
                    {(i.node.slug === "job-in-tech") && <Address width="48" color={Colors.blue} fill={Colors.blue} />}
                    {(i.node.slug === "finance-your-career") && <HandMoney width="48" color={Colors.blue} fill={Colors.blue} />}
                    {(i.node.slug === "never-code-alone-again") && <Laptop width="48" color={Colors.blue} fill={Colors.blue} />}
                  </div>
                  <div className="col-md-9 col-sm-10 text-why pr-0">{i.node.title}</div>
                </div>
                <div className=" text-center row mt-2">
                  <div className="text-why-p">{i.node.description}</div>
                </div>
              </div>
            ))}
          </Row>
        </div>
      </Row>
    </>
  )
}

