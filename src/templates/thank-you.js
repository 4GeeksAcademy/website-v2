import React, {useState, useContext, useEffect} from 'react';
import BaseRender from './_baseLayout'
import {Column, Wrapper, WrapperImage, Divider, Div, Row} from '../components/Sections'
import {Title, H1, H2, H3, H4, H5, Paragraph} from '../components/Heading'
import {Button, Colors, Anchor} from '../components/Styling'
import Icon from '../components/Icon';
import {SessionContext} from '../session.js'
import Link from 'gatsby-link'


const ThankYou = (props) => {
  const {data, pageContext, yml} = props;
  const {session} = useContext(SessionContext);
  const [checkStatus, setCheckStatus] = useState([
    {label: "facebook", status: false, iconColor: "#166fe5"},
    {label: "twitter", status: false, iconColor: "#1da1f2"},
    {label: "instagram", status: false, iconColor: "#8a3ab9"},
    {label: "meetup", status: false, iconColor: "#f65858"},
  ])

  const updateStatus = (index, newvalue) => {
    let g = checkStatus[index]
    g["status"] = newvalue
    if (index === -1) {
      // handle error
      console.log('no match')
    }
    else
      setCheckStatus([
        ...checkStatus.slice(0, index),
        g,
        ...checkStatus.slice(index + 1)
      ]
      );
  }

  return (
    <>
      <WrapperImage
        margin="50px 0 0 0"
        height="250px"
        imageData={yml.banner.image && yml.banner.image.childImageSharp.fluid}
        border="bottom"
        bgSize="cover"
        paddingRight={`0`}
        customBorderRadius="0 0 0 1.25rem"
      >
        <Divider height="100px" />
        <Title
          size="5"
          color={Colors.white}
          title={yml.banner.tagline}
          paragraph={yml.banner.sub_heading}
          variant="main"
          paragraphColor={Colors.white}
          fontSize="46px"
          textAlign="center"

        />

      </WrapperImage>
      <Wrapper margin="0 0 10px 0">
        <H2 margin="5px 0">{yml.content.title}</H2>
        {yml.content.message.split("\n").map((m, i) =>
          <Paragraph key={i} align="center">{m}</Paragraph>
        )}

      </Wrapper>
      <Wrapper margin="0 0 50px 0">
        <H2 margin="10px 0" fontSize="24px">{yml.social.title}</H2>
        {session != undefined && session.location != null && Array.isArray(session.location.socials) && session.location.socials.map((item, index) => {
          return (
            <Row justifyContent="center" key={index} display="flex" >
              <Column size="8" size_sm="12" size_md="10" style={{position: "relative"}} >
                <label className="checkbox-container">
                  <input onChange={() => updateStatus(index, !checkStatus[index].status)} type="checkbox" id="scales" name="scales"
                    checked={checkStatus[index].status} />
                  <span className="checkmark" ></span>
                  <H4 align="left" align_sm="left">
                    <span style={{margin: "0 10px 0 0"}}>
                      <Icon icon={checkStatus[index].label} width="24" height="24" color={checkStatus[index].iconColor} fill={checkStatus[index].iconColor} />
                    </span>{item.social_name}
                  </H4>
                </label>
                {checkStatus[index].status &&
                  <Anchor to={`${item.social_link}`}>
                    <Button variant="full" style={{position: "absolute", right: "0", top: "0"}} width="200px" color={Colors.blue} textColor={Colors.white}>
                      {`${yml.social.button_text} ${item.social_name}`}
                    </Button>
                  </Anchor>
                }
              </Column>
            </Row>
          )
        })}
        <Column margin="50px 0 0 0" size="12" align="center">
          <Link to="/blog"><Button variant="outline" width="150px" color={Colors.blue} textColor={Colors.white}>{yml.content.button}</Button></Link>
        </Column>
      </Wrapper>

    </>
  )
};
export const query = graphql`
  query ThankQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            meta_info{
                title
                description
                image
                keywords
            }
            banner{
                tagline
                sub_heading
                image{
                    childImageSharp {
                      fluid(maxWidth: 1800, quality: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  } 
            }
            content{
                title
                message
                button
            }
            social{
              title
              message
              button_text
            }
            
        }
      }
    }
  }
`;
export default BaseRender(ThankYou);