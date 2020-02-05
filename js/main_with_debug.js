//initialize function called when the script loads
function initialize(){
	cities();
	// call the debugAjax function and acquire the data result.
	var mydata = debugAjax();
	// Note that the process is asynchronous, so the data loading may not be complete,
	// and thus the mydata we get here may still be undefined
	console.log('This is undefined: ',mydata);
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];



	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");

	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");

	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
    //add city population to the table
    addColumns(cityPop);

    //add click event and color changing event to the table
    addEvents();
};

//function to add column values (e.g., city population) to the table
function addColumns(cityPop){

  // for each tr (table row)
    $('tr').each(function(i){
      // if this is the first row
    	if (i == 0){
      // append an new th (table head) as a new item to this row
    		$(this).append('<th>City Size</th>');
    	} else {
        // claim a variable called citySize
    		var citySize;
        // if the population of the city is smaller than 100000, then we assign
        // the citySize as Small
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
        // if the population of the city is smaller than 500000 and equal or
        // greater than 100000, then we assign the citySize as Medium
    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';
        // if the population of the city is equal or greater than 500000,
        // then we assign the citySize as Large
    		} else {
    			citySize = 'Large';
    		};
        // append the citySize value to the end of each tr as a new td
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};

//function to add click event and color changing event to the table
function addEvents(){
  // set the function to react the mouseover event on the table
	$('table').mouseover(function(){
  // claim a variable (string) to store color information
		var color = "rgb(";
    // loop to assign value to red, green and blue
		for (var i=0; i<3; i++){
      // generate a random integar number between 0 and 255
			var random = Math.round(Math.random() * 255);
      // store the color value in the color string
			color += random;
      // when it is not the blue (final) color value, add a comma and continue
			if (i<2){
				color += ",";
      // when it is the blue (final) color value, add a bracket to complete the string
			} else {
				color += ")";
		};
    }
    // assign the color value to the stylesheet of the table using jquery css method
		$(this).css('color', color);

	});

  // define the function to respond the click event on the table
	function clickme(){
    // when click on the table, popup the alert dialog with a custom message
		alert('Hey, you clicked me!');
	};
// let the clickme function respond the click event
	$('table').on('click', clickme);
};

//call the initialize function when the document has loaded
$(document).ready(initialize);

// callback function for ajax
function debugCallback(response){
	// The data loading is complete when we call this function
	// So the data can be printed in the console here.
	console.log('This is the data: ', response);

	// Display the data in the mydiv element
	// JSON.stringify is used to translate the JSON to a string
	$(mydiv).append('GeoJSON data: ' + JSON.stringify(response));
};

function debugAjax(){
// declaim the mydata variable
	var mydata;
	// JQuery Ajax Requests method for loading and using geoJSON data
	$.ajax("data/MegaCities.geojson", {
		// set dataType to json since we are loading geoJSON file
		dataType: "json",
		// When succeed, trigger this anonymous callback function
		success: function(response){
			// assign response data to mydata
			mydata = response;
			// trigger another function named debugCallback
			debugCallback(mydata);
		}
	});
	// The data loading may not be complete since it is outside the anonymous function
	// so we got undefined here
	console.log('This is undefined: ',mydata);

	// return our data (may not finish the loading yet)
	return mydata;
};
