import React, { useState, useEffect, useContext } from 'react';
import { graphql, Link } from 'gatsby';
import Icon from '../new_components/Icon';
import ApplyJobModal from '../new_components/ApplyJobModal';
import { GridContainer, Div } from '../new_components/Sections';
import { H1, H4, Paragraph } from '../new_components/Heading';
import { Button, Colors } from '../new_components/Styling';
import BaseRender from './_baseLayout';
import { applyJob } from '../actions';
import LeadForm from '../new_components/LeadForm';

// const Input = styled.input`
//   background-color: ${Colors.lightGray};
//   height: 40px;
//   width: 100%;
//   border: none;
//   font-family: 'Lato', sans-serif;

//   font-size: 14px;
//   font-color: ${Colors.black};
// `;
const Job = ({ data, pageContext, yml }) => {
  const [open, setOpen] = React.useState(false);
  const { lang } = pageContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log('CONTEXT:::', pageContext);
  console.log("YAML:::", yml)

  // const [form, setForm] = useState(false);
  // const [buttonToggle, setButtonToggle] = useState();
  // const [formData, setVal] = useState({
  //   first_name: '',
  //   last_name: '',
  //   phone: '',
  //   email: '',
  // });
  return (
    <>
      <GridContainer
        github="/components/job"
        columns_tablet="12"
        margin_tablet="70px 0 0 0"
        margin="70px 0 0 0"
        padding="30px 0 0 0"
        padding_tablet="30px 0 0 0"
      >
        <Div flexDirection="column" gridColumn_tablet=" 2 / 12">
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
          <Div alignItems="center">
            <H1
              type="h1"
              textAlign="left"
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
            open={open}
            onClose={handleClose}
          >
            <LeadForm
              style={{ marginTop: '50px' }}
              heading={yml.button.syllabus_heading}
              motivation={yml.button.syllabus_motivation}
              sendLabel={yml.button_text}
              formHandler={applyJob}
              handleClose={handleClose}
              lang={pageContext.lang}
              // data={{
              //   slug: {
              //     type: 'hidden',
              //     value: yml.meta_info.bc_slug,
              //     valid: true,
              //   },
              // }}
            />
          </ApplyJobModal>

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
    </>
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
          link_back
          banner_image
          button_text
          button {
            syllabus_heading
            syllabus_btn_label
            syllabus_motivation
          }
          cities
          title
          description
          content {
            label
            list
          }
        }
      }
    }
  }
`;

export default BaseRender(Job);
