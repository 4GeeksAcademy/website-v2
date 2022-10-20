import React from "react";
import { graphql, Link } from "gatsby";
import { SessionContext } from "../session";
import { isCustomBarActive } from "../actions";
import Icon from "../components/Icon";
import ApplyJobModal from "../components/ApplyJobModal";
import { GridContainer, Div } from "../components/Sections";
import { H1, H4, Paragraph } from "../components/Heading";
import { Button, Colors } from "../components/Styling";
import BaseRender from "./_baseLayout";
import { Alert } from "../components/Form/index";
import { transferQuerystrings } from "../utils/utils.js";

const Job = ({ data, pageContext, yml }) => {
  const [open, setOpen] = React.useState(false);
  const { session } = React.useContext(SessionContext);
  const { lang } = pageContext;

  const utm = session && session.utm;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <GridContainer
      github="/components/job"
      columns_tablet="12"
      margin={isCustomBarActive(session) ? "120px 0 24px 0" : "70px 0 0 0"}
      padding="30px 15px 0 15px"
      padding_tablet="30px 0 0 0"
    >
      <Div flexDirection="column" gridColumn_tablet=" 2 / 12">
        {yml.meta_info.open ? (
          <Alert color="green" margin="0" padding="5px 0 0 0">
            {data.allJobAlertYaml.edges[0].node.message.accepting}
          </Alert>
        ) : (
          <Alert color="red" margin="0" padding="5px 0 0 0">
            {data.allJobAlertYaml.edges[0].node.message.no_accepting}
          </Alert>
        )}
        <Link
          style={{ margin: "20px 0", width: "fit-content" }}
          to={lang === "us" ? "/us/jobs" : "/es/empleo" || yml.link_back}
        >
          <Icon
            icon="arrowLeft2"
            width="32"
            // color={Colors.blue}
            // fill={Colors.blue}
          />
        </Link>
        <Div
          alignItems="center"
          flexDirection="column"
          flexDirection_tablet="row"
        >
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
          {yml.meta_info.open ? (
            <Link target="_blank" to={transferQuerystrings(yml.button_url, utm)}>
              <Button
                // onClick={handleOpen}
                variant="full"
                width="130px"
                justifyContent="center"
                color={Colors.blue}
                textColor={Colors.white}
              >
                {yml.button_text}
              </Button>
            </Link>
          ) : (
            ""
          )}
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
            <React.Fragment key={`${i}-${m.label}`}>
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
            </React.Fragment>
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
            open
          }
          banner_heading
          link_back
          banner_image
          button_text
          button_url
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
    allJobAlertYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          message {
            accepting
            no_accepting
          }
        }
      }
    }
    allLeadFormYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          fields {
            lang
          }
          apply_job {
            text
            thankyou
            apply_button_text
            close
          }
          form_fields {
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
