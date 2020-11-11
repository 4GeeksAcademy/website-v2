import React, {useState} from 'react';
import {Column, Row, Container, Divider, Wrapper, WrapperImage} from "../components/Sections"
import {Title, H4, Paragraph} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
import Credentials from '../components/Credentials'
import WhoIsHiring from '../components/WhoIsHiring'
import BaseRender from './_baseLayout'
import {beHiringPartner} from "../actions";
import LeadForm from "../components/LeadForm/index.js";
import Modal from "../components/Modal"

function rand () {
  return Math.round(Math.random() * 20) - 10;
}

const Partners = (props) => {
  const {data, pageContext, yml} = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const hiring = data.allPartnerYaml.edges[0].node;
  return (
    <>
      <WrapperImage
        imageData={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
        className={`img-header`}
        bgSize={`cover`}
        alt={yml.header_data.alt}
        paddingRight={`0`}
        customBorderRadius="0 0 0 1.25rem"
      >
        <Divider height="100px" />
        <Title
          size="5"
          title={yml.header_data.tagline}
          variant="main"
          color={Colors.white}
          fontSize="46px"
          fs_xs="37px"
          textAlign="center"
          paragraph={yml.header_data.sub_heading}
          paragraphColor={Colors.white}
          fontFamily="Lato-bold, sans-serif"
        />
        <Row
          justifyContent="center"
          display="flex"
        >
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <LeadForm heading="BE A HIRING PARTNER" formHandler={beHiringPartner} handleClose={handleClose} lang={pageContext.lang} />
          </Modal>
          <Button width="300px" margin="15px 0px 25px 0px" onClick={handleOpen} color="red" textColor="white">{yml.button_section.button_text}</Button>
        </Row>
        <Divider height="130px" xs="0" />
      </WrapperImage>
      <Wrapper
      >
        <Credentials transform="translate(-100px)" lang={data.allCredentialsYaml.edges} />
      </Wrapper>
      <Divider height="50px" />
      <Wrapper
        right
        background={Colors.lightGray}
        border="top"
      >
        <Title
          size="10"
          marginTop="40px"
          title={hiring.partners.tagline}
          paragraph={hiring.partners.sub_heading}
          paragraphColor={Colors.black}
          variant="primary"
        />
        <WhoIsHiring
          images={hiring.partners.images}
          footerTagline={hiring.partners.footer_tagline}
          footerLink={hiring.partners.footer_link}
          footerButton={hiring.partners.footer_button}
        />

        <Title
          size="10"
          marginTop="40px"
          title={hiring.coding.tagline}
          paragraph={hiring.coding.sub_heading}
          paragraphColor={Colors.black}
          variant="primary"
        />

        <WhoIsHiring
          images={hiring.coding.images}
          footerTagline={hiring.coding.footer_tagline}
          footerLink={hiring.coding.footer_link}
          footerButton={hiring.coding.footer_button}
        />

        <Title
          size="10"
          marginTop="40px"
          title={hiring.influencers.tagline}
          paragraph={hiring.influencers.sub_heading}
          paragraphColor={Colors.black}
          variant="primary"
        />

        <WhoIsHiring
          images={hiring.influencers.images}
          footerTagline={hiring.influencers.footer_tagline}
          footerLink={hiring.influencers.footer_link}
          footerButton={hiring.influencers.footer_button}
        />
        <Divider height="100px" />
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
            
            header_data{
              tagline
              sub_heading
              image{
                childImageSharp {
                  fluid(maxWidth: 1200){
                    ...GatsbyImageSharpFluid_withWebp
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
      allPartnerYaml(filter: { fields: { lang: { eq: $lang }}}) {
        edges {
            node {
              partners {
                images {
                  name
                  image {
                    childImageSharp {
                      fluid(maxWidth: 150){
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
                      fluid(maxWidth: 150){
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
                      fluid(maxWidth: 150){
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
                      fluid(maxWidth: 150){
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
export default BaseRender(Partners);