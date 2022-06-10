import React from 'react'
import { useD3 } from '../hooks/useD3'
import { displayPie, labelList } from '../utils/functions'
import { useDataContext } from '../utils/dataContext'
import * as d3 from 'd3';
import { useZoomTypeContext } from '../utils/ZoomTypeContext'
import { useFontSizeContext } from '../utils/fontSizeContext'


export default function CircleLabelList({setSvg }) {
    const { fontSize } = useFontSizeContext()
    const { data } = useDataContext()
    const { zoomType } = useZoomTypeContext()
    const [zoom, setZoom] = React.useState(1) 
   
    const ref = useD3(
        (svg) => {
            displayPie(svg, data , zoom)
            labelList(svg, data, fontSize , zoom)
        
            setSvg(svg)

            svg.call(d3.zoom().on("zoom", (event) => {
                if (zoomType == "SEMENTIC") {
                    setZoom(event.transform.k)    // d3.event.scale in V3
                } else { //GEOMETRIC
                    svg.attr("transform", event.transform)
                }

            }))
        },
        [data, fontSize, zoom, zoomType]
    );
 
    return (
        <svg
            ref={ref}
        />
    );
}

