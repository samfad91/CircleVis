import React from 'react';
import { useD3 } from '../hooks/useD3';
import { displayPie, textArround } from '../utils/functions'
import { useDataContext } from '../utils/dataContext'
import * as d3 from 'd3';
import { useZoomTypeContext } from '../utils/ZoomTypeContext'
import { useFontSizeContext } from '../utils/fontSizeContext'

export default function CirclerAroundText({setSvg}) {

    const { data } = useDataContext()
    const { fontSize } = useFontSizeContext()
    const [zoom , setZoom] = React.useState(1) 
    const { zoomType } = useZoomTypeContext()

    const ref = useD3(
        (svg) => {
            console.log({data})
            displayPie(svg, data , zoom)
            textArround(svg, data, fontSize , zoom )

            setSvg(svg)

            svg.call(d3.zoom().on("zoom", (event) => {
                if (zoomType == "SEMENTIC") {
                    setZoom(event.transform.k)     // d3.event.scale in V3
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
