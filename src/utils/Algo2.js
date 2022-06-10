//import {fontSize} from './functions'
import * as d3 from 'd3';
export function Algo2(Texts, arcs, circle, svgc, data, fontSize) {
    // text are instances of textes in svg // create defaults ones
    // arcs [[x,y],[x,y], middles] // start cos, sin / calculate engle
    // circle {outermax, {x:0,y:0}}
    this.Texts = Texts;
    this.Arcs = arcs;
    this.Circle = circle;
    this.svg = svgc;
    this.data = data
    this.fontSize = fontSize
}
// put angles between [0,2*pi]
Algo2.prototype.normalizeAngle = function () {
    var arcsN = this.Arcs;
    var arcR = [];

    for (let index = 0; index < arcsN.length; index++) {
        if (arcsN[index][2].middle < 0) arcsN[index][2].middle = arcsN[index][2].middle + 2 * Math.PI;
        var newt = -arcsN[index][2].middle + 2 * Math.PI;
        arcR.push([arcsN[index][0], arcsN[index][1], { 'middle': newt }]);
    }
    // //console.log("normalize angle ", arcsN,arcR);
    return arcR;
}
Algo2.prototype.get_D_Newrectangle = function (dist, h) {

    return Math.sqrt(Math.pow((h / 2), 2) + Math.pow(dist, 2));
}
Algo2.prototype.get_D_rectangle = function (i) {
    var text = this.Texts[i];
    /* node().
 node().*/
    var h = text.getBoundingClientRect().height;
    var w = text.getComputedTextLength(); // width
    return [h, w];

}
// algo of distance correct
Algo2.prototype.getDistanceAngle = function (titaM, w) {
    var dist;
    if ((titaM >= 0) && (titaM <= Math.PI)) {

        dist = w * (titaM / Math.PI);
    } else {
        dist = w * (-(titaM / Math.PI) + 2);
    }
    ////console.log("titaM, dist", titaM,dist);

    return dist;
}
Algo2.prototype.get_Tita_Text = function (titaArc, i, D, h, R) {
    var tita1 = Math.asin((h / 2) / D);
    ////console.log("tita1 : ", tita1);
    // do it in the lab
    var tita2 = this.getTitaArc(titaArc, tita1, R);
    return tita2;
}
Algo2.prototype.getTitaArc = function (arc, titrec, R) {
    var middle = arc[2].middle;
    var dist = Math.abs(Math.cos(middle) * R);
    var tita = Math.acos(dist / R);
    var tita1 = Math.abs((Math.PI) - (tita));
    var titaf = (Math.PI) - (titrec + tita1);
   // //console.log("titaf de 2 er", titaf);

    return titaf;

}
Algo2.prototype.getDistText = function (D, R, tita) {
    var L = Math.abs(Math.sin(tita) * D);
    // //console.log("L : ", L);
    var S1 = Math.abs(Math.cos(tita) * D);
    var S2 = Math.sqrt(Math.pow(R, 2) - Math.pow(L, 2));

    //var S2 = Math.sin(tita1) * R;
    ////console.log("l s1 s2 tita ", L, S1, S2, tita1)
    return (S1 + S2);
}
Algo2.prototype.getCordination = function (titArc, dist) {
    var middle = titArc[2].middle;
    var x = Math.cos(middle) * dist;
    var y = Math.sin(middle) * dist; // check that, it have to "-"
    return [x, y];
}
Algo2.prototype.GetDistCircle = function (middle, Ds, w) {
    var distf = Ds;

    if ((middle >= (Math.PI / 2)) && (middle <= (3 * Math.PI / 2))) {
        distf = w - Ds;
    }
    return distf;

}

const pie = d3.pie()
    .sort(null)
    .value((d) => d.value)

const key = (d) => d.data.id;


Algo2.prototype.main = function () {
    var ResRectangles = [];
    var texts = this.Texts;
    var arcs = this.Arcs;
    var R = this.Circle.r;
    // //console.log(" R :", R);

    var TitaNorm = this.normalizeAngle();
    for (var i = 0; i < texts.length; i++) {
        var titArc = arcs[i];
        var resT = this.get_D_rectangle(i);
       /* //console.log("parameters : ", TitaNorm[i]);
        //console.log("parameters 2 : ", TitaNorm[i][2]);*/
        var Ds = this.getDistanceAngle(TitaNorm[i][2].middle, resT[1]); // d'
        var h = resT[0];
        var w = resT[1];
        var Ds2 = this.GetDistCircle(TitaNorm[i][2].middle, Ds, w);
        var D = this.get_D_Newrectangle(Ds2, h);
      //  //console.log("DS2 : ", Ds2, data[i].label, Ds); // problem tita = Nan
        var tita = this.get_Tita_Text(titArc, i, D, h, R, w);
        var dist = this.getDistText(D, R, tita);
        var cord = this.getCordination(titArc, dist);
        ResRectangles.push([cord, dist, h, w, Ds]);
    }
    this.DrawRectangle(ResRectangles, arcs, TitaNorm);
    return ResRectangles;
}
Algo2.prototype.DrawRectangle = function (rects, titArc, TitaNorm) {

    for (var i = 0; i < rects.length; i++) {
        var mid = TitaNorm[i][2].middle;
        var eleText = this.data[i];
        var colorText = this.data[i].color;
        var elem = rects[i];
        var cor = elem[0];
        var dists = elem[1];
        var h = elem[2];
        var w = elem[3];
        var D = elem[4];
        var newx;

        ////console.log("mid", mid, "text", eleText.label, "D", D, "W/2", w / 2);
        if (((mid >= 0) && (mid <= (Math.PI / 2))) || ((mid >= (3 * Math.PI / 2)) && (mid <= 2 * Math.PI))) {
            newx = cor[0] + Math.abs((w / 2) - D);
        } else {
            newx = cor[0] - Math.abs(D - (w / 2));
        }
        var newxx;
        newxx = newx - (w / 2);
        var newy = cor[1] - (h / 2);
        //console.log("fon size", font_size);

      /*  this.svg.select(".labels")
            .selectAll("text")
            .data(pie(this.data), key)
            .join('text')
            .attr("x", newx)
            .attr("y", cor[1])
            .text(eleText.label)
            .attr("font-size", this.fontSize)
            .style("text-anchor", "middle")
           // .attr("transform", "translate(" + 300 + "," + 300 + ")")
            .style("fill", colorText)
            .style("dominant-baseline", "central");*/

        this.svg.append("text")
            .attr("x", newx)
            .attr("y", cor[1])
            .attr("class", "labels")
            .text(eleText.label)
            .attr("font-size", this.fontSize )
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + 300 + "," + 300 + ")")
            .style("fill", colorText)
            .style("dominant-baseline", "central"); 
    }

}