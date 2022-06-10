import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../hooks/useD3';
//import { displayPie, textAlgo1 } from '../utils/functions'
import { displayPie, LinearText } from '../utils/functions'

import { useDataContext } from '../utils/dataContext'
import { useFontSizeContext } from '../utils/fontSizeContext'
import { useZoomTypeContext } from '../utils/ZoomTypeContext'
import {removeOverlaps} from '../utils/removeOverlaps'

export default function CircleAlgo1({ doRemoveOverlap, set, setSvg}) {
    const { data } = useDataContext()
    const { fontSize } = useFontSizeContext()
    const { zoomType } = useZoomTypeContext()
    const [zoom, setZoom] = React.useState(1) 
    const ref = useD3(
        (svg) => {
            displayPie(svg, data, zoom)
            //textAlgo1(svg, data, fontSize, zoom)
            LinearText (svg, data, fontSize, zoom)
           /* if(doRemoveOverlap){
                removeOverlaps(svg)
                set(false)
            }*/
            svg.call(d3.zoom().on("zoom", (event) => {
            
                if (zoomType == "SEMENTIC") {
                    setZoom(event.transform.k)    // d3.event.scale in V3
                } else { //GEOMETRIC
                    svg.attr("transform", event.transform)
                }
             
            }))
            setSvg(svg)
        }, 
        [data, fontSize, doRemoveOverlap, zoom, zoomType]
    );
    return (
        <svg
            ref={ref}
        />
    );
}

