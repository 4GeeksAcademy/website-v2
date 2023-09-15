import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import { Button, Colors, Img } from "../Styling";
import { Grid, Div } from "../Sections";
import { H4, H3, H2, H1, Paragraph } from "../Heading";
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
        <>
            <Div
                display="flex"
                flexDirection="column"
                gap="10px"
                margin="50px 10% 30px 10%"
                maxWidth_tablet="1366px"
                margin_md="50px auto 20px auto"
                padding_tablet="20px 0 0 0"
                padding_xs="10px 0 0 0"
            >
                {title &&
                    <H2
                        margin="0 0 10px 0"
                        fontWeight="700"
                        fontSize={title.font_size[0]}
                        lineHeight="36px"
                    >
                        {title.text}
                    </H2>
                }

                {sub_title && /<\/?[a-z0-9]+>/g.test(sub_title.text) ? (
                    <Paragraph
                        margin="0 0 10px 0"
                        fontSize={sub_title.font_size[0]}
                        dangerouslySetInnerHTML={{ __html: sub_title.text }}
                    />
                ) : sub_title &&
                <Paragraph
                    margin="0 0 10px 0"
                    fontSize={sub_title.font_size[0]}
                >
                    {sub_title.text}
                </Paragraph>
                }
            </Div>
            <Div
                width_xs="90%"
                width_md="100%"
                className="badge-slider hideOverflowX__"
                flexDirection="row"
                marginTablet="97px 0"
                justifyContent_tablet="flex-start"
                justifyContent_md={cards.length > 3 ? "flex-start" : "center"}
                maxWidth_tablet="1366px"
                margin="auto"
            >
                {cards.map((card, index) => (
                    <Div
                        key={index}
                        flexDirection="column"
                        width="266px"
                        height="auto"
                        border="2px solid black"
                        margin="0 12px"
                        background={Colors.white}
                    >
                        <Img
                            src={card.image.src}
                            width="262px"
                            height="266px"
                        />
                        <Div height="70px">
                            <H1
                                textTransform="uppercase"
                                fontSize={card.heading.font_size}
                                fontWeight="900"
                                lineHeight="19px"
                                padding="24px 5px 12px 5px"
                            >
                                {card.heading.text}
                            </H1>
                        </Div>

                        <Div
                            padding="12px 0"
                            height="62px"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Link to="#">
                                <H3
                                    margin="12px 10px 12px 0"
                                    textTransform="uppercase"
                                    fontSize="16px"
                                    fontWeight="700"
                                    lineHeight="19px"
                                >
                                    {card.button.text}
                                </H3>
                            </Link>
                            <Link to="#">
                                <Icon
                                    icon="arrow-right"
                                    width="15px"
                                    height="12px"
                                //padding="0 0 0 5px"
                                />
                            </Link>
                        </Div>
                    </Div>
                )
                )}

            </Div>

            {content && /<\/?[a-z0-9]+>/g.test(content.text) ? (
                <Paragraph
                    padding="0 32px"
                    margin="30px 0 0 0"
                    dangerouslySetInnerHTML={{ __html: content.text }}
                />
            ) : content &&
            <Paragraph padding="0 32px" margin="30px 0 0 0">
                {content.text}
            </Paragraph>
            }
            <Div 
                padding="0 0 40px 0"
                justifyContent="center"
            >
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
                        margin="24px 0 32px 0"
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
            </Div>
        </>
    )
}
export default CardsCarousel;
