//makes jQuery's ":contains" selector case-insensitive 
//@credit taken from css-tricks.com, written by Chris Coyier
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

//returns the search keywords from the searchBar
//selecting all the tr elements with the keywords in them
function searchTerm(){
	var quotesSeparated = $("#keywords").val().split('"');
	function evenItem(item, index){ //returns true for items with odd index. arrays are 0-indexed so these are the even items
		return (index % 2);
	}
	var keywords = quotesSeparated.filter(evenItem); //the even items from the "-split are the exact-terms, used as they are
	var notExactTerms = quotesSeparated.filter(function(item, index){return !evenItem(item, index)});
	notExactTerms.forEach(function(item){
		var spaceSeparated = item.split(' ').filter(function(item2){return item2}); //space-separated, empy-strings taken out
		keywords = keywords.concat(spaceSeparated);
	});
	
	var $searchStr;
	if (keywords.length>1 || keywords[0]!="") { //if there is at least one (non-empty) term
		if ($("#spaceLogic")){
			var rowSelector = "table.feedTable tr";
			var containsSelector = ":contains('";
			var separator = ($("#spaceLogic").val()=="AND" ? "')" : "'),"+rowSelector) + containsSelector; //for AND separator="'):contains('" for OR separator="'),table.feedTable tr:contains('"
			$searchStr = rowSelector + containsSelector + keywords.join(separator) + "')";
		}
	} else {
		$searchStr = "table.feedTable tr";
	}
	alert("searchStr="+$searchStr + " \r\n number of terms:"+keywords.length);
	return $searchStr;
}	

//The html for the line saying "Loading at the bottom of the table for each page that is searched for"
var trLoading = '<tr><td id="extTHMsg" align="center" colspan=5>Loading...</td></tr>'

function searchPresent(){
	var numOfPages = $("#numOfPages").val(); //number of pages to search
	alert("number of page="+numOfPages);
	var i = 1;
	var $loadingLine;
	var loadAnotherPage = function(response, status, xhr){ //callback method for the load - uses itself as the callback as well
		if (status == "error"){
			alert("Sorry, the extention encountered a problem trying to search for the keywords.");
			$("#extTHMsg").text("Problem encountered");
		} else {
			if ($loadingLine){ //dealing with the previous loadingLine (previous page)
				$loadingLine.children().detach().appendTo("table.feedTable tbody");
				$loadingLine.remove();
				alert("re-appended and removed" + i);
			} 
			if (++i <= numOfPages) { //preparing and starting the search for the new loadingLine (new page)
				$loadingLine = $('<tbody></tbody>');
				$loadingLine.insertAfter("table.feedTable tbody").append(trLoading).load(getQueryForPage(i) + " " + searchTerm(), loadAnotherPage);
			}
		}
	}
	$("table.feedTable tbody").html(trLoading).load(getQueryForPage(1) + " " + searchTerm(), loadAnotherPage);
	
}

//add the elements of the search bar into the DOM
function addTheBar(){
	var theBarMarkup = '<p><br><br><input type="text" id="keywords" name="SearchLink" placeholder="search keywords" />'
		+'   Spaces represent:<select id="spaceLogic" style="margin:0px 3px"><option selected value="AND">AND</option><option value="OR">OR</option></select>'
		+'   Number of pages to search:<select id="numOfPages" style="margin:0px 2px">'
	var hrefAttr = $("p.pages a:last").attr("href");
	var totalNumOfPages = Number(hrefAttr.substr(hrefAttr.indexOf('=')+1)); //number of pages in the Link Board
	for (var i=1; i<=totalNumOfPages; ++i){ //add an option for every page in the range (1,numOfPages), default value=5
		theBarMarkup += '<option value="'+i+'"'+ (i==5?' selected' : '') +'>'+i+'</option>';
	} //and for numOfPages add an option that is selected by default
	theBarMarkup += '</select><br><input type="button" id="searchButn" value="search the Link Board" style="padding:3px; margin:5px 0px" /></p>';
	$("p.tickList:first").after(theBarMarkup);
	$("#searchButn").click(searchPresent);
}
addTheBar();


//Observe changes to the DOM - as the searchbar is in an area loaded by ajax, and the extention has no access to the page's JS code or events
//@credit DOM observer - modified from StackOverflow answer by apsillers
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    console.log(mutations, observer);
	if ($("#keywords").length==0) { //the searchBat disappeared in the last DOM update - it should be added again
		addTheBar();
	}
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document.getElementById("feedItemListSpan"), {
  subtree: true,
  attributes: true
});



//Returns the formatting of the .load's url parameter - the XMLHttpRequest used on Sporlight 
function getQueryForPage(pageNumber){
	var hash = "page=" + pageNumber;
	return ($("#FeedPath").val() + "?" + hash + QuerystringExtras());
}
//Returns the end of the query format used by Spotlight
function QuerystringExtras() {
    return "&X-Requested-With=XMLHttpRequest&time=" + (new Date().valueOf());
}