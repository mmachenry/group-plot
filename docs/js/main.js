var ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : "1sNAMhM-q2qALFRJntZzOVBBwOu2DnXWnStEI7trBc20",
  worksheet : "1"
});

function render_map (locations) {
  var min_x = locations[0].X;
  var min_z = locations[0].Z;
  var max_x = locations[0].X;
  var max_z = locations[0].Z;
  
  for (var i = 1; i < locations.length; i++) {
    min_x = Math.min(locations[i].X, min_x);
    min_z = Math.min(locations[i].Z, min_z);
    max_x = Math.max(locations[i].X, max_x);
    max_z = Math.max(locations[i].Z, max_z);
  }
  
  var width = max_x - min_x;
  var height = max_z - min_z;
  
  var svg = "<svg id=\"world-map\" xmlns=\"http://www.w3.org/2000/svg\" width=\""
  + width + "\" height=\"" + height + "\" viewBox=\"" + min_x
  + " " + min_z + " " + max_x + " " + max_z + "\">";
  
  for (var i = 0; i < locations.length; i++) {
    svg += render_point(locations[i]);
  }
  
  svg += "</svg>";
  
  document.getElementById("container").innerHTML = svg;
  var panZoomTiger = svgPanZoom('#world-map');
}

function render_point (location) {
  var r = 5;
  return "<circle cx=\"" + location.X + "\" cy=\"" + location.Z
     + "\" r=\"10\" stroke=\"black\" stroke-width=\"3\" fill=\"black\" />"
     + "<text x=\"" + (location.X + r + 3) + "\" y=\"" + location.Z
     + "\" font-family=\"Verdana\" font-size=\"10\">" + location.Name + "</text>"
}

ds.fetch({ 
  success : function() {
    var rows = [];
    ds.each(function(row, rowIndex) {
      rows.push(row);
    });
    render_map(rows);
  },
  error : function(e) {
    console.log(e);
    console.log("Are you sure you are connected to the internet?");
  }
});
