import React from "react";
import { H2, Paragraph } from "../Heading";
import { Div } from "../Sections";
import { Colors, Anchor } from "../Styling";
import Icon from "../Icon";

const JobGuaranteeSmall = ({ content }) => {
  return (
    <Div display="block" padding="20px" background={Colors.lightYellow}>
      {content.title && <H2 margin="0 0 30px 0">{content.title}</H2>}
      <Div
        maxWidth="1400px"
        margin="auto"
        justifyContent="around"
        flexWrap="wrap"
      >
        {content.icons.map((icon) => (
          <Div width="225px" flexDirection="column" alignItems="center">
            <Icon icon={icon.icon} width="94" height="98" />
            <Paragraph
              opacitu-="1"
              fontSize="14px"
              // width="140px"
              // width_md="auto"
              color={Colors.black}
              lineHeight="19px"
              padding="20px 0"
              // padding_tablet="20px 15%"
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
