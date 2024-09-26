import React from "react";
import { H2, Paragraph } from "../Heading";
import { Div } from "../Sections";
import { Colors, Anchor } from "../Styling";
import Icon from "../Icon";

const JobGuaranteeSmall = ({ content }) => {
  return (
    <Div
      display="block"
      padding="40px 20px"
      padding_tablet="50px 0"
      background={Colors.lightYellow}
    >
      {content.title && <H2 margin="0 0 30px 0">{content.title}</H2>}
      <Div
        maxWidth="1280px"
        margin_tablet="0 auto"
        justifyContent="around"
        flexWrap="wrap"
        padding_tablet="25px 40px"
        padding_md="25px 80px"
        padding_lg="25px 0px"
      >
        {content.icons.map((icon) => (
          <Div width="225px" flexDirection="column" alignItems="center">
            <Icon icon={icon.icon} color="#FFCF18" width="94" height="98" />
            <Paragraph
              fontSize="14px"
              color={Colors.black}
              lineHeight="19px"
              padding="20px 0"
            >
              {icon.title}
            </Paragraph>
          </Div>
        ))}
      </Div>
      {content.link && (
        <Paragraph
          margin="30px 0 0 0"
          fontSize="18px"
          color={Colors.black}
          opacity="1"
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
