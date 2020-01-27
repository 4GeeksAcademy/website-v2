import React, {useState, useEffect} from 'react';
import Layout from '../global/Layout';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, Divider} from '../components/Sections'
import {Title, H2, H3, Span, Paragraph} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, RoundImage} from '../components/Styling'
import QueryTest from '../components/QueryTest'
import ProgramDescription from '../components/ProgramDescription'
import GeeksVsOthers from '../components/GeeksVsOthers'
import Mentors from '../components/Mentors'
import PricesAndPayment from '../components/PricesAndPayment'
import Alumni from '../components/Alumni'
import Select from 'react-select';
import Scrollspy from 'react-scrollspy'
import '../assets/css/style.scss'


const options = [
  {value: 'miami', label: 'Miami'},
  {value: 'santiago', label: 'Santiago'},
  {value: 'caracas', label: 'Caracas'},
  {value: 'madrid', label: 'Madrid'},
  {value: 'maracaibo', label: 'Maracaibo'},
];
const Program = ({data}) => {
  const [ip, setIp] = useState("ciao");
  const [location, setLocation] = useState();
  const [weeks, setWeeks] = useState();
  const publicIp = require("public-ip");

  (async () => {
    console.log(await publicIp.v4());
    //=> '46.5.21.123'

    setIp(await publicIp.v6());
    //=> 'fe80::200:f8ff:fe21:67cf'
  })();
  useEffect(async () => {
    await fetch(
      'http://api.ipstack.com/' + ip + '?access_key=9b1771a432a0ca7c933a9a641b63bb00',
    )
      .then(response => response.json())
      .then(data => setLocation(data))
    // console.log("ghfhg", location.region_name)
  }, []);
  return (
    <Layout>

      <Wrapper
        style="default"
        image="yes"
        url="../images/program-bg.png"
        border="bottom"
        height="500px"
        backgroundSize="cover"
      >
        <Divider height="100px" />

        {location != undefined &&
          <Row align="center" >
            <Column size="9" alignSelf="center">
              <Row>
                <Column size="2" alignSelf="center"><Paragraph color={Colors.white} fontSize="14px"> It takes just</Paragraph></Column>
                <Column size="3" alignSelf="center">
                  <Paragraph color={Colors.white} fontSize="16px">
                    <Select
                      defaultInputValue="9"
                    />
                  </Paragraph>
                </Column>
                <Column size="2" alignSelf="center"><Paragraph color={Colors.white} fontSize="14px">weeks in</Paragraph></Column>
                <Column size="3" alignSelf="center"><Select
                  defaultInputValue={"Miami"}
                  className="testy"
                  onChange={e => setWeeks(e.target.value)}
                  // value={location != undefined && location.region_name === "Florida" && "Miami"}
                  options={options}
                /></Column>
                <Column size="2" alignSelf="center"><Paragraph color={Colors.white} fontSize="14px">to become a</Paragraph></Column>
              </Row>
            </Column>
          </Row>}
        <Divider height="20px" />
        <Title
          size="5"
          title="FULL STACK DEVELOPER"
          paragraph="I'm impressed with the level of understanding 4Geeks students have, my hire eneded becoming team leader -CuevaSocial Marketing Agency"
          main
          color={Colors.white}
          fontSize="46px"
          textAlign="center"

        />
        <Row align="center">
          <Column align="right" size="6"><Button color={Colors.white} margin="15px 0" textColor={Colors.black}>REQUEST SYLLABUS</Button></Column>
          <Column align="left" size="6"><Button color="red" margin="15px 0" textColor=" white">APPLY NOW</Button></Column>
        </Row>
      </Wrapper>
      <Wrapper
        style="default">
        <QueryTest up="80" />
      </Wrapper>
      <Scrollspy items={['section-1', 'section-2', 'section-3']} currentClassName="nav__item--active">
        <li><a className="nav-item nav-link" href="#section-1" >4GEEKS VS ></a></li>
        <li><a className="nav-item nav-link" href="#section-2">section 2</a></li>
        <li><a className="nav-item nav-link" href="#section-3">THE PROGRAM</a></li>
      </Scrollspy>


      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title="4GEEKS OUTCOMES"
          paragraph="out of our total students, 76% are looking to get a job right after and 24% are pursuing to improve their skills or launch startups"
          primary
          customParagraphSize="8"
        />
        <Divider height="20px" />
        <Row height="380px">
          <RoundImage url="../images/program-charts.png" height="100%" width="100%" bsize="contain" />
        </Row>
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Divider height="40px" />
        <Row >
          <Column size="6" >
            <Card padding="20px" shadow height="350px" width="100%" margin="10px 0px">
              <Row height="100%">
                <Column size="10" customRespSize respSize="10">
                  <Row marginLeft="0px" marginBottom="15px" height="15%">
                    <RoundImage url="../images/geekpal.png" bsize="contain" height="100%" position="left" />
                  </Row>
                  <Row marginTop="15px">
                    <Column size="12">
                      <Paragraph color={Colors.black} customTextAlignSmall
                        alignXs="left">Get a job in tech</Paragraph>
                    </Column>
                  </Row>
                  <Row marginTop="15px">
                    <Column size="12">

                      {data.geek.edges[0].node.geek_pal.map((pal, index) => {
                        return (
                          <Row key={index} marginBottom="4px">
                            <Column size="1" customRespSize respSize="1">
                              <Check width="12px" color={Colors.blue} fill={Colors.blue} />
                            </Column>
                            <Column size="8" customRespSize respSize="8" test paddingRight="0px" paddingLeft="5px">
                              <Paragraph fontSize="11px" color={Colors.gray}>{pal}</Paragraph>
                            </Column>
                          </Row>)
                      })}
                    </Column>
                  </Row>
                </Column>
                <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.blue} fill={Colors.blue} /></Column>
              </Row>
            </Card>
          </Column>
          <Column size="6">
            <Card padding="20px" shadow height="350px" width="100%" margin="10px 0px">
              <Row height="100%">
                <Column size="10" customRespSize respSize="10">
                  <Row marginLeft="0px" marginBottom="15px" height="15%">
                    <RoundImage url="../images/geekforce.png" bsize="contain" height="100%" position="left" />
                  </Row>
                  <Row >
                    <Column size="12">
                      <Paragraph color={Colors.black} customTextAlignSmall
                        alignXs="left">FOR Career Empowerment</Paragraph>
                    </Column>
                  </Row>
                  <Row marginTop="15px">
                    <Column size="12">
                      {data.geek.edges[0].node.geek_force.map((pal, index) => {
                        return (
                          <Row key={index} marginBottom="2px" >
                            <Column size="1" customRespSize respSize="1">
                              <Check width="12px" color={Colors.blue} fill={Colors.blue} />
                            </Column>
                            <Column size="8" customRespSize respSize="8" paddingRight="0px" paddingLeft="5px">
                              <Paragraph fontSize="11px" color={Colors.gray}>{pal}</Paragraph>
                            </Column>
                          </Row>)
                      })}
                    </Column>
                  </Row>
                </Column>
                <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.blue} fill={Colors.blue} /></Column>
              </Row>
            </Card>
          </Column>
        </Row>
      </Wrapper>
      <Divider height="100px" />
      <Wrapper
        style="custom"
        full
      >
        <Title
          size="10"
          title="PROGRAM DETAILS"
          primary

        />
        <Divider height="50px" />
        <ProgramDescription />

        <section className="section" id="section-1"></section>

      </Wrapper>
      <Divider height="100px" />
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title="4GEEKS VS OTHER IN NUMBERS"
          paragraph="View full comparison table >"
          primary
        />
        <Divider height="50px" />
        <GeeksVsOthers />
        <section className="section" id="section-2"></section>
        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title="GET TRAINED BY SENIOR MENTORS"
          primary
        />
        <Divider height="50px" />
        <Mentors />
        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title="PRICING AND FINANCING"
          primary
        />
        <Divider height="50px" />
        <PricesAndPayment />
        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title="TYPICAL DAY AT THE ACADEMY"
          paragraph="Venenatis Ligula Ullamcorper Nibh Tellus"
          primary
        />
        <Divider height="50px" />

        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title="MEET THE ALUMNI AND PROJECTS"
          paragraph="Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam."
          primary
        />
        <Divider height="50px" />
        <Alumni />
        <Divider height="100px" />
      </Wrapper>

    </Layout >
  )
};

export const geekQuery = graphql`
query geekQuery{
        geek: allGeekPalYaml {
        edges {
        node {
        geek_pal
        geek_force
    }
  }
}
}
`

export default Program;