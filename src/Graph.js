import React, { useState } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, MarkSeries, Crosshair} from 'react-vis';

function Graph(props) {

    const data = props.points
        .sort((a,b) => {
            if (a.d < b.d) return -1;
            if (a.d > b.d) return 1;
            return 0;
        })
        .map((point, i) => {
            return {x: point.d, y: point.w}
        });

    const [crosshair, setCrosshair] = useState([{x: data[0].x, y: data[0].y}]);


    return (
        <div className="graph">
            <XYPlot
                xType="ordinal"
                yType="linear"
                width={500}
                height={300}
                yDomain={[50, 300]}
            >
                <HorizontalGridLines />
                <LineSeries
                    data={data} />
                <MarkSeries
                    data={data}
                    onNearestXY={(value, {index}) => {
                        return setCrosshair([{x: value.x, y: value.y}]);
                    }}
                />
                <Crosshair values={crosshair}>
                    <div className="crosshair-box">
                        <p>{`${crosshair[0].y} LBS`}</p>
                    </div>
                </Crosshair>
                <XAxis />
                <YAxis />
            </XYPlot>
        </div>
    );
}

export default Graph;