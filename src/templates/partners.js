import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections"
import {Title, H4, Paragraph} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
import Credentials from '../components/Credentials'
import WhoIsHiring from '../components/WhoIsHiring'
import BaseRender from './_baseRender'
import {beHiringPartner} from "../actions";
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LeadForm from "../components/LeadForm/index.js";
import Img from "gatsby-image"

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
const Partners = (props) => {
  const {data, pageContext, yml} = props;
  const [formMessage, setFormMessage] = useState("Fill the form to submit")
  const [showModal, setShowModal] = useState(false)
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* <Img className={`image`} fluid={yml.image.childImageSharp.fluid} alt="Florida Education Logo"></Img> */}

      <Wrapper
        style="default"
        data={yml.header.image.childImageSharp.fluid}
        image="yes"
        className={`img-header`}
        height={`500px`}
        bgSize={`cover`}
        alt={yml.header.alt}
      >
        <Divider height="100px" />
        <Title
          size="5"
          title={yml.header.tagline}
          main
          color={Colors.white}
          fontSize="46px"
          textAlign="center"
          paragraph={yml.header.sub_heading}
          paragraphColor={Colors.white}
          fontFamily="Lato-bold, sans-serif"
        />
        <Row
          align="center"
        >
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <LeadForm heading="BE A HIRING PARTNER" formHandler={beHiringPartner} handleClose={handleClose} />
          </Modal>
          <Button width="200px" margin="15px 0px" onClick={handleOpen} color="red" textColor="white">{yml.button_section.button_text}</Button>
        </Row>
      </Wrapper>
      <Wrapper
        style="default">
        <Credentials move="up" up="100" lang={data.allCredentialsYaml.edges} />
      </Wrapper>
      <Divider height="50px" />
      <Wrapper
        style="default"
        image="no"
        color={Colors.lightGray}
        border="top"
      >

        <Divider height="20px" />
        <WhoIsHiring source="partners" lang={data.allPartnerYaml.edges} />
        {/* </Wrapper> */}
        <Divider height="50px" />
        {/* <Wrapper
                    style="default"
                > */}
        <Divider height="50px" />


        <WhoIsHiring source="coding" lang={data.allPartnerYaml.edges} />
        {/* </Wrapper> */}
        <Divider height="50px" />
        {/* <Wrapper
                    style="default"
                > */}
        <Divider height="50px" />


        <WhoIsHiring source="influencers" lang={data.allPartnerYaml.edges} />
        {/* <Row align="center">
                    <Button width="300px" color={Colors.blue} onClick={() => setShowModal(!showModal)} textColor={Colors.white} margin="2rem 0" padding=".85rem">{yml.button_section.button_text}</Button>
                </Row> */}
        <Divider height="100px" />
        {/* </Wrapper> */}
      </Wrapper>
      <Divider height="100px" />

    </>
  )
};
export const query = graphql`
  query PartnersQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                slug
                title
                description
                image
                keywords
            }
            header{
              tagline
              sub_heading
              image {
                childImageSharp {
                  fluid(maxWidth: 1200){
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              alt
            }
            button_section{
                button_text
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
                        ...GatsbyImageSharpFluid
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
                        ...GatsbyImageSharpFluid
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
                        ...GatsbyImageSharpFluid
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
                        ...GatsbyImageSharpFluid
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
export default BaseRender(Partners);