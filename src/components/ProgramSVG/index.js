import React from 'react'
import {useStaticQuery, graphql} from 'gatsby';
const ProgramSVG = ({lang}) => {
    const data = useStaticQuery(graphql`
    query myProgramQuery{
        allProgramSvgYaml {
            edges {
              node {
                fields {
                    lang
                  }
                main_headings {
                  paragraph
                  title
                }
                circles{
                    title
                    title_second_line
                }
                blu_snake{
                    label
                }
              }
            }
          }
    }
    `)
    let svg = data.allProgramSvgYaml.edges.find(({node}) => node.fields.lang === lang);
    if (svg) svg = svg.node;

    return (
        <svg className="d-sm-none w-100" width="fit-content" height="700" viewBox="0 0 1750 1183" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1750" height="1183" fill="white" />
            <g clip-path="url(#clip0)">
                <rect width="1750" height="1183" fill="white" />


                <g filter="url(#filter0_d)">
                    <path d="M298 750C339.904 750 380.092 733.354 409.723 703.723C439.354 674.092 456 633.904 456 592L298 592V750Z" fill="#0097CE" />
                    <path d="M371 592C371 550.096 387.646 509.908 417.277 480.277C446.908 450.646 487.096 434 529 434C570.904 434 611.092 450.646 640.723 480.277C670.354 509.908 687 550.096 687 592L529 592L371 592Z" fill="#0097CE" />
                    <path d="M602 592C602 633.904 618.646 674.092 648.277 703.723C677.908 733.354 718.096 750 760 750C801.904 750 842.092 733.354 871.723 703.723C901.354 674.092 918 633.904 918 592L760 592L602 592Z" fill="#0097CE" />
                    <path d="M836 592C836 571.251 840.087 550.705 848.027 531.536C855.967 512.367 867.605 494.949 882.277 480.277C896.949 465.605 914.367 453.967 933.536 446.027C952.706 438.087 973.251 434 994 434C1014.75 434 1035.29 438.087 1054.46 446.027C1073.63 453.967 1091.05 465.606 1105.72 480.277C1120.39 494.949 1132.03 512.367 1139.97 531.536C1147.91 550.706 1152 571.251 1152 592L994 592L836 592Z" fill="#0097CE" />
                    <path d="M1062 592C1062 633.904 1078.65 674.092 1108.28 703.723C1137.91 733.354 1178.1 750 1220 750C1261.9 750 1302.09 733.354 1331.72 703.723C1361.35 674.092 1378 633.904 1378 592L1220 592L1062 592Z" fill="#0097CE" />
                    <path d="M1295 592C1295 571.251 1299.09 550.705 1307.03 531.536C1314.97 512.367 1326.61 494.949 1341.28 480.277C1355.95 465.605 1373.37 453.967 1392.54 446.027C1411.71 438.087 1432.25 434 1453 434C1473.75 434 1494.29 438.087 1513.46 446.027C1532.63 453.967 1550.05 465.605 1564.72 480.277C1579.39 494.949 1591.03 512.367 1598.97 531.536C1606.91 550.705 1611 571.251 1611 592L1453 592H1295Z" fill="#0097CE" />
                    <rect x="1529" y="581" width="82" height="602" fill="#0097CE" />
                    <rect x="298" y="668" width="82" height="298" transform="rotate(90 298 668)" fill="#0097CE" />
                </g>
                <rect x="549" y="234" width="4" height="50" transform="rotate(89.798 549 234)" fill="#E6BA1F" />
                <rect x="526" y="238" width="4" height="142" fill="#E6BA1F" />
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="25" font-weight="bold" letter-spacing="0em">
                    <tspan x="433" y="167.675">{svg.main_headings[0].title.toUpperCase()}</tspan>
                </text>
                <foreignObject x="425.932" y="180.805" width="250" height="250">
                    <p xmlns="http://www.w3.org/1999/xhtml" style={{margin: "0", fontFamily: "Lato, sans-serif"}}>{svg.main_headings[0].paragraph}</p>
                </foreignObject>
                <rect x="1014" y="234" width="4" height="50" transform="rotate(89.798 1014 234)" fill="#E6BA1F" />
                <rect x="991" y="238" width="4" height="142" fill="#E6BA1F" />
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="25" font-weight="bold" letter-spacing="0em"><tspan x="861" y="184.675">{svg.main_headings[1].title.toUpperCase()}</tspan></text>
                <foreignObject x="882.242" y="195.805" width="250" height="250">
                    <p xmlns="http://www.w3.org/1999/xhtml" style={{margin: "0", fontFamily: "Lato, sans-serif"}}>{svg.main_headings[1].paragraph}</p>
                </foreignObject>
                <rect x="1473" y="234" width="4" height="50" transform="rotate(89.798 1473 234)" fill="#E6BA1F" />
                <rect x="1450" y="238" width="4" height="142" fill="#E6BA1F" />
                <foreignObject x="1330.89" y="169.805" width="270" height="250">
                    <p xmlns="http://www.w3.org/1999/xhtml" style={{margin: "0", fontFamily: "Lato, sans-serif"}}>{svg.main_headings[2].paragraph}</p>
                </foreignObject>
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="25" font-weight="bold" letter-spacing="0em"><tspan x="1357" y="154.675">{svg.main_headings[2].title.toUpperCase()}</tspan></text>
                <rect x="792" y="944" width="4" height="50" transform="rotate(89.798 792 944)" fill="#E6BA1F" />
                <rect x="763" y="802" width="4" height="142" fill="#E6BA1F" />
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="25" font-weight="bold" letter-spacing="0em"><tspan x="662.158" y="981.675">{svg.main_headings[4].title.toUpperCase()}</tspan></text>
                <foreignObject x="657.893" y="995.81" width="270" height="250">
                    <p xmlns="http://www.w3.org/1999/xhtml" style={{margin: "0", fontFamily: "Lato, sans-serif"}}>{svg.main_headings[4].paragraph}</p>
                </foreignObject>
                <rect x="1252" y="944" width="4" height="50" transform="rotate(89.798 1252 944)" fill="#E6BA1F" />
                <rect x="1223" y="802" width="4" height="142" fill="#E6BA1F" />
                {/* <text fill="black" white-space="preserve" style={{fontFamily: "Lato, sans-serif", fontSize: "25", fontWeight: "bold", letterSpacing: "0em"}}><tspan x="1151.16" y="981.675">BUILD API&#xb4;S</tspan></text> */}
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="25" font-weight="bold" letter-spacing="0em"><tspan x="1151.16" y="981.675">{svg.main_headings[5].title.toUpperCase()}</tspan></text>
                <foreignObject x="1094.64" y="995.81" width="270" height="250">
                    <p xmlns="http://www.w3.org/1999/xhtml" style={{margin: "0", fontFamily: "Lato, sans-serif"}}>{svg.main_headings[5].paragraph}</p>
                </foreignObject>
                <g filter="url(#filter1_d)">
                    <circle cx="296" cy="592" r="75" fill="white" />
                    <circle cx="527" cy="592" r="75" fill="white" />
                    <circle cx="760" cy="592" r="75" fill="white" />
                    <circle cx="992" cy="592" r="75" fill="white" />
                    <circle cx="1224" cy="592" r="75" fill="white" />
                    <circle cx="1453" cy="592" r="75" fill="white" />
                </g>
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="25" font-weight="bold" letter-spacing="0em"><tspan x="227.39" y="981.675">{svg.main_headings[3].title.toUpperCase()}</tspan></text>
                <rect x="290" y="802" width="4" height="142" fill="#E6BA1F" />
                <rect x="319" y="944" width="4" height="50" transform="rotate(89.798 319 944)" fill="#E6BA1F" />
                <foreignObject x="217.012" y="995.81" width="230" height="250">
                    <p xmlns="http://www.w3.org/1999/xhtml" style={{margin: "0", fontFamily: "Lato, sans-serif"}}>{svg.main_headings[3].paragraph}</p>
                </foreignObject>
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="19" font-weight="bold" letter-spacing="0em"><tspan x="249.417" y="597.853">{svg.circles[0].title.toUpperCase()}</tspan></text>
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="19" font-weight="bold" letter-spacing="0em"><tspan x="460.057" y="583.853">{svg.circles[1].title.toUpperCase()} &#10;</tspan><tspan x="460.057" y="606.853">{svg.circles[1].title_second_line.toUpperCase()}</tspan></text>
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="19" font-weight="bold" letter-spacing="0em"><tspan x="700.892" y="583.853">{svg.circles[2].title.toUpperCase()} &#10;</tspan><tspan x="700.892" y="606.853">{svg.circles[2].title_second_line.toUpperCase()}</tspan></text>
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="19" font-weight="bold" letter-spacing="0em"><tspan x="920.953" y="583.853">{svg.circles[3].title.toUpperCase()} &#10;</tspan><tspan x="920.953" y="606.853">{svg.circles[3].title_second_line.toUpperCase()}</tspan></text>
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="20" font-weight="bold" letter-spacing="0em"><tspan x="1164.3" y="584.74">{svg.circles[4].title.toUpperCase()}&#10;</tspan><tspan x="1164.3" y="608.74"> {svg.circles[4].title_second_line.toUpperCase()}</tspan></text>
                <text fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="20" font-weight="bold" letter-spacing="0em"><tspan x="1400.21" y="584.74">{svg.circles[5].title.toUpperCase()} &#10;</tspan><tspan x="1400.21" y="608.74">{svg.circles[5].title_second_line.toUpperCase()}</tspan></text>
                <text transform="translate(116.186 699.769) rotate(-0.203886)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[0].label.toUpperCase()}</tspan></text>
                <text transform="translate(201.206 699.511) rotate(-0.41943)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[1].label.toUpperCase()}</tspan></text>
                <text transform="translate(290 702.285) rotate(-19.2109)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[2].label.toUpperCase()}</tspan></text>
                <text transform="translate(386 646.632) rotate(-71.7819)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[3].label.toUpperCase()}</tspan></text>
                <text transform="translate(404.572 578.495) rotate(-73.4751)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[4].label.toUpperCase()}</tspan></text>
                <text transform="translate(434 514.067) rotate(-38.6735)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[5].label.toUpperCase()}</tspan></text>
                <text transform="translate(524.615 470) rotate(15.7514)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[6].label.toUpperCase()}</tspan></text>
                <text transform="translate(630.554 525.522) rotate(65.6541)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[7].label.toUpperCase()}</tspan></text>
                <text transform="translate(664.417 649) rotate(38.1837)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[8].label.toUpperCase()}</tspan></text>
                <text transform="translate(749.838 701.808) rotate(-13.926)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[9].label.toUpperCase()}</tspan></text>
                <text transform="translate(835 666.809) rotate(-59.6406)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[10].label.toUpperCase()}</tspan></text>
                <text transform="translate(869 587.305) rotate(-74.103)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[11].label.toUpperCase()}</tspan></text>
                <text transform="translate(903 502.488) rotate(-31.1899)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[12].label.toUpperCase()}</tspan></text>
                <text transform="translate(1006.96 463) rotate(20.5137)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[13].label.toUpperCase()}</tspan></text>
                <text transform="translate(1077.49 497.877) rotate(54.8048)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[14].label.toUpperCase()}</tspan></text>
                <text transform="translate(1114.55 575.928) rotate(75.5483)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[15].label.toUpperCase()}</tspan></text>
                <text transform="translate(1133.08 642) rotate(51.8771)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[16].label.toUpperCase()}</tspan></text>
                <text transform="translate(1202 692.401) rotate(-6.34118)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[17].label.toUpperCase()}</tspan></text>
                <text transform="translate(1299 665.266) rotate(-67.4786)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[18].label.toUpperCase()}</tspan></text>
                <text transform="translate(1364 508.687) rotate(-37.2835)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[19].label.toUpperCase()}</tspan></text>
                <text transform="translate(1439.24 468) rotate(7.74523)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[20].label.toUpperCase()}</tspan></text>
                <text transform="translate(1508.52 482) rotate(26.0926)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[21].label.toUpperCase()}</tspan></text>
                <text transform="translate(1567.01 533) rotate(84.4519)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[22].label.toUpperCase()}</tspan></text>
                <text transform="translate(1575.16 628.87) rotate(88.5131)" fill="black" white-space="preserve" font-family="Lato, sans-serif" font-size="15" font-weight="bold" letter-spacing="0em"><tspan x="0" y="14.805">{svg.blu_snake[23].label.toUpperCase()}</tspan></text>
            </g>
            <defs>
                <filter id="filter0_d" x="-4" y="434" width="1619" height="757" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
                <filter id="filter1_d" x="209" y="509" width="1331" height="174" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="6" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
                <clipPath id="clip0">
                    <rect width="1750" height="1183" fill="white" />
                </clipPath>
            </defs>
        </svg >
    )
}
export default ProgramSVG;