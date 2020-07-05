import React, {useState} from 'react';
import Layout from '../global/Layout';
import styled, {css} from 'styled-components';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections";
import {Title, H3, H4, H5, Paragraph} from '../components/Heading';
import {Button, Colors, RoundImage} from '../components/Styling';
import Credentials from '../components/Credentials';
import PricesAndPayment from '../components/PricesAndPayment';
import WhoIsHiring from '../components/WhoIsHiring';
import BaseRender from './_baseRender';
import {Card} from '../components/Card';
import {reviewGuidebook} from "../actions";
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const Input = styled.input`
    background-color:${Colors.lightGray};
    height: 40px;
    width: 100%;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-color: ${Colors.black};
`
function rand () {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle () {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '1.25rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Pricing = (props) => {
  const {data, pageContext, yml} = props;
  const [showModal, setShowModal] = useState(false)
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [formMessage, setFormMessage] = useState("Fill the form to submit")
  const [formData, setVal] = useState({
    first_name: '',
    last_name: '',
    location: '',
    email: ''
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* HEADER SECTION */}
      <Wrapper
        style="default"
        image="yes"
        url={yml.banner.image}
        border="bottom"
        height="500px"
        backgroundSize="cover"
      >
        <Divider height="100px" />
        <Title
          size="5"
          color={Colors.white}
          title={yml.banner.tagline}
          paragraph={yml.banner.sub_heading}
          main
          paragraphColor={Colors.white}
          fontSize="46px"
          fontFamily="Lato-bold, sans-serif"
          textAlign="center"

        />
      </Wrapper>
      {/* CREDENTIALS SECTION */}
      <Wrapper
        style="default">
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
                  <Column size="5" height="300px">
                    <RoundImage url={yml.intro.image} height="400px" bsize="contain" />
                  </Column>
                  <Column size="4">
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
        style="default"
        image="no"
        color={Colors.lightGray}
        border="top"

      >
        <Divider height="50px" />
        <Title
          size="10"
          title={yml.prices.heading}
          primary
        />
        <PricesAndPayment type={pageContext.slug} lang={data.allLocationYaml.edges} />
      </Wrapper>
      <Divider height="100px" />
      <Wrapper
        style="default"

      >
        <Title
          size="10"
          title={yml.payment_guide.heading}
          paragraph={yml.payment_guide.sub_heading}
          primary
        />
        <Divider height="30px" />
        <Row align="center">
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          ><div style={modalStyle} className={classes.paper}>
              <Row height="20%" align="center">
                <Column size="12" align="center"><H4>REVIEW GUIDEBOOK</H4></Column>
              </Row>
              <Row height="70%">
                <Column size="12">
                  <Row height="30%" align="center">
                    <Column size="11" >
                      <Input
                        type="text" className="form-control" placeholder="First name *"
                        onChange={(e) => setVal({...formData, first_name: e.target.value})}
                        value={formData.firstName}
                      />
                    </Column>
                  </Row>
                  <Row height="30%" align="center">
                    <Column size="11">
                      <Input type="text" className="form-control" placeholder="Last Name *"
                        onChange={(e) => setVal({...formData, last_name: e.target.value})}
                        value={formData.lastName}
                      />
                    </Column>
                  </Row>
                  <Row height="30%" align="center">
                    <Column size="11">
                      <Input type="email" className="form-control" placeholder="Email *"
                        onChange={(e) => setVal({...formData, email: e.target.value})}
                        value={formData.email}
                      />
                    </Column>
                  </Row>
                </Column>
              </Row>
              <Row height="10%" padding="5px 0 0 0" borderTop={`1px solid ${Colors.blue}`}>

                <Column size="6" customRespSize respSize="6">
                  <Paragraph>{formMessage}</Paragraph>
                </Column>
                <Column size="3" customRespSize respSize="3" align="right">
                  {
                    formData.first_name &&
                      formData.last_name &&
                      formData.email ?
                      <Button width="100%" padding=".2rem .45rem" color={Colors.blue} textColor={Colors.white}
                        onClick={() => {
                          reviewGuidebook(formData)
                        }}>Submit</Button> : null}
                </Column>
                <Column size="3" customRespSize respSize="3" align="right">
                  <Button outline width="100%" padding=".2rem .45rem" color={Colors.red} textColor={Colors.white} onClick={handleClose}>Close</Button>
                </Column>
              </Row>
            </div>
          </Modal>
          <Button outline position="relative" width="300px" onClick={handleOpen} color={Colors.blue}>{yml.payment_guide.button_text}</Button>
        </Row>
        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default"
        image="no"
        color={Colors.lightGray}
        border="top"
      >
        <Divider height="20px" />
        <WhoIsHiring source={yml.ecosystem.partners_name} lang={data.allPartnerYaml.edges} />
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
            banner{
                tagline
                image
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
                partners_name
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
            image
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
                    heading
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
            seo_title
            sub_heading
            tagline
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
                  image
                  featured
                }
                tagline
                sub_heading
              }
              coding {
                images {
                  name
                  slug
                  image
                  featured
                }
                tagline
                sub_heading
              }
              influencers {
                images {
                  name
                  slug
                  image
                  featured
                }
                tagline
                sub_heading
              }
              financials {
                images {
                  name
                  slug
                  image
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