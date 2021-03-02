import React, {useState} from 'react';
import {Column, Row, Container, Divider, Div, WrapperImage} from "../new_components/Sections"
import {H1, H2, H3, H4, Paragraph} from '../new_components/Heading'
import {Button, Colors} from '../new_components/Styling'
import Credentials from '../new_components/Credentials'
// import WhoIsHiring from '../new_components/WhoIsHiring'
import BaseRender from './_baseLayout'
import {beHiringPartner} from "../actions";
// import LeadForm from "../new_components/LeadForm/index.js";
// import Modal from "../new_components/Modal"

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
      <Container
        variant="fluid"
        margin="120px auto">
        <Div
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <H1
            fontSize="13px"
            lineHeight="16px"
            fontWeight="700"
            letterSpacing="0.05em"
            color="#606060"
          >{yml.seo_title}</H1>
          <H2 fontSize="50px" lineHeight="60px" margin="16px 17px 19px 17px">{`< ${yml.header_data.tagline} >`}</H2>
          <Paragraph margin="0 17px 19px 17px" width_sm="70%" width_tablet="50%">{yml.header_data.sub_heading}</Paragraph>
          <Button width="300px" margin="15px 0px 25px 0px" color={Colors.blue} textColor="white">{yml.button_section.button_text}</Button>
        </Div>

      </Container>
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
        seo_title
        header_data{
          tagline
          sub_heading
          image{
            childImageSharp {
              fluid(maxWidth: 1600, quality: 100){
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
      // <WrapperImage
      //   imageData={yml.header_data.image && yml.header_data.image.childImageSharp.fluid}
      //   className={`img-header`}
      //   bgSize={`cover`}
      //   alt={yml.header_data.alt}
      //   paddingRight={`0`}
      //   customBorderRadius="0 0 0 1.25rem"
      // >
      //   <Divider height="100px" />
      //   <Title
      //     size="5"
      //     title={yml.header_data.tagline}
      //     variant="main"
      //     color={Colors.white}
      //     fontSize="46px"
      //     fs_xs="37px"
      //     textAlign="center"
      //     paragraph={yml.header_data.sub_heading}
      //     paragraphColor={Colors.white}
      //     fontFamily="Lato-bold, sans-serif"
      //   />
      //   <Row
      //     justifyContent="center"
      //     display="flex"
      //   >
      //     <Modal
      //       aria-labelledby="simple-modal-title"
      //       aria-describedby="simple-modal-description"
      //       open={open}
      //       onClose={handleClose}
      //     >
      //       <LeadForm heading="BE A HIRING PARTNER" formHandler={beHiringPartner} handleClose={handleClose} lang={pageContext.lang} />
      //     </Modal>
      //     <Button width="300px" margin="15px 0px 25px 0px" onClick={handleOpen} color="red" textColor="white">{yml.button_section.button_text}</Button>
      //   </Row>
      //   <Divider height="130px" xs="0" />
      // </WrapperImage>
      // <Wrapper
      // >
      //   <Credentials transform="translate(-100px)" lang={data.allCredentialsYaml.edges} />
      // </Wrapper>
      // <Divider height="50px" />
      // <Wrapper
      //   right
      //   background={Colors.lightGray}
      //   border="top"
      // >
      //   <Title
      //     size="10"
      //     marginTop="40px"
      //     title={hiring.partners.tagline}
      //     paragraph={hiring.partners.sub_heading}
      //     paragraphColor={Colors.black}
      //     variant="primary"
      //   />
      //   <WhoIsHiring
      //     images={hiring.partners.images}
      //     footerTagline={hiring.partners.footer_tagline}
      //     footerLink={hiring.partners.footer_link}
      //     footerButton={hiring.partners.footer_button}
      //   />

      //   <Title
      //     size="10"
      //     marginTop="40px"
      //     title={hiring.coding.tagline}
      //     paragraph={hiring.coding.sub_heading}
      //     paragraphColor={Colors.black}
      //     variant="primary"
      //   />

      //   <WhoIsHiring
      //     images={hiring.coding.images}
      //     footerTagline={hiring.coding.footer_tagline}
      //     footerLink={hiring.coding.footer_link}
      //     footerButton={hiring.coding.footer_button}
      //   />

      //   <Title
      //     size="10"
      //     marginTop="40px"
      //     title={hiring.influencers.tagline}
      //     paragraph={hiring.influencers.sub_heading}
      //     paragraphColor={Colors.black}
      //     variant="primary"
      //   />

      //   <WhoIsHiring
      //     images={hiring.influencers.images}
      //     footerTagline={hiring.influencers.footer_tagline}
      //     footerLink={hiring.influencers.footer_link}
      //     footerButton={hiring.influencers.footer_button}
      //   />
      //   <Divider height="100px" />
      // </Wrapper>
      // <Divider height="100px" />