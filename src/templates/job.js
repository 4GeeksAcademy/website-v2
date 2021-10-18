import React, { useState, useEffect, useContext } from 'react';
import { graphql, Link } from 'gatsby';
import Icon from '../new_components/Icon';
import ApplyJobModal from '../new_components/ApplyJobModal';
import { GridContainer, Div } from '../new_components/Sections';
import { H1, H4, Paragraph } from '../new_components/Heading';
import { Button, Colors } from '../new_components/Styling';
import BaseRender from './_baseLayout';
import toast, { Toaster } from 'react-hot-toast';

const Job = ({ data, pageContext, yml }) => {
  const [open, setOpen] = React.useState(false);
  const { lang } = pageContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    yml.open ? 
    toast.success('This position is open for new candidates',{duration: 5000,}) : 
    toast.error('We are not currently accepting any applicants for this position',{duration: 5000,})
  }, []);

  return (
      <GridContainer
        github="/components/job"
        columns_tablet="12"
        margin_tablet="70px 0 0 0"
        margin="70px 0 0 0"
        padding="30px 15px 0 15px"
        padding_tablet="30px 0 0 0"
      >
        <Div flexDirection="column" gridColumn_tablet=" 2 / 12">
        <Toaster
            toastOptions={{
              success: {
                style: {
                  background: '#2acd2a',
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'Lato, Helvetica, sans-serif',
                  boxShadow: '5px 10px 18px #888888'
                },
                iconTheme: {
                  primary: 'white',
                  secondary: '#2acd2a',
                },
              },
              error: {
                style: {
                  background: '#cd2a2a',
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'Lato, Helvetica, sans-serif',
                  boxShadow: '5px 10px 18px #888888'
                },
                iconTheme: {
                  primary: 'white',
                  secondary: '#cd2a2a',
                },
              },
            }}
            containerStyle={{
              top: 70,
              left: 70,
              bottom: 70,
              right: 70,
            }}
            />;
          <Link
            style={{ margin: '20px 0', width: 'fit-content' }}
            to={lang === 'us' ? '/us/jobs' : '/es/empleo' || yml.link_back}
          >
            <Icon
              icon="arrowLeft2"
              width="32"
              // color={Colors.blue}
              // fill={Colors.blue}
            />
          </Link>
          <Div alignItems="center" flexDirection="column" flexDirection_tablet="row">
            <H1
              type="h1"
              textAlign="center"
              textAlign_tablet="left"
              zIndex="5"
              fontSize="30px"
              lineHeight="36px"
              fontWeight="700"
              margin="16px 0px 19px 0px"
            >
              {yml.banner_heading}
            </H1>
            <Button
              onClick={handleOpen}
              variant="full"
              width="130px"
              justifyContent="center"
              color={Colors.blue}
              textColor={Colors.white}
            >
              {yml.button_text}
            </Button>
            {/* <Button onClick={() => {setForm(!form), setButtonToggle(!buttonToggle)}} width="200px" color={Colors.blue} textColor={Colors.white}>APPLY NOW</Button> */}
          </Div>
          <ApplyJobModal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            lang={lang}
            title_job={yml.banner_heading}
            // heading={yml.apply_job.text}
            // thankyou={yml.apply_job.thankyou}
            form_data={data.allLeadFormYaml.edges[0].node}
            open={open}
            onClose={handleClose}
          />

          <Div flexDirection="column">
            {yml.content.map((m, i) => (
              <>
                <H4
                  textAlign="left"
                  fontSize="22px"
                  lineHeight="26px"
                  key={i}
                  fontWeight="700"
                  borderBottom="1px solid #C4C4C4"
                  margin="0 0 15px 0"
                  padding="74px 0 20px 0"
                >
                  {m.label}
                </H4>
                <ul>
                  {m.list.map((item, i) => (
                    <li key={i}>
                      <Paragraph
                        textAlign="left"
                        margin="10px 0"
                        color={Colors.darkGray}
                        align="left"
                        fontSize="14px"
                      >
                        {item}
                      </Paragraph>
                    </li>
                  ))}
                </ul>
              </>
            ))}
          </Div>
          <Paragraph
            letterSpacing="0.05em"
            margin="45px 0 0 0"
            dangerouslySetInnerHTML={{ __html: yml.date_release }}
          />
        </Div>
      </GridContainer>
  );
};

export const query = graphql`
  query JobQuery($file_name: String!, $lang: String!) {
    allJobYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          tagline
          seo_title
          meta_info {
            title
            description
            image
            keywords
          }
          banner_heading
          open
          link_back
          banner_image
          button_text
          cities
          title
          description
          content {
            label
            list
          }
          # apply_job {
          #   text
          #   thankyou
          # }
        }
      }
    }
    allLeadFormYaml(
      filter: { fields: { lang: { eq: $lang } } }
    ){
      edges{
        node{
          fields{
            lang
          }
          apply_job {
            text
            thankyou
            apply_button_text
            close
          }
          form_fields{
            name
            required
            type
            place_holder
            error
          }
        }
      }
    }
  }
`;

export default BaseRender(Job);
