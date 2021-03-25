import React, {useState, useEffect} from 'react';
import {Column, Row, Divider} from '../../components/Sections'
import {Colors, StyledBackgroundSection} from '../Styling';
import {H2, H3, H4, Title, Paragraph} from '../Heading'
import Link from 'gatsby-link'
import Card from '../Card';
import Fragment from "../Fragment"
import { getStorage } from "../../actions"

const WhoIsHiring = props => {

    
    const [ images, setImages ] = useState(props.images);
    useEffect(() => {
        if(props.autoTagLocation){
            const store = getStorage("academy_session");
            if(store && store.location) setImages(props.images.filter(i => !i.locations || i.locations.includes(store.location.breathecode_location_slug)));
        }
    },[])

  return (
    <Fragment margin={props.margin} padding="20px 0" github="/components/partner">
      <Row display="flex">
        {images.map((item, index) => (
          <Column key={index} size="3" size_sm="4" margin="5px 0">
            <Card width="100%" padding="20px" p_xs="3px">
              <StyledBackgroundSection
                image={item.image ? item.image.childImageSharp.fluid : null}
                alt={item.alt}
                margin="auto"
                height="60px"
                maxWidth="150px"
                bgSize={`contain`}
              ></StyledBackgroundSection>
            </Card>
          </Column>
        ))}
      </Row>
      {props.footerTagline &&
        <div>
          <H4 margin="20px 0 10px 0" fs_xs="20px" fs_sm="20px" fs_md="20px" fs_lg="20px" fontSize="20px" primary>{props.footerTagline}</H4>
          <Link to={props.footerLink}>
            <Paragraph align="center" color={Colors.blue}>{props.footerButton}</Paragraph>
          </Link>
        </div>
      }
    </Fragment>
  )
};

export default WhoIsHiring;
