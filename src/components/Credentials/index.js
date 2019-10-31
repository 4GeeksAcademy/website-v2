import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import PropTypes from 'prop-types';
import '../../assets/css/bootstrap.min.css';

const Credentials = (props) => (
  <>
    {/* <div>
      {data.allMarkdownRemark.edges.map((item) => (
        <div key={item.node.id}>{item.node.frontmatter.name}</div>
      ))}
    </div> */}
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Credentials</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <div className="row justify-content-center">
            <span className="mr-3 ">Rated </span>{props.rating}
          </div>
          <div className="row">
            <div className="col-4">
              <img src={props.googleImage} width="32" />
            </div>
            <div className="col-4">
              <img src={props.switchImage} width="32" />
            </div>
            <div className="col-4">
              <img src={props.reportImage} width="32" />
            </div>
          </div>
        </div>
        <div className="col-3 ">
          <div className="row justify-content-center">{props.hired}<span className="ml-3">Hired</span></div>
          <div className="row justify-content-center">Students</div>
        </div>
        <div className="col-3">
          <div className="row justify-content-center">{props.alumni}</div>
          <div className="row justify-content-center">Alumni</div>
        </div>
        <div className="col-3">
          <div className="row justify-content-center">{props.campuses}</div>
          <div className="row justify-content-center">Campuses</div>
        </div>
      </div>
    </div>
  </>
);


export default Credentials;
Credentials.propTypes = {
  rating: PropTypes.string.isRequired,
  googleImage: PropTypes.string,
  switchImage: PropTypes.string,
  reportImage: PropTypes.string,
  alumni: PropTypes.string,
  campuses: PropTypes.string,
  hired: PropTypes.string,
};
