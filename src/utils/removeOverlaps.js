import * as d3 from 'd3';
import OverlapText from "./OverlapsText"
import {midAngle} from './functions'



const getLeftRightSide = function (texts, listEngls) {
    var left = [];
    var right = [];
    for (let index = 0; index < listEngls.length; index++) {
        const element = listEngls[index];
        ////console.log("middle:", element.middle,texts[index]);

        if (element.middle <= Math.PI )  {
            left.push(texts[index]);
        } else
            right.push(texts[index]);
    }
    return [left, right];
}

const changeCoordiantion = function (texts, newPos) {
    //console.log("texts, newpos", texts, newPos);
    for (let index = 0; index < texts.length; index++) {
        const element = texts[index];

        var y1 = newPos[index][1];
        d3.select(element).attr("y", y1);
   

    }

}

export const removeOverlaps  = (svg)=> {
    let detectOverlap = new OverlapText();
    let centers = [];
  
    svg.select(".slices").selectAll("path.slice").each(function (d) {
        centers.push({ 'middle': midAngle(d) });
    });
  
    let isoverlaps = detectOverlap.GetOverlap(svg.selectAll("text")._groups[0]);
 
   console.log('is overlap ' + isoverlaps)
    if(isoverlaps){
        var LRText =  getLeftRightSide(svg.selectAll("text")._groups[0], centers);
   
        var lefts = LRText[0];
        var rights = LRText[1];
        detectOverlap.svgc = svg;
        //console.log("left and right sides:", lefts, rights);
        var isoveSides = detectOverlap.GetOverlap(lefts);
        //console.log("left",isoveSides);
        if(isoveSides){
            var getOverlap = detectOverlap.GenerateDataForm(lefts,0);
             changeCoordiantion(lefts,getOverlap);
        }
         isoveSides = detectOverlap.GetOverlap(rights);
        //console.log("rights",isoveSides);
        if(isoveSides){
        var getOverlap2 = detectOverlap.GenerateDataForm(rights,1);
         changeCoordiantion(rights,getOverlap2);
        }
    }


}