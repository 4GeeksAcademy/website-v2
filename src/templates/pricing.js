import React, {useState, useContext} from 'react';
import {Column, Row, Container, Divider, Wrapper, WrapperImage, Div} from "../components/Sections";
import {Title, H3, H4, H5, Paragraph} from '../components/Heading';
import {Button, Colors, RoundImage, TriangleDown} from '../components/Styling';
import Credentials from '../components/Credentials';
import PricesAndPayment from '../components/PricesAndPayment';
import WhoIsHiring from '../components/WhoIsHiring';
import {Card} from '../components/Card'
import BaseRender from './_baseRender';
import Modal from '@material-ui/core/Modal';
import {reviewGuidebook} from "../actions";
import LeadForm from "../components/LeadForm/index.js";


const Pricing = (props) => {
  const {data, pageContext, yml} = props;
  const [open, setOpen] = React.useState(false);
  const [course, setCourse] = React.useState(null);
  const [courseArray, setCourseArray] = useState([
    {
      type: "part_time",
      name: "Part Time"
    },
    {
      type: "full_time",
      name: "Full Time"
    }
  ])
  const [priceToggle, setPriceToggle] = useState(false);
  const hiring = data.allPartnerYaml.edges[0].node;

  return (
    <>
      {/* HEADER SECTION */}
      <WrapperImage
        imageData={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
        className={`img-header`}
        height={`500px`}
        bgSize={`cover`}
        alt={yml.header_data.alt}
        paddingRight={`0`}

      >
        <Divider height="100px" />
        <Title
          size="5"
          color={Colors.white}
          title={yml.header_data.tagline}
          paragraph={yml.header_data.sub_heading}
          variant="main"
          paragraphColor={Colors.white}
          fontSize="46px"
          textAlign="center"

        />
      </WrapperImage>
      {/* CREDENTIALS SECTION */}
      <Wrapper
      >
        <Credentials up="80" lang={data.allCredentialsYaml.edges} />
      </Wrapper>
      <Divider height="100px" />
      {/*  */}
      <Container fluid >
        <Row>
          <Column size="1" />
          <Column size="11" >
            <Row>
              <Column size="1" />
              <Column size="10">
                <Row>
                  <Column size="5" size_sm="12" height="300px">
                    <RoundImage url={yml.intro.image} height="400px" bsize="contain" />
                  </Column>
                  <Column size="4" size_sm="12">
                    <Divider height="100px" />
                    <H5 align="left" fontSize="20px" fontHeight="30px">{yml.intro.content}</H5>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Column>
        </Row>
      </Container>
      <Divider height="100px" />
      <Wrapper
        background={Colors.lightGray}
        border="top"
      >
        <Title
          size="10"
          title={yml.prices.heading}
          variant="primary"
        />
        <Row
          padding={`10px 20px`}
          background={Colors.lightGray}
          borderRadius={`.5rem`}
          align={`center`}
          customRespSize
          alignResp={`center`}
        >
          <Div
            alignItems={`center`}
            onMouseLeave={() => {

              setTimeout(() => {
                setPriceToggle(false);
              }, 300)
            }}
          >
            <Paragraph
              fontWeight={`500`}
              fs_xs="18px"
              fs_sm="18px"
              fs_md="18px"
              fs_lg="18px"
              fs_xl="20px"
              margin={`0 5px 0 0`}>
              Select a program
          </Paragraph>
            <Card
              color={`grey`}
              borders={`.5rem`}
              margin={`0 20px 0 0`}
              margin_sm={"20px auto"}
              margin_xs={"20px auto"}
            >

              <Button
                display={`flex`}

                width="fit-content"
                onClick={() => setPriceToggle(!priceToggle)}
                // onClick={() => {toggle == false ? setToggleCity(!toggleCity) : (setToggleCity(!toggleCity), setToggle(false))}}
                color={Colors.lightGray}
              >
                <Paragraph
                  fontWeight={`500`}
                  color={Colors.blue}
                  fs_xs="18px"
                  fs_sm="18px"
                  fs_md="18px"
                  fs_lg="18px"
                  fs_xl="20px"
                  margin={`0 5px 0 0`}>{course === "part_time" ? "Part Time" : "Full Time"}
                </Paragraph>
                <TriangleDown width="16" color={Colors.gray} fill={Colors.gray} />
              </Button>
              {priceToggle &&
                <Row marginBottom="5px" marginTop="3px" marginRight="0" marginLeft="0" width="250px" align="center" position="absolute" zIndex="1000" background={Colors.white} borderRadius=".5rem" shadow>
                  {Array.isArray(courseArray) && courseArray.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        colorHover={Colors.lightBlue}
                        // onClick={() => {item.city in filterCity ? null : item.city != "All Locations" ? setAcademy(item.slug) : setAcademy(null), setFilterByCity([item.city]), setToggleCity(!toggleCity)}}
                        onClick={() => {setCourse(item.type), setPriceToggle(!priceToggle)}}
                        textColor={Colors.gray}
                        fontSize={"16px"}
                        borderRadius=".5rem" padding="10px"
                      >
                        <Paragraph
                          fontSize="16px"
                          color={Colors.gray} >
                          {item.name}
                        </Paragraph>

                      </Button>
                    )
                  })}
                </Row>
              }
            </Card>
          </Div>
        </Row>
        {
          course &&
          <PricesAndPayment
            type={pageContext.slug}
            locations={data.allLocationYaml.edges}
            course={course}
          />
        }
      </Wrapper >
      <Divider height="100px" />
      <Wrapper


      >
        <Title
          size="10"
          title={yml.payment_guide.heading}
          paragraph={yml.payment_guide.sub_heading}
          variant="primary"
        />
        <Divider height="30px" />
        <Row align="center">
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={() => setOpen(false)}
          >
            <LeadForm heading="REVIEW GUIDEBOOK" formHandler={reviewGuidebook} handleClose={() => setOpen(false)} />
          </Modal>
          <Button outline position="relative" width="300px" onClick={() => setOpen(true)} color={Colors.blue}>{yml.payment_guide.button_text}</Button>
        </Row>
        <Divider height="100px" />
      </Wrapper>
      <Wrapper


        background={Colors.lightGray}
        border="top"
      >
        <Divider height="20px" />
        <WhoIsHiring
          margin="50px"
          tagline={hiring.financials.tagline}
          subheading={hiring.financials.sub_heading}
          images={hiring.financials.images}
          footerTagline={hiring.financials.footer_tagline}
          footerLink={hiring.financials.footer_link}
          footerButton={hiring.financials.footer_button}
        />
        <Divider height="150px" />
      </Wrapper>

    </ >
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
            header_data{
                tagline
                image{
                  childImageSharp {
                    fluid(maxWidth: 1200){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                alt
                sub_heading
            }
            intro{
                image
                content
            }
            prices{
                heading
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
    allCredentialsYaml(filter: {lang: {eq: $lang}}) {
        edges {
          node {
            lang
            credentials {
              title
              slug
              value
              symbol
              symbol_position
            }
          }
        }
      }
      allLocationYaml(filter: { fields: { lang: {eq: $lang}}}){
        edges {
          
          node {
            id
            city
            hasFinancialsOption
            financials_max_months
            fields{
              lang
            }
            meta_info {
              slug
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
                  fluid(maxWidth: 800){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              } 
            }
            prices {
              full_time {
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
        }
      }
      allPartnerYaml(filter: {lang: {eq: $lang}}) {
        edges {
            node {
              lang
              partners {
                images {
                  name
                  slug
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  alt
                  featured
                }
                tagline
                sub_heading
              }
              coding {
                images {
                  name
                  slug
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  alt
                  featured
                }
                tagline
                sub_heading
              }
              influencers {
                images {
                  name
                  slug
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  alt
                  featured
                }
                tagline
                sub_heading
              }
              financials {
                images {
                  name
                  slug
                  image {
                    childImageSharp {
                      fluid(maxWidth: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  alt
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