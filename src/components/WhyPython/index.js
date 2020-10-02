import React from "react";
import {StaticQuery} from "gatsby"
import {Title} from "../Heading"
import {Colors, Anchor} from "../Styling"
import { PlayCircleFilledWhite } from "@material-ui/icons";

const WhyPython = ({ lang }) => {
    return <StaticQuery
    query={graphql`
    query WhyPythonQuery {
      list: allWhyPythonYaml{
        edges {
            node {
                fields{
                    lang
                }
                heading
                subheading
                link{
                    label
                    url
                }
                technologies {
                name
                percentage
                color
                }
          }
        }
      }
    }
  `}
        render={incoming => {
            console.log("incoming", incoming)
            let translations = incoming.list.edges.find(({ node }) => node.fields.lang === lang);
            if(translations) translations = translations.node;
          
            return <>
                <Title 
                    title={translations.heading}
                    paragraph={translations.subheading}
                    paragraphColor={Colors.darkGray}
                />
                <table style={{ width: "100%", height: "70px", verticalAlign: "middle" }}>
                    <tr>
                        {translations.technologies.map(t => 
                            <td style={{ 
                                width: t.percentage+"%",
                                backgroundColor: t.color,
                                textAlign: "center",
                                color: "white",
                                fontWeight: 900,
                                padding: "10px"
                            }}>{t.name}<br />{t.percentage}%</td>
                            )}
                    </tr>
                </table>
                <Anchor color={Colors.gray} align="center" target="_blank" rel="noopener noreferrer nofollow" href={translations.link.url}>{translations.link.label}</Anchor>
            </>}}
    />
}

export default WhyPython;