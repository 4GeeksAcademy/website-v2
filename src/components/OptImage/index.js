import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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
              gatsbyImageData(
                layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                width: 700
                placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
              )
              # fluid(maxWidth: 700) {
              #   ...GatsbyImageSharpFluid
              # }
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

    return <Img 
      alt={alt} 
      // fluid={image.node.childImageSharp.fluid} 
      image={getImage(image.node.childImageSharp.gatsbyImageData)}  
    />;
};

export default OptImage;