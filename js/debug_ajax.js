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

// call the debugAjax function and acquire the data result.
var mydata = debugAjax();
// Note that the process is asynchronous, so the data loading may not be complete,
// and thus the mydata we get here may still be undefined
console.log('This is undefined: ',mydata);
