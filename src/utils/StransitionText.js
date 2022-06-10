export function StransitionText(Texts, arcs, circle, svgc, data, fontSize) {
    this.Texts = Texts;
    this.Arcs = arcs;
    this.Circle = circle;
    this.svg = svgc
    this.data = data;
    this.fontSize = fontSize  
}

StransitionText.prototype.get_D_rectangle = function (i) {
    var text = this.Texts[i];
    var h = text.getBoundingClientRect().height;
    var w = text.getComputedTextLength(); // width
    var Ds = Math.sqrt(Math.pow((h / 2), 2) + Math.pow((w / 2), 2));
    return [Ds, h, w];

}
StransitionText.prototype.get_Tita_Text = function (titaArc, i, D, h, R) {
    var tita1 = Math.atan((h / 2) / D);
    var tita2 = this.getTitaArc(titaArc, tita1, R);
    return tita2;
}
StransitionText.prototype.getTitaArc = function (arc, titrec, R) {
    var middle = arc[2].middle;
    var dist = Math.abs(Math.cos(middle) * R);
    var tita = Math.acos(dist / R);
    var tita1 = Math.abs((Math.PI) - (tita));
    var titaf = (Math.PI) - (titrec + tita1);
    return titaf;

}
StransitionText.prototype.getDistText = function (D, R, tita) {
    var L = Math.abs(Math.sin(tita) * D);
    // //console.log("L : ", L);
    var S1 = Math.abs(Math.cos(tita) * D);
    var tita1 = Math.acos(L / R); // cos-1
    var S2 = Math.sin(tita1) * R;
    return (S1 + S2);
}
StransitionText.prototype.getCordination = function (titArc, dist) {
    var middle = titArc[2].middle;
    var x = Math.cos(middle) * dist;
    var y = Math.sin(middle) * dist; // check that, it have to "-"
    return [x, y];
}
StransitionText.prototype.main = function () {
    var ResRectangles = [];
    var texts = this.Texts;
    var arcs = this.Arcs;
    var R = this.Circle.r;
    // //console.log(" R :", R);
    for (var i = 0; i < texts.length; i++) {
        var titArc = arcs[i];
        var resT = this.get_D_rectangle(i);
        var D = resT[0];
        var h = resT[1];
        var w = resT[2];

        var tita = this.get_Tita_Text(titArc, i, D, h, R);
        ////console.log(" titaf D :", tita, D);
        var dist = this.getDistText(D, R, tita);
        ////console.log("distf :", dist);
        var cord = this.getCordination(titArc, dist);
        ResRectangles.push([cord, dist, h, w]);
    }
    this.DrawRectangle(ResRectangles, arcs);
    return ResRectangles;
}
StransitionText.prototype.DrawRectangle = function (rects, titArc) {
    //console.log("data", data, listColor, rects.length, data.length);
    var rectangls = [];
    for (var i = 0; i < rects.length; i++) {
        var mid = titArc[i][2].middle;
        var eleText = this.data[i];
        var colorText = this.data[i].color;
        var fontSizeDiff = this.data[i].fontSize
        var elem = rects[i];
        var cor = elem[0];
        var dists = elem[1];
        var h = elem[2];
        var w = elem[3];
        var newx;
        newx = cor[0] - (w / 2);
        var newy = cor[1] - (h / 2);
        /*    this.svg.append("rect").attr("x", newx)
            .attr("y", newy)
            .attr("width", w)
            .attr("height", h).
            attr("fill", "none")
            .attr("stroke", "black");
            this.svg.append("circle")
            .attr("cx", newx)
            .attr("cy", newy)
            .attr("r", 1)
            .attr("fill", "green");
    */

        console.log(eleText.label + " : " + parseInt(this.fontSize) + parseInt(fontSizeDiff))

        this.svg.append("text")
            .attr("x", cor[0])
            .attr("class", "algo1")
            .attr("y", cor[1])
            .text(eleText.label)
            .attr("transform", "translate(" + 300 + "," + 300 + ")")
            .style("text-anchor", "middle")
            .style("fill", colorText)
            .style("font-size", parseInt(this.fontSize) +  parseInt(fontSizeDiff))
            .style("dominant-baseline", "central");

    }
}