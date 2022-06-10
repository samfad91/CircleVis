import * as d3 from 'd3';
import { StransitionText } from './StransitionText';
import { Algo2 } from './Algo2'



const pie = d3.pie()
    .sort(null)
    .value((d) => d.value)

const key = (d) => d.data.id;

const width = 400,
    height = 400
const radius = Math.min(width, height) / 2

const arc = d3.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.5);


const calculateArc = (radius) => {
   return d3.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.5); }

const outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);


const calculateOuterArc = (radius) => {
   return d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);
}

export const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2


/*
    1- This function is displaying a Pie inside the svg 
    2- The svg must have a child element <g> with class "slices"
    3- The data object is an array of {label : string , value : double}
*/
export const displayPie = (svg, data, zoom) => {


    /*svg.call(d3.zoom().on("zoom", function (e) {
        svg.attr("transform", "translate(" + e.translate + ")scale(" + e.scale + ")");
    }))
        .append("g").call(d3.drag()
            .on("drag", function (d, i) {
                d3.select(this).attr("transform", "translate(" + (this.x = d.x) + "," + (this.y = d.y) + ")");
            })); */

    let innerRaduis = radius * zoom
    svg
        .attr("width", "100%")
        .attr("height", 600)

    if (svg.select(".slices").empty()) {
        svg.append("g")
            .attr("class", "slices")
            .attr("transform", "translate(" + 300 + "," + 300 + ")");
    }
    if (svg.select(".labels").empty()) {
        svg.append("g")
            .attr("class", "labels")
    }
    svg.select(".slices")
        .selectAll("path.slice")
        .data(pie(data), key)
        .join(
            enter => {
                enter.append('path')
                    .attr("d", calculateArc(innerRaduis))
                    //  .style("fill-opacity", 0)
                    .style("fill", (d) => d.data.color)
                    .attr("class", "slice")
                   // .transition()
                //.duration(1500)
                    .style("fill-opacity", 1)
            },
            update => {
                update.attr("d", calculateArc(innerRaduis))
                    .style("fill", (d) => d.data.color)
                    //.attr("class", "slice")
            },
            exit => {
                exit
                    .transition()
                    .remove();
            }
        )
/*
    svg.select(".slices")
        .selectAll("path.slice")
        .on('mouseover', function (d) {
            // Highlight the nodes: every node is green except of him
            const color = d3.select(this).style('fill')
            svg.select(".slices")
                .selectAll("path.slice")
                .style('fill', "#eee")
            d3.select(this).style('fill', color)
            svg.select(".labels")
                .selectAll("text")
                .data(pie(data), key).join(
                    enter => {
                        enter.transition()
                            .style("fill", (d) => {
                                if (d.data.color == color) {
                                    console.log("I'm a color")
                                    return color
                                } else {
                                    return '#eee'
                                }
                            })
                    },
                    update => {
                        update
                            .transition() 
                            .style("fill", (d) => {
                                if (d.data.color == color) {
                                    return color
                                } else {
                                    return '#eee'
                                }
                            })

                    },
                    exit => {
                        exit
                            .transition()
                            .remove();
                    }
        )
                })

    svg.select(".slices")
        .selectAll("path.slice")
        .on('mouseout', function (d) {
            svg.select(".slices")
                .selectAll("path.slice")
                .data(pie(data), key)
                .join(
                    enter => {
                        enter.append('path')
                            .attr("d", calculateArc(radius))
                            // .style("fill-opacity", 0)
                            .style("fill", (d) => d.data.color)
                            .attr("class", "slice")
                            .transition()
                            .duration(1500)
                            .style("fill-opacity", 1)
                    },
                    update => {
                        update.attr("d", arc)
                            .transition()
                            .style("fill", (d) => d.data.color)
                            .attr("class", "slice")
                    },
                    exit => {
                        exit
                            .transition()
                            .remove();
                    }
                )

            svg.select(".labels")
                .selectAll("text")
                .data(pie(data), key)
                .join(
                    enter => {
                        enter.transition()
                            .style("fill", (d) => d.data.color)
                    },
                    update => {
                        update
                            .transition()
                            .style("fill", (d) => d.data.color)

                    },
                    exit => {
                        exit
                            .transition()
                            .remove();
                    }
                )


        }) */

    }

/*
    1- This function is displaying a Text inside the svg on the form of Engle Text
    2- The svg must have a child element <g> with class "label"
    3- The data object is an array of {label : string , value : double}
*/
export let engleText = (svg, data, fontSize, zoom) => {
   // let raduisS  ;
  
    let innerRadius = (radius -15) * zoom
   

    svg
        .select(".labels")
        .attr("transform", "translate(" + 300 + "," + 300 + ")")

    let text = svg.select(".labels")
        .selectAll("text")
        .data(pie(data), key)
        .join(enter => {
            console.log(enter)
            enter.append('text')
                .attr("dy", ".35em")
                .attr("font-size",(d) => d.data.fontSize + fontSize)
                .text((d) => d.data.label)
                .style("fill", (d) => d.data.color)
                .attr("class", 'label')
                .transition()
                .attrTween("transform", (d, i, e) => {
                    e[i]._current = e[i]._current || d;
                    console.log({ d }, { e }, e[i]._current, {i})
                    let interpolate = d3.interpolate(e[i]._current, d);
                    e[i]._current = interpolate(0);
                    return (t) => {
                        let d2 = interpolate(t);
                        let pos = [innerRadius * Math.cos(midAngle(d2) - Math.PI / 2), innerRadius * Math.sin(midAngle(d2) - Math.PI / 2)]
                        if (midAngle(d2) < Math.PI) {
                            return "translate(" + pos + ") rotate(" + (midAngle(d2) * 180 / Math.PI - 90) + ")";
                        }
                        else
                            return "translate(" + pos + ") rotate(" + (((midAngle(d2) * 180 / Math.PI) - 90) + 180) + ")";
                    };
                })
                .styleTween("text-anchor", (d, i, e) => {
                    e[i]._current = e[i]._current || d;
                    let interpolate = d3.interpolate(e[i]._current, d);
                    e[i]._current = interpolate(0);
                    return (t) => midAngle(interpolate(t)) < Math.PI ? "start" : "end";
                })

        },
            update => {
                update
                    .attr("dy", ".35em")
                    .attr("font-size", (d) => d.data.fontSize + fontSize)
                    .attr("class", 'label')
                    .text((d) => d.data.label)
                    .style("fill", (d) => d.data.color)
                    .transition()
                    .attrTween("transform", (d, i, e) => {
                        e[i]._current = e[i]._current || d;
                        let interpolate = d3.interpolate(e[i]._current, d);
                        e[i]._current = interpolate(0);
                        return (t) => {
                            let d2 = interpolate(t);
                            let pos = [innerRadius * Math.cos(midAngle(d2) - Math.PI / 2), innerRadius * Math.sin(midAngle(d2) - Math.PI / 2)]
                            if (midAngle(d2) < Math.PI) {
                                return "translate(" + pos + ") rotate(" + (midAngle(d2) * 180 / Math.PI - 90) + ")";
                            }
                            else
                                return "translate(" + pos + ") rotate(" + (((midAngle(d2) * 180 / Math.PI) - 90) + 180) + ")";
                        };
                    })
                    .styleTween("text-anchor", (d, i, e) => {
                        e[i]._current = e[i]._current || d;
                        let interpolate = d3.interpolate(e[i]._current, d);
                        e[i]._current = interpolate(0);
                        return (t) => midAngle(interpolate(t)) < Math.PI ? "start" : "end";
                    })
            },
            exit => {
                exit
                    .transition()
                    .remove()
            }
        )



}

export const LinearText = (svg, data, fontSize, zoom) => {
    // let raduisS  ;
   
     let innerRadius = (radius -15) * zoom
    
 
     svg
         .select(".labels")
         .attr("transform", "translate(" + 300 + "," + 300 + ")")
 
     let text = svg.select(".labels")
         .selectAll("text")
         .data(pie(data), key)
         .join(enter => {
             console.log(enter)
             enter.append('text')
                 .attr("dy", ".35em")
                 .attr("font-size",(d) => d.data.fontSize + fontSize)
                 .text((d) => d.data.label)
                 .style("fill", (d) => d.data.color)
                 .attr("class", 'label')
                 .transition()
                .attrTween("transform", (d, i, e) => {
                     e[i]._current = e[i]._current || d;
                     console.log({ d }, { e }, e[i]._current, {i})
                     let interpolate = d3.interpolate(e[i]._current, d);
                     e[i]._current = interpolate(0);
                     return (t) => {
                         let d2 = interpolate(t);
                         let pos = [innerRadius * Math.cos(midAngle(d2) - Math.PI / 2), innerRadius * Math.sin(midAngle(d2) - Math.PI / 2)]
                       
                      // console.log(pos);
                         if (midAngle(d2) < Math.PI) {
                             return "translate(" + pos + ") rotate(0)";
                         }
                         else
                             return "translate(" + pos + ") rotate(0)";
                     };
                 })
                 .styleTween("text-anchor", (d, i, e) => {
                     e[i]._current = e[i]._current || d;
                     let interpolate = d3.interpolate(e[i]._current, d);
                     e[i]._current = interpolate(0);
                     return (t) => midAngle(interpolate(t)) < Math.PI ? "start" : "end";
                 })
 
         },
             update => {
                 update
                     .attr("dy", ".35em")
                     .attr("font-size", (d) => d.data.fontSize + fontSize)
                     .attr("class", 'label')
                     .text((d) => d.data.label)
                     .style("fill", (d) => d.data.color)
                     .transition()
           .attrTween("transform", (d, i, e) => {
                         e[i]._current = e[i]._current || d;
                         let interpolate = d3.interpolate(e[i]._current, d);
                         e[i]._current = interpolate(0);
                         return (t) => {
                             let d2 = interpolate(t);
                             let pos = [innerRadius * Math.cos(midAngle(d2) - Math.PI / 2), innerRadius * Math.sin(midAngle(d2) - Math.PI / 2)]
                             if (midAngle(d2) < Math.PI) {
                                 return "translate(" + pos + ") rotate(0)";
                             }
                             else
                                 return "translate(" + pos + ") rotate(0)";
                         };
                     })
                     .styleTween("text-anchor", (d, i, e) => {
                         e[i]._current = e[i]._current || d;
                         let interpolate = d3.interpolate(e[i]._current, d);
                         e[i]._current = interpolate(0);
                         return (t) => midAngle(interpolate(t)) < Math.PI ? "start" : "end";
                     })
             },
             exit => {
                 exit
                     .transition()
                     .remove()
             }
         )
 
 
 
 }
 

export  function textArround (svg, data, fontSize, zoom)  {

    svg.select(".labels").selectAll("text").remove();
    svg.selectAll(".hiddenDonutArcs").remove();
    //  svg.select(".labels").remove()
    
    let innerRaduis = (radius -15) * zoom

    svg
        .select(".slices")
        .selectAll('.slice')
        .each((d, i, e) => {
            const firstArcSection = /(^.+?)L/;
            let newArc = firstArcSection.exec(d3.select(e[i]).attr("d"))[1];
            newArc = newArc.replace(/,/g, " ");

            //Create a new invisible arc that the text can flow along
            svg.append("path")
                .attr("class", "hiddenDonutArcs")
                .attr("id", "donutArc" + i)
                .attr("d", newArc)
                .attr("transform", "translate(" + 300 + "," + 300 + ")")
                .style("fill", "none");
        });
    svg.select(".labels")
        .selectAll("text")
        .data(pie(data), key)
        .join(enter => {

            console.log("enter : ")
            console.log({ enter })

            enter.append('text')
                .attr("dy", "-13px")
                .append("textPath")
                .attr("font-size", (d) => d.data.fontSize + fontSize)
                .attr("startOffset", "50%")
                .attr("transform", "translate(" + -300 + "," + -300 + ")")
                .style("text-anchor", "middle")
                .attr("xlink:href", (d, i) => "#donutArc" + i)
                .text((d) => d.data.label)
                .style("fill", (d) => d.data.color)
        }, update => {
            console.log("update ")
            console.log({update})
               update
                    .attr("font-size", (d) => d.data.fontSize + fontSize)
                    .text((d) => d.data.label)
                    .style("fill", (d) => d.data.color) 
                   
        },
            remove => {
                remove.remove()
            })


}

