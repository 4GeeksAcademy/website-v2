import React from 'react';
import Layout from '../global/Layout';
import {Divider, Column} from "../components/Sections"
import {Title} from '../components/Heading'

const Partners = () => (
  <Layout>
    <div className="container-fluid">
      <div className="row">
        <Column size="1" />
        {/* <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div> */}
        {/* <div className="col-12 col-lg-11 col-md-11 col-sm-12 col-xl-11"> */}
        <Column size="11">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
            <Column border size="11" padding="20%" image url="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80" height="600px">
              <Title
                title="COMPANIES TRUST US AND HIRE OUR STUDENTS"
                paragraph="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
                style=""
              />
            </Column>
          </div>
        </Column>
      </div>
    </div>
  </Layout>
);

export default Partners;