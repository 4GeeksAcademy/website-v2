import React from 'react'
import PieChart from 'react-minimal-pie-chart';

export const Chart = (props) => {
    return (
        <>
            <PieChart
                data={props.data}
                label
                labelStyle={props.style}
                radius={75}
                viewBoxSize={[
                    100,
                    100
                ]}
            />
        </>
    )
}

