import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';
import {Grid, Div} from '../Sections'
import {Paragraph} from '../Heading'
import {Colors} from '../Styling'
import Img from "gatsby-image"
import Fragment from "../Fragment"

export default ({location, lang, loading, link, short_link, paragraph, background, padding, padding_md}) => {
  const data = useStaticQuery(graphql`
    query myNewQueryBadges{
      allBadgesYaml{
        edges {
          node {
            paragraph
            badges {
              name
              url
              image{
                childImageSharp {
                  fluid(maxHeight: 120){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            link_text
            link_to
            short_link_text
            fields {
              lang
            }
          }
        }
      }
    }
    `)

  let content = data.allBadgesYaml.edges.find(({node}) => node.fields.lang === lang);
  if (content) content = content.node;
  else return null;

  return (
    <Fragment github="/new_components/badges">
      <Grid columns_md="12" background={background} padding={padding} padding_md={padding_md} rows={paragraph && `3`} >
        {/* <Grid columns_md="12" background={background} padding_md={padding_md} rows={paragraph && `3`} padding="0 17px" margin="36px 0 58px 0" margin_md="73px 0"> */}
        {paragraph && <Div className="badge-slider" justifyContent="between" gridArea_md="1/3/1/11">
          <Paragraph
            fontSize="18px"
            fontSize_tablet="22px"
            lineHeight="38px"
            fontWeight="300"
            color={Colors.black}
            dangerouslySetInnerHTML={{__html: paragraph}}
            margin="0 0 32px 0"
          />
        </Div>}
        <Div className="badge-slider" justifyContent="between" gridArea_md="2/3/2/11" alignItems="center">
          {content.badges.map((l, i) => {
            return (
              <Img
                style={{height: "85px", minWidth: "150px", margin: "0 24px"}}
                imgStyle={{objectFit: "contain"}}
                loading="eager"
                fadeIn={false}
                alt={l.name}
                fluid={l.image.childImageSharp.fluid}
              />
            )
          })}
          {short_link &&
            <Link to={content.link_to}><Paragraph color={Colors.blue}>{`${content.short_link_text} >`}</Paragraph></Link>
          }

        </Div>
        {link &&
          <Div gridArea_md="3/3/3/11" justifyContent="center" margin="50px 0 0 0">
            <Link to={content.link_to}><Paragraph color={Colors.blue}>{content.link_text}</Paragraph></Link>
          </Div>}
      </Grid>
    </Fragment>
  )
}