export const labelList = (svg, data, fontSize, zoom) => {
    let innerRadius = (radius -15) * zoom
   
    svg.select(".labels").selectAll("text").remove()
    svg.select(".lines").selectAll("polyline").remove()

    svg.select(".labels")
        .attr("transform", "translate(" + 300 + "," + 300 + ")")

    let text = svg.select(".labels")
        .selectAll("text")
        .data(pie(data), key)
        .join('text')
       // .attr("dy", ".35em")
        .attr("font-size", (d) => d.data.fontSize + fontSize)
        .text((d) => d.data.label)
        .style("fill", (d) => d.data.color)

    text.transition()
        .attrTween("transform", (d, i, e) => {
            e[i]._current = e[i]._current || d;
            let interpolate = d3.interpolate(e[i]._current, d);
            e[i]._current = interpolate(0);
            return (t) => {
                let d2 = interpolate(t);
                let pos = calculateOuterArc(innerRadius).centroid(d2);
                pos[0] = innerRadius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate(" + pos + ")"
            };
        })
        .styleTween("text-anchor", (d, i, e) => {
            e[i]._current = e[i]._current || d;
            let interpolate = d3.interpolate(e[i]._current, d);
            e[i]._current = interpolate(0);
            return (t) => midAngle(interpolate(t)) < Math.PI ? "start" : "end";
        })
    text.exit()
        .transition()
        .remove()

    svg.append("g")
        .attr("class", "lines")
        .attr("transform", "translate(" + 300 + "," + 300 + ")")

    svg
        .select(".lines")
        .selectAll("polyline")
        .data(pie(data), key)
        .join("polyline")
        .attr("points", (d) => {
            const d2 = d;
            let pos = calculateOuterArc(innerRadius).centroid(d2);
            pos[0] = innerRadius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
            return [calculateArc(innerRadius).centroid(d2), calculateOuterArc(innerRadius).centroid(d2), pos];
        }).
        style("fill", 'none')
        .style("stroke", d => d.data.color)
}

export const textAlgo1 = (svg, data, fontSize, zoom ) => {

    let innerRadius = radius * zoom
    svg.selectAll(".algo1").remove()
    svg.select(".labels")
        .selectAll("text").remove()

    svg
        .select(".labels")
        .attr("transform", "translate(" + 300 + "," + 300 + ")")

    let textclas = svg.select(".labels")
        .selectAll("text")
        .data(pie(data), key)
        .join('text')
        .attr("dy", ".20em")
        .attr("font-size", (d) => parseInt(d.data.fontSize) + parseInt(fontSize))
        .text((d) => d.data.label)
        .style("fill", 'none')

    const outer = innerRadius * 0.83;
    const sliceList = [];
    const co = data.length;

    let centers = [];
    let slices = svg.select(".slices").selectAll("path.slice").each(function (d) {
        let start = {
            'x': Math.cos(d.startAngle - Math.PI / 2) * outer,
            'y': Math.sin(d.startAngle - Math.PI / 2) * outer
        };
        let end = {
            'x': Math.cos(d.endAngle - Math.PI / 2) * outer,
            'y': Math.sin(d.endAngle - Math.PI / 2) * outer
        };
        let center = { 'middle': midAngle(d) - Math.PI / 2 };
        centers.push({ 'middle': midAngle(d) });
        sliceList.push([start, end, center])
    });
    const circle = { 'r': outer, 'o': { 'x': 0, 'y': 0 } };
    if (sliceList.length == co) {
        let txtA = new StransitionText(textclas._groups[0], sliceList, circle, svg, data, fontSize);
        txtA.main();
    }
}

export const textAlgo2 = (svg, data, fontSize, zoom) => {


    let innerRadius = (radius) * zoom
  
    // svg.selectAll(".algo2").remove()
    svg.selectAll("text").remove();
    // svg.select(".slices").selectAll("path.slice").remove();
    svg
        .select(".labels")
        .attr("transform", "translate(" + 300 + "," + 300 + ")")

    let textclas = svg.select(".labels")
        .selectAll("text")
        .data(pie(data), key)
        .join('text')
        .attr("dy", ".35em")
        .attr("font-size", (d) => d.data.fontSize + fontSize)
        .text((d) => d.data.label)
        .style("fill", 'none')

    const outer = innerRadius * 0.9;
    const sliceList = [];
    const co = data.length;

    let centers = [];
    let slices = svg.select(".slices").selectAll("path.slice").each(function (d) {
        let start = {
            'x': Math.cos(d.startAngle - Math.PI / 2) * outer,
            'y': Math.sin(d.startAngle - Math.PI / 2) * outer
        };
        let end = {
            'x': Math.cos(d.endAngle - Math.PI / 2) * outer,
            'y': Math.sin(d.endAngle - Math.PI / 2) * outer
        };
        let center = { 'middle': midAngle(d) - Math.PI / 2 };
        centers.push({ 'middle': midAngle(d) });
        sliceList.push([start, end, center])
    });
    const circle = { 'r': outer, 'o': { 'x': 0, 'y': 0 } };
    if (sliceList.length == co) {
        let txtA = new Algo2(textclas._groups[0], sliceList, circle, svg, data, fontSize);
        txtA.main();
        //algo 2 stransitionText sont les mêmes
    }
}

