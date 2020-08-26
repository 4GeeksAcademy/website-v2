import React, {useState} from 'react';
import {Row, Column, Wrapper, Divider, Div} from '../Sections';
import styled from 'styled-components';
// import {useStaticQuery, graphql} from 'gatsby';
// import {makeStyles, withStyles} from '@material-ui/core/styles';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepButton from '@material-ui/core/StepButton';
// import StepConnector from '@material-ui/core/StepConnector';
// import StepLabel from '@material-ui/core/StepLabel';
// import clsx from 'clsx';
// import SettingsIcon from '@material-ui/icons/Settings';
// import GroupAddIcon from '@material-ui/icons/GroupAdd';
// import VideoLabelIcon from '@material-ui/icons/VideoLabel';
// import Check from '@material-ui/icons/Check';


// import Typography from '@material-ui/core/Typography';
import {Card} from '../Card';
import {H2, H3, H4, H5, Paragraph, Title} from '../Heading';
import {Button, Colors, Circle, RoundImage, UserGroup, Utensils, Coffee, Dumbbell, LaptopCode, FileCode} from '../Styling';
// import Switch from "react-switch";
const icons = {
    coffee: Coffee,
    circle: Circle,
    utensils: Utensils,
    dumbbell: Dumbbell,
    laptopcode: LaptopCode,
    filecode: FileCode,
    users: UserGroup
};

const ContainerStyle = styled.div`
    height: 1px;
    width: 100%;
    background-color: #E6BA1F;
    border-radius: 50px;
`
const FillerStyles = styled.div`
    height: 10px;
    width: ${props => props.completed}%;
    background-color: #E6BA1F;
    // background-color: ${props => props.bgColor};
    border-radius: inherit;
    text-align: right;
    transform: translateY(-50%);
`
const Step = styled.div`
    background-color: #ffffff;
    border: 1px solid #E6BA1F;
    zIndex: 1;
    width: 12px;
    height: 12px;
    display: flex;
    border-radius: 50%;
    
`
const TypicalDay = (props) => {
    const {data} = props;
    const [selected, setSelected] = useState(0);
    const [completed, setCompleted] = useState(0.5);

    const Slider = () => {
        let sliderArray = [];
        for (let i = 0; i < data.schedule.length; i++) {
            sliderArray.push(i)
        }
        return sliderArray
    }

    return (
        <>
            <Wrapper
                style="default"
            >
                <Title
                    size="10"
                    title="TYPICAL DAY AT THE ACADEMY"
                    paragraph="Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio"
                    primary
                />
                <Divider height="50px" />
                <Row height={`500px`} align={`center`}>
                    <Column size="8" display={`flex`} flexDirection={`column`} justifyContent={`space-between`}>
                        <Row height={`15%`} align={`between`}>
                            {data.schedule.length > 0 &&
                                data.schedule.map((item, index) => {
                                    const Icon = icons[item.icon.toLowerCase()]
                                    return (
                                        <Div
                                            key={index}
                                            cursor={`pointer`}
                                            flexDirection={`column`}
                                            onClick={() => {setSelected(index); setCompleted((item.step * 100) / (Slider().length - 1))}}
                                        >
                                            <Div justifyContent={`center`}>
                                                <Icon width="28" stroke={Colors.gray} fill={Colors.gray} />
                                            </Div>
                                            <Div justifyContent={`center`}>
                                                <Paragraph
                                                    fs_xs="8px"
                                                    fs_sm="12px"
                                                    fs_md="12px"
                                                    fs_lg="14px"
                                                    fs_xl="16px"
                                                >
                                                    {item.time}
                                                </Paragraph>
                                            </Div>
                                        </Div>
                                    )
                                })}
                        </Row>
                        <Row height={`15%`}>
                            <ContainerStyle>
                                <FillerStyles completed={completed} />
                            </ContainerStyle>
                        </Row>
                        <Row height={`15%`}>
                            <H3>{data.schedule[selected].title}</H3>
                        </Row>
                        <Row height={`55%`}>
                            <Paragraph
                                fs_xs="14px"
                                fs_sm="14px"
                                fs_md="16px"
                                fs_lg="20px"
                                fs_xl="20px"
                            >
                                {data.schedule[selected].content}
                            </Paragraph>
                        </Row>
                    </Column>
                </Row>
            </Wrapper>
        </>
    )
}

export default TypicalDay;

