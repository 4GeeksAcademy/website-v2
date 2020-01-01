import React from 'react';
import Layout from '../global/Layout';
import {Divider, Column} from "../components/Sections"

const Partners = () => (
  <Layout>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
        <div className="col-12 col-lg-11 col-md-11 col-sm-12 col-xl-11">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
            <Column image url="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80" height="600px">my content</Column>
            {/* <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xl-9 ">
              content
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default Partners;