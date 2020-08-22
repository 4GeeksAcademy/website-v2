import React from 'react';
import {Column, Row, Divider} from '../../components/Sections'
import {Colors, BackgroundSection} from '../Styling';
import {H2, H3, H4, Title, Paragraph} from '../Heading'
import Link from 'gatsby-link'
import {Card} from '../Card';
import Fragment from "../Fragment"
const WhoIsHiring = props => {
  return (
    <Fragment margin={props.margin} padding="20px 0" github="/components/partner">
      <Title
        title={props.tagline}
        primary
        size="8"
        paragraph={props.subheading}
        customParagraphSize="12"
      />
      <Row >
        {props.images.map((item, index) => (
          <Column size="3" customRespSize respSize="3" key={index} margin="5px 0">
            <Card width="100%" padding="20px">
              <BackgroundSection
                image={item.image.childImageSharp.fluid}
                alt={item.alt}
                height={`60px`}
                bgSize={`contain`}
                margin={`1rem`}
              ></BackgroundSection>
            
            </Card>
          </Column>
        ))}
      </Row>
      { props.footerTagline &&
        <div>
          <H4 primary>{props.footerTagline}</H4>
          <Link to={props.footerLink}>
            <Paragraph color={Colors.blue}>{props.footerButton}</Paragraph>
          </Link>
        </div>
      }
    </Fragment>
  )
};

export default WhoIsHiring;
