import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';

// Hackish component to get a dynamic image specified by prop filename

const OptImage = ({alt, filename}) => {
    const data = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

    const image = data.images.edges.find(n =>
        n.node.relativePath.includes(filename)
    );
    if (!image) {
        return null;
    }

    return <Img alt={alt} fluid={image.node.childImageSharp.fluid} />;
};

export default OptImage;