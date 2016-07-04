/**
 * Created by oglop on 03/07/16.
 */
var gjson = '{"nodes":[' +
    '{"name":"Peter", "label":"Person", "id":1},' +
    '{ "name":"Michael", "label":"Person", "id":2},' +
    '{"name":"Neo4j","label":"Database","id":3},' +
    '{"name":"Super long text in this node is written", "label":"Database","id":4} ],' +

    '"links":[{"source":0, "target":1, "type":"KNOWS", "since":2010},' +
    '{"source":0, "target":2, "type":"FOUNDED"},' +
    '{"source":1, "target":2, "type":"WORKS_ON"}]}';

String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
}

var really_long_text = "This is really long text, full of ninjas, trees with fancy words and unicorns and  it's lenght is";
console.log(really_long_text,really_long_text.length);

graph = JSON.parse(gjson);

var width = 800;
var height = 800;
var radius = 50;
var cx1 = 150, cy1=150;
var cx2=250, cy2=250;
var min_zoom = 0.1;
var max_zoom = 7;
var zoom = d3.zoom().scaleExtent([min_zoom,max_zoom]);
var base_font_size = 10;
var max_text_size = 24;


var svg_tag = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border","thin solid red");


var zoom_box = svg_tag.append("g").attr("id", "zoom_box");

var group_1 = zoom_box.append("g").attr("id", "group_1").style("border","thin solid red")
    .attr("stroke","blue")
    .attr("stroke-width",2)
    .attr("transform", String.format("translate({0}, {1})", cx1, cy1))
    ;

var group_2 = zoom_box.append("g").attr("id", "group_2").style("border","thin solid red")
    // .attr("stroke","blue")
    // .attr("stroke-width",2)
    .attr("transform", String.format("translate({0}, {1})", cx2, cy2))
    ;



var circle_1 = group_1.append("circle").attr("r",radius).attr("id","circle1").attr("fill", "red");



var circle_2 = group_2.append("circle").attr("r",radius).attr("id","circle2").attr("fill", "yellow");

var tx2 = group_2.append("text").attr("text-anchor","middle").text(really_long_text);
tx2.attr("dy");


text = d3.selectAll("text").style("font-size", base_font_size);


var drag = d3.drag();
var groups = d3.selectAll("g");
groups.call(drag.on("drag", dragged));

function dragged(){
    //console.log("dragged");
    var e = d3.event;

    var res = String.format("{0} {1} {2} {3}", e.x, e.y, e.dx, e.dy);

    var ths = d3.select(this);

    var translate = String.format("translate({0}, {1})", e.x, e.y);
    //groups.attr("transform", translate);
    ths.attr("transform", translate);

}



zoom.on("zoom", zooming);
svg_tag.call(zoom);

function zooming() {
    //console.log("zooming");

    //
	// var base_radius = nominal_base_node_size;
    // if (nominal_base_node_size*zoom.scale()>max_base_node_size) base_radius = max_base_node_size/zoom.scale();
     //    circle.attr("d", d3.svg.symbol()
     //    .size(function(d) { return Math.PI*Math.pow(size(d.size)*base_radius/nominal_base_node_size||base_radius,2); })
     //    .type(function(d) { return d.type; }))
    //
	// //circle.attr("r", function(d) { return (size(d.size)*base_radius/nominal_base_node_size||base_radius); })
	// if (!text_center) text.attr("dx", function(d) { return (size(d.size)*base_radius/nominal_base_node_size||base_radius); });
    var transform = d3.event.transform;
    // console.log(transform.scale());

    // var text_size = base_font_size;
    // if (base_font_size*transform.k > max_text_size) text_size = max_text_size / transform.k ;
    // text.style("font-size", text_size + "px");
    // //
	// g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

    //console.log(evt.translate, evt.scale);
    zoom_box.attr("transform", transform)


	}