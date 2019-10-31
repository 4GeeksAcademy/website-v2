import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import PropTypes from 'prop-types';

const Credentials = (props) => (
  <>
    {/* <div>
      {data.allMarkdownRemark.edges.map((item) => (
        <div key={item.node.id}>{item.node.frontmatter.name}</div>
      ))}
    </div> */}
    <div>{props.test}</div>
  </>
);


export default Credentials;
Credentials.propTypes = {
  test: PropTypes.string.isRequired,
};
