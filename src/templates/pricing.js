import React, {useState, useContext} from 'react';
import {Column, Row, Container, Divider, Wrapper, Div} from "../components/Sections";
import {Title, H2, H5, Paragraph} from '../components/Heading';
import {Button, Colors, StyledBackgroundSection} from '../new_components/Styling';
import WhoIsHiring from '../components/WhoIsHiring';
import Img from "gatsby-image"
import BaseRender from './_baseLayout';
import {openGuidebook} from "../actions";
import {SessionContext} from '../session.js'

// new_components
import PricesAndPayment from '../new_components/PricesAndPayment';
import { Header } from '../new_components/Sections'

const Pricing = (props) => {
  const {session} = React.useContext(SessionContext);
  const {data, pageContext, yml} = props;
  const [open, setOpen] = React.useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;
  console.log("yml", yml);
  let location = null;
  if (session && session.location) {

    location = data.allLocationYaml.edges.find(l => l.node.active_campaign_location_slug === session.location.active_campaign_location_slug)
    if (location) location = location.node;
  }
  console.log(yml)

  return (
    <>
      {/* HEADER SECTION */}
      <Header
          background={Colors.lightBlue2}
          fontSize="40px"
          seo_title={yml.seo_title}
          title={yml.header.title}
          paragraph={yml.header.paragraph}
          padding_tablet="72px 0 15px 0"
          padding="72px 0 15px 0"  
      >
      </Header>
      <PricesAndPayment
          // shadow="0px 0px 6px 2px rgba(0, 0, 0, 0.2)"
          
          button_text={yml.syllabus_button_text}
          program={yml.label.program.title}
          programClosedLabel={yml.label.program.closedLabel}
          modality={yml.label.modality.title}
          modalityClosedLabel={yml.label.modality.closedLabel}
          campus={yml.label.campus.title}
          campusClosedLabel={yml.label.campus.closedLabel}

          // openedLabel={yml.prices.opened_label}
          session={session}
          // closedLabel={yml.prices.closed_label}
          type={pageContext.slug}
          lang={pageContext.lang}
          locations={data.allLocationYaml.edges}
        />
    </>
  )
};
export const query = graphql`
  query PricingQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            seo_title
            header{
                title
                paragraph
                tagline
                image{
                  childImageSharp {
                    fluid(maxWidth: 1600, quality: 100){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                alt
                sub_heading
            }
            intro{
                image {
                  childImageSharp {
                    fixed(width: 300, height: 300) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
                image_second {
                  childImageSharp {
                    fluid(maxWidth: 450){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                content
                content_second
                heading_second
                bullets
                heading
            }
            label{
                program{
                  title
                  closedLabel
                }
                modality{
                  title
                  closedLabel
                }
                campus{
                  title
                  closedLabel
                }
            }
            syllabus_button_text
            prices{
                heading
                paragraph
                opened_label
                closed_label
            }
            payment_guide{
                heading
                sub_heading
                button_text
                button_link
                submit_button_text
                submit_button_link
            }
            ecosystem{
                heading
                sub_heading
            }
        }
      }
    }
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
          node {
            credentials {
              title
              icon
              value
            }
          }
        }
      }
      allLocationYaml(filter: { fields: { lang: {eq: $lang}}}){
        edges {
          
          node {
            id
            city
            country
            hasFinancialsOption
            financials_max_months
            active_campaign_location_slug
            breathecode_location_slug
            fields{
              lang
            }
            meta_info {
              slug
              title
              description
              image
              keywords
              redirects
            }
            header{
              sub_heading
              tagline
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 1200, quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              } 
            }
            prices {
              full_stack {
                full_time {
                  slug
                  center_section {
                    button {
                      button_text
                    }
                    header {
                      sub_heading
                      heading_one
                      heading_two
                    }
                    plans {
                      months
                      monthsInfo
                      payment
                      paymentInfo
                      provider
                      logo
                      message
                    }
                  }
                  left_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      heading_one
                      heading_two
                      sub_heading
                    }
                  }
                  right_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      sub_heading
                      heading_one
                      heading_two
                    }
                  }
                }
                part_time {
                  slug
                  center_section {
                    button {
                      button_text
                    }
                    header {
                      heading_two
                      sub_heading
                      heading_one
                    }
                    plans {
                      months
                      monthsInfo
                      payment
                      paymentInfo
                      provider
                      logo
                      message
                    }
                  }
                  left_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      heading_one
                      sub_heading
                      heading_two
                    }
                  }
                  right_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      heading_one
                      sub_heading
                      heading_two
                    }
                  }
                }
              }
              software_engineering {
                part_time {
                  slug
                  center_section {
                    button {
                      button_text
                    }
                    header {
                      heading_two
                      sub_heading
                      heading_one
                    }
                    plans {
                      months
                      monthsInfo
                      payment
                      paymentInfo
                      provider
                      logo
                      message
                    }
                  }
                  left_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      heading_one
                      sub_heading
                      heading_two
                    }
                  }
                  right_section {
                    button {
                      button_text
                    }
                    content {
                      price
                      price_info
                    }
                    header {
                      heading_one
                      sub_heading
                      heading_two
                    }
                  }
                }
              }
            }
            documents{
              payment_guidebook{
                url
              }
            }
          }
        }
      }
      allPartnerYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
            node {
              partners {
                images {
                  name
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              coding {
                images {
                  name
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              influencers {
                images {
                  name
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
              financials {
                images {
                  name
                  image {
                    childImageSharp {
                      fluid(maxWidth: 200){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  featured
                }
                tagline
                sub_heading
              }
            }
          }
        }
  }
`;
export default BaseRender(Pricing);