import React from 'react';
import Layout from '../global/Layout';
import {Divider, Column} from "../components/Sections"

const Partners = () => (
  <Layout>
    {/* TEST */}
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
        <div className="col-12 col-lg-11 col-md-11 col-sm-12 col-xl-11 bg-info">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>

            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xl-9 imm">
              content
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* TEST */}
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
        <div className="col-12 col-lg-11 col-md-11 col-sm-12 col-xl-11 bg-light">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1 bg-info"></div>
            <Column url="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80" height="300px">my content</Column>
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