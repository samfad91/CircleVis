import React, { useContext } from 'react';
import { useD3 } from '../hooks/useD3';
import { DataContext } from '../App'
import { displayPie, engleText, textArround, labelList, textAlgo1 , textAlgo2} from '../utils/functions'

function CircleChart(props) {
    const value = useContext(DataContext);

    const ref = useD3(
        (svg) => {
            svg.call(d3.zoom().on("zoom", function () {
                 console.log("I'm zooming")
                svg.attr("transform", d3.event.transform)
             }))
            displayPie(svg, value)
            //textArround(svg , value)
            //engleText(svg, value)
            //textAlgo1(svg, value)
            //labelList(svg , value)
            textAlgo2(svg , value)
            //   props.textFunction(svg , value)


            /* slices.transition()
                  .attrTween("d", (d) => {
                      console.log(d)
                      console.log("I'm d baby ")
                      d._current = d._current || d;
                      let interpolate = d3.interpolate(d._current, d);
                      d._current = interpolate(0);
                      return (t) => arc(interpolate(t));
              }) */



        },
        [value]
    );
    return (
        <svg
            ref={ref}
        />
    );
}

export default CircleChart;