import { Slide } from '@material-ui/core';
import * as d3 from 'd3';
import { displayPie, engleText, textArround } from '../utils/functions'


let node = (svg , value) => {

  //  let container = document.createElement('div');
    // let value = [{ label: "Fiat", value: 0.2 }, { label: "Fiast", value: 0.2 }, { label: "Fiasat", value: 0.2 }, { label: "Fiat", value: 0.2 }, { label: "Fiast", value: 0.2 },]

    let width = 400,
        height = 400

    svg 
        .attr("width", width)
        .attr("height", height)

    if (svg.select(".slices").empty()) {
        svg.append("g")
            .attr("class", "slices")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    }
    if (svg.select(".label").empty()) {
        svg.append("g")
            .attr("class", "label")
            //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    }


    // display pie 
     displayPie(svg, value)

    // slices is a g element 
  
    // display text 
     engleText(svg,value)
    //textArround(svg,value)

   
}


export default node