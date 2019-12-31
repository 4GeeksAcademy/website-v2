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

            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xl-9 ">
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
        <div className="col-12 col-lg-11 col-md-11 col-sm-12 col-xl-11 bg-info">
          <div className="row">
            <div className="col-12 col-lg-1 col-md-1 col-sm-12 col-xl-1"></div>
            <Column>my content</Column>
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