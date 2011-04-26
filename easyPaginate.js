(function($){

	options = {
		nextButtonId:			"",					// REQUIRED The id of the button/link that advances to the next page of items.
		prevButtonId:			"",					// REQUIRED The id of the button/link that reverts to the previous page of items.
		itemClassName:			"",					// REQUIRED The class name assignened to each item in the list.
		pageNumberId:			"",					// REQUIRED	IF YOU WANT TO SHOW PAGE NUMBERS.
		numberOfItemsAccross:	0,					// REQUIRED	IF FIXED PAGINATION IS TRUE. Sets the maximum number of items that can fit horizontally on a page.
		numberOfItemsDown:		0,					// REQUIRED IF FIXED PAGINAITON IS TRUE. Sets the maximum number of items that can fit vertically on a page.
		fixedPagination:		false,				// OPTIONAL Set to true if you want to use fixed pagination. Use this if you know that all of the items are of the same dimentions.
		currentPageNumber:		1,					// OPTIONAL Set the page of items that you would like to display by default when the page loads.
		controlModifier: 		"visibility",		// OPTIONAL Set the way in which the next and prev buttons/links will be hidden (display or visibility)
		hideOneOfOnePageCount:	false
	}

$.fn.tiffanyPaginate = function(settings){
	if (settings != undefined)
		$.extend(options, settings);
	var currentPageNumber = options.currentPageNumber;
	var containerId = $(this).attr('id');
	var totalItemsForAllPages;
	var maxPageArea;
	var maxItemsPerPage;
	var totalPages = 1;
	var controlModifierOn;
	var controlModifierOff;
	
	/*********************************************
		Queries
	*********************************************/
	var container = $('#'+containerId);
	
	var nextButton = $("#"+options.nextButtonId);
	
	var prevButton = $("#"+options.prevButtonId);
	
	var pageNumber = $("#"+options.pageNumberId);
	
	var items = $('#'+containerId+' .'+options.itemClassName);
		
	/*********************************************
		End Queries
	*********************************************/
	
	setControlModifierValues();
	
	setPageAreaOrMaxItems();
	totalItemsForAllPages = items.length;
	$("#"+containerId).css('display', 'block');
	if (options.fixedPagination)
		fixedPaginate();
	else
		dynamicPaginate();
	changePage(currentPageNumber);
	updateUI();
	
	nextButton.click(function() {
		if ((currentPageNumber < totalPages) && changePage(currentPageNumber + 1)){
			currentPageNumber++;
			updateUI();
		}
		return false
	});
		
	prevButton.click(function() {
		if ((currentPageNumber > 1) && changePage(currentPageNumber - 1)){
			currentPageNumber--;
			updateUI();
		}
		return false
	});
	
	function setPageAreaOrMaxItems() {
		if (options.numberOfItemsAccross > 0 && options.numberOfItemsDown > 0)
			maxItemsPerPage = options.numberOfItemsAccross * options.numberOfItemsDown;
		else
			maxPageArea = container.css("height").match(/\d*/) * container.css("width").match(/\d*/); //Must use css property to work in IE.
	}
	
	function setControlModifierValues() {
		if (options.controlModifier == 'display'){
			controlModifierOn = "inline";
			controlModifierOff = "none";
		}
		if (options.controlModifier == 'visibility'){
			controlModifierOn = "visible";
			controlModifierOff = "hidden";
		}
	}
	
	function updatePageNumber() {
		if ((totalPages <= 1) && options.hideOneOfOnePageCount)
			pageNumber.css('display', 'none');
		else
			pageNumber.text(""+currentPageNumber+" of "+totalPages);
	}
	
	function updateUI(){
		displayBackOrMoreButtons();
		if (options.pageNumberId != "")
			updatePageNumber();
	}
	
	function pageHasMoreSpace(newContentArea) {
		if (newContentArea <= maxPageArea)
			return true;
		else
			return false;
	}
	
	function displayNoItems(){
		items.each( function() {
			$(this).css('display', 'none');
		});
	}
	
	
	function changePage(pageNumber){
		newContentGroup = $('#'+containerId+' .easyPaginatePage_'+pageNumber);
		if (newContentGroup != null){
			displayNoItems();
			newContentGroup.each(function(index) {
				$(this).css('display', 'block');
			});
			return true;
		}
		else
			return false;
    }
	
	function fixedPaginate() {
		var pageNumber = 1
		var totalItemsOnCurrentPage = 0;
		
		items.each( function() {
			className = $(this).attr("class");
			totalItemsOnCurrentPage++;
			
			if (totalItemsOnCurrentPage <= maxItemsPerPage) {
				className = className+" easyPaginatePage_"+pageNumber;
			}
			else{
				className = className+" easyPaginatePage_"+(++pageNumber);
				totalItemsOnCurrentPage = 1;
				totalPages++;
			}
			$(this).attr("class", className);
		});
	}
	
	function dynamicPaginate() {
		var pageNumber = 1;
		var newContentArea = 0;
		
		items.each( function() {
			newContentArea += ($(this).height() * $(this).width());
			className = $(this).attr("class");
			
			if (pageHasMoreSpace(newContentArea)) {
				className = className+" easyPaginatePage_"+pageNumber;
			}
			else{
				className = className+" easyPaginatePage_"+(++pageNumber);
				newContentArea = ($(this).height() * $(this).width());
				totalPages++;
			}
			$(this).attr("class", className);
		});
	}
	
	function displayBackOrMoreButtons(){
		if (currentPageNumber == 1)
			prevButton.css(options.controlModifier, controlModifierOff);
		else
			prevButton.css(options.controlModifier, controlModifierOn);
		
		if (currentPageNumber == totalPages)
			nextButton.css(options.controlModifier, controlModifierOff);
		else
			nextButton.css(options.controlModifier, controlModifierOn);
	}
};
})(jQuery);
