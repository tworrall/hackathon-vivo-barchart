$(document).ready(function(){
	
	$.extend(this, grantsOne);
	
	$('#showTheChart').click(function() {
		$('#overlay-bg').show();
		parse(defineJsonForChart());

		return false;
	});
	
	$('#showTheChartTwo').click(function() {
		$('#overlay-bg').show();
		parse(defineJsonForChartTwo());

		return false;
	});

	$('#closeOverlay').click(function() {
		$('#overlay-bg').hide();
		return false;
	});
	$('#overlay-bg').click(function(){
	        $('#overlay-bg').hide();
	});		

	function parse(spec) {
	  vg.parse.spec(spec, function(chart) { chart({el:"#vis"}).update(); });
	}

	function defineJsonForChart() {
        var jasonForChart = {
		  "width": 500,
		  "height": 500,
		  "data": [
		    {
		      "name": "table",
		      "values": grantsOne
		    }
		  ],
		  "scales": [
		    {
		      "name": "cat",
		      "type": "ordinal",
		      "range": "height",
		      "padding": 0.2,
		      "domain": {"data": "table", "field": "data.category"}
		    },
		    {
		      "name": "val",
		      "range": "width",
		      "round": true,
		      "nice": true,
		      "domain": {"data": "table", "field": "data.value"}
		    },
		    {
		      "name": "color",
		      "type": "ordinal",
		      "range": "category20"
		    }
		  ],
		  "axes": [
		    {"type": "y", "scale": "cat", "tickSize": 0, "tickPadding": 8},
		    {"type": "x", "scale": "val"}
		  ],
		  "legends": [
		    {
		      "fill": "color",
		      "title": "Grants/Year",
		      "offset": 60,
		      "properties": {
		        "symbols": {
		          "fillOpacity": {"value": 0.9},
		          "stroke": {"value": "transparent"}
		        }
		      }
		    }
		  ],
		  "marks": [
		    {
		      "type": "group",
		      "from": {
		        "data": "table",
		        "transform": [{"type":"facet", "keys":["data.category"]}]
		      },
		      "properties": {
		        "enter": {
		          "y": {"scale": "cat", "field": "key"},
		          "height": {"scale": "cat", "band": true}
		        }
		      },
		      "scales": [
		        {
		          "name": "pos",
		          "type": "ordinal",
		          "range": "height",
		          "domain": {"field": "data.position"}
		        }
		      ],
		      "marks": [
		        {
		          "type": "rect",
		          "properties": {
		            "enter": {
		              "y": {"scale": "pos", "field": "data.position"},
		              "height": {"scale": "pos", "band": true},
		              "x": {"scale": "val", "field": "data.value"},
		              "x2": {"scale": "val", "value": 0},
		              "fill": {"scale": "color", "field": "data.position"}
		            }
		          }
		        },
		        {
		          "type": "text",
		          "properties": {
		            "enter": {
		              "y": {"scale": "pos", "field": "data.position"},
		              "dy": {"scale": "pos", "band": true, "mult": 0.5},
		              "x": {"scale": "val", "field": "data.value", "offset": -4},
		              "fill": {"value": "white"},
		              "align": {"value": "right"},
		              "baseline": {"value": "middle"},
		              "text": {"field": "data.value"}
		            }
		          }
		        }
		      ]
		    }
		  ]
		};
        return(jasonForChart);
    }
    
	function defineJsonForChart() {
		var = jsonForChart {
		  "width": 500,
		  "height": 200,
		  "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},
		  "data": [
		    {
		      "name": "table",
		      "values": grantsOne
		    },
		    {
		      "name": "stats",
		      "source": "table",
		      "transform": [
		        {"type": "facet", "keys": ["data.x"]},
		        {"type": "stats", "value": "data.y"}
		      ]
		    }
		  ],
		  "scales": [
		    {
		      "name": "x",
		      "type": "ordinal",
		      "range": "width",
		      "domain": {"data": "table", "field": "data.x"}
		    },
		    {
		      "name": "y",
		      "type": "linear",
		      "range": "height",
		      "nice": true,
		      "domain": {"data": "stats", "field": "sum"}
		    },
		    {
		      "name": "color",
		      "type": "ordinal",
		      "range": "category10"
		    }
		  ],
		  "axes": [
		    {"type": "x", "scale": "x"},
		    {"type": "y", "scale": "y"}
		  ],
		  "marks": [
		    {
		      "type": "group",
		      "from": {
		        "data": "table",
		        "transform": [
		          {"type": "facet", "keys": ["data.c"]},
		          {"type": "stack", "point": "data.x", "height": "data.y"}
		        ]
		      },
		      "marks": [
		        {
		          "type": "rect",
		          "properties": {
		            "enter": {
		              "x": {"scale": "x", "field": "data.x"},
		              "width": {"scale": "x", "band": true, "offset": -1},
		              "y": {"scale": "y", "field": "y"},
		              "y2": {"scale": "y", "field": "y2"},
		              "fill": {"scale": "color", "field": "data.c"}
		            },
		            "update": {
		              "fillOpacity": {"value": 1}
		            },
		            "hover": {
		              "fillOpacity": {"value": 0.5}
		            }
		          }
		        }
		      ]
		    }    
		  ]
		}
	}
}); 