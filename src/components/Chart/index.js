import React, {useState} from 'react'
import PieChart from 'react-minimal-pie-chart';
import styled, {css} from 'styled-components';
const labelCustom = styled.div`
    font-family: 'Lato';
    font-size: 5px;
    color: red;
`
export const Chart = (props) => {
    return (
        <>
            <PieChart
                animate={true}
                animationDuration={7000}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                data={props.dataArray}
                labelStyle={{
                    fontFamily: 'Lato',
                    fontSize: '8px'
                }}

                label={true}
                labelPosition={70}
                lengthAngle={360}
                lineWidth={15}
                tooltip={props.dataArray}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={0}
                // radius={50}
                // rounded
                startAngle={0}
                viewBoxSize={[
                    100,
                    100
                ]}
            />
        </>
    )
}

{/* <PieChart
                animate={true}
                animationDuration={7000}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                data={props.dataArray}
                labelStyle={{
                    fontFamily: 'Lato',
                    fontSize: '8px'
                }}

                label={true}
                labelPosition={70}
                lengthAngle={360}
                lineWidth={15}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={10}
                radius={50}
                rounded
                startAngle={0}
                viewBoxSize={[
                    100,
                    100
                ]}
            /> */}