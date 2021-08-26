import React from 'react';
import {Link, StaticQuery} from "gatsby";
import styled from 'styled-components';
import Layout from '../global/Layout';
import {Img} from "../new_components/Styling"

const Heading = styled.h1`
  font-family: 'Lato-Bold', sans-serif;
  
  text-align: center;
  font-size: 30px;
  margin: 0 0 50px 0;
  `;
const Div = styled.div`
  font-family: 'Lato-Bold', sans-serif;
  
  text-align: center;
  margin: 130px 0 40px 0;
  `;
const Heading2 = styled.h2`
  font-family: 'Lato-Bold', sans-serif;
  
  margin: 40px 0;
  text-align: center;
  font-size: 25px;
`;
const Anchor = styled(Link)`
  cursor: pointer;
  text-decoration: underline;
`;
const Table = styled.table`
font-family: 'Lato-Bold', sans-serif;
text-align: left;
margin: auto;
max-width: 700px;
th{
    font-weight: 500;
    text-transform: capitalize;
}
td, th{
    padding: 5px;
}
tr:hover{
    background: #FBFBFB;
}
`;
const NotFoundPage = () =>
  <StaticQuery
    query={graphql`
      query LandingQuery {
        allLandingYaml(sort: {fields: meta_info___utm_location, order: ASC}) {
            edges {
              node {
                meta_info {
                  slug
                  utm_course
                  utm_location
                }
                fields {
                    lang
                }
              }
            }
        }
      }
    `}
    render={data => {
      const landings = data.allLandingYaml.edges;
      return <Layout
        seo={{
          slug: 'landings',
          title: 'Landing Pages - 4Geeks Academy',
          description: 'Landing Pages 4Geeks Academy',
          image: "",
          keywords: []
        }}
        context={{
          lang: "us"
        }}
      >
        <Div>
          <Heading>Landing Pages</Heading>
          <Table>
            <thead>
              <tr>
                <th scope="col">slug</th>
                <th scope="col">location</th>
                <th scope="col">course</th>
              </tr>
            </thead>
            <tbody>
              {landings && landings.map(({node}) =>
                <tr>
                  <td><Anchor to={`/${node.fields.lang}/landing/${node.meta_info.slug}`}>{node.meta_info.slug}</Anchor></td>
                  <td>{node.meta_info.utm_location}</td>
                  <td>{node.meta_info.utm_course}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Div>
      </Layout>
    }}
  />;
export default NotFoundPage;
