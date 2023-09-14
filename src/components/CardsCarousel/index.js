import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import { Button, Colors, Img} from "../Styling";
import { Grid, Div } from "../Sections";
import { H4, H3, H2, Paragraph } from "../Heading";
import Icon from "../Icon";

const CardsCarousel = ({
    lang,
    landingTemplate,
    title,
    sub_title,
    content,
    button,
    cards
}) => {
    const data = useStaticQuery(graphql`
    {
        allCardsCarouselYaml {
            edges{
                node{
                    title{
                        text
                    }
                    sub_title{
                        text
                    }
                    content{
                        text
                    }
                    button{
                        text
                    }
                    cards{
                        image{
                            src
                        }
                        heading{
                            text
                        }
                        button{
                            text
                        }
                    }
                }
            }
        }
    }
`);
    return (
        <Grid
            gridTemplateColumns_tablet="2fr repeat(14, 1fr) 2fr"
            flexDirection_tablet="column"
            maxWidth_tablet="1366px"
        >
            {title &&
                <H2 margin="0 0 10px 0"
                    fontWeight="700"
                >
                    {title.text}
                </H2>
            }

            {sub_title && /<\/?[a-z0-9]+>/g.test(sub_title.text) ? (
                <Paragraph
                    margin="10px 0"
                    dangerouslySetInnerHTML={{ __html: sub_title.text }}
                />
            ) : sub_title &&
            <Paragraph
                margin="10px 0"
            >
                {sub_title.text}
            </Paragraph>
            }

            <Div
                width="100%"
                className="badge-slider hideOverflowX__"
                flexDirection="row"
                m_sm="0px 0px 100px 0"
                justifyContent="between"
            >
                {cards.map((card, index) => (
                    <Div
                    >
                        <Img
                            src={card.image.src}
                        />
                        <H3>
                            {card.heading.text}
                        </H3>
                        <Button>
                            {card.button.text}
                        </Button>
                    </Div>
                )
                )}

            </Div>

            {content && /<\/?[a-z0-9]+>/g.test(content.text) ? (
                <Paragraph
                    dangerouslySetInnerHTML={{ __html: content.text }}
                />
            ) : content &&
            <Paragraph>
                {content.text}
            </Paragraph>
            }

            {button &&
                <Button
                    outline
                    // width="250px"
                    colorHoverText={button.hover_color || Colors.blue}
                    lineHeight="26px"
                    textColor={Colors[button.color] || button.color}
                    color={Colors[button.color] || button.color}
                    // padding_tablet="0"
                    fontSize="15px"
                    style={button.style ? JSON.parse(button.style) : null}
                    background={Colors[button.background] || button.background}
                    // textAlign="left"
                    margin="2rem 0"
                    padding=".35rem.85rem"
                    onClick={() => {
                        if (button.path && button.path.indexOf("http") > -1)
                            window.open(transferQuerystrings(button.path, utm));
                        else navigate(button.path);
                    }}
                >
                    {button.text}
                </Button>
            }
        </Grid>
    )
}
export default CardsCarousel;
