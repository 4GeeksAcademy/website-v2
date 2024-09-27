import React from "react";
import { H2, Paragraph } from "../Heading";
import { Div } from "../Sections";
import { Colors, Anchor } from "../Styling";
import IconsBanner from "../IconsBanner";

const JobGuaranteeSmall = ({ content }) => {
  return (
    <Div
      display="block"
      margin="0 auto"
      padding="40px 20px"
      padding_lg="40px 0"
      padding_md="40px 80px"
      padding_tablet="40px 40px"
      width="100%"
      background="#F4F9FF"
    >
      {content.title && (
        <H2
          type="h2"
          maxWidth="1280px"
          margin="0 auto"
          style={{ textAlign: "center" }} // Centramos el texto
        >
          {content.title}
        </H2>
      )}

      {content.sub_heading && (
        <Paragraph
          padding_xs="0 10%"
          padding_tablet="20px 10%"
          padding_md="20px 10%"
          margin="15px auto"
          maxWidth="1280px"
          dangerouslySetInnerHTML={{ __html: content.sub_heading }}
        />
      )}

<Div
        display="flex"
        flexDirection="column"
        flexDirection_xs="row"
        flexDirection_tablet="row"
        flexWrap_xs="wrap"
        flexWrap_tablet="nowrap"
        justifyContent="center"
        gap_tablet={content.icons.length > 4 ? "0px" : "3%"}
        maxWidth="1280px"
        margin="0 auto"
        padding="32px 0 10px 0"
      >
        {Array.isArray(content.icons) &&
          content.icons.map((item, index) => (
            <React.Fragment key={index}>
              <IconsBanner
                icon={item.icon}
                color="#FFCF18"
                title={item.title}
                content={item.content}
              />
            </React.Fragment>
          ))}
      </Div>
      {content.link && (
        <Paragraph
          margin="30px 0 0 0"
          fontSize="18px"
          color={Colors.black}
          textDecoration="underline"
        >
          <Anchor color={`${Colors.black} !important`} to={content.link.url}>
            {content.link.label}
          </Anchor>
        </Paragraph>
      )}
    </Div>
  );
};

export default JobGuaranteeSmall;
