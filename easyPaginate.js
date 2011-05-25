(function($){

  var options = {
    nextButtonId:                     "",           // REQUIRED The id of the button/link that advances to the next page of items.
    prevButtonId:                     "",           // REQUIRED The id of the button/link that reverts to the previous page of items.
    itemClassName:                    "",           // REQUIRED The class name assignened to each item in the list.
    pageNumberId:                     "",           // REQUIRED IF YOU WANT TO SHOW PAGE NUMBERS.
    numberOfItemsAccross:              0,           // REQUIRED IF FIXED PAGINATION IS TRUE. Sets the maximum number of items that can fit horizontally on a page.
    numberOfItemsDown:                 0,           // REQUIRED IF FIXED PAGINAITON IS TRUE. Sets the maximum number of items that can fit vertically on a page.
    fixedPagination:               false,           // OPTIONAL Set to true if you want to use fixed pagination. Use this if you know that all of the items are of the same dimentions.
    startingPageNumber:                 1,          // OPTIONAL Set the page of items that you would like to display by default when the page loads.
    controlModifier:          "visibility",         // OPTIONAL Set the way in which the next and prev buttons/links will be hidden (display or visibility)
    hideOneOfOnePageCount:          false           // OPTIONAL Set to true if you want to hide the page count if there is only one page.
  }
  
  $.fn.easyPaginate = function(settings){
    $.extend(options, settings || {});
    initPagination(this);
  };
  
  initPagination = function(self){
    $.extend(self, {
      controlModifierOn:      (options.controlModifier == 'display') ? "inline" : "visible",
      controlModifierOff:     (options.controlModifier == 'display') ? "none" : "hidden",
      nextButton:             $("#"+options.nextButtonId),
      prevButton:             $("#"+options.prevButtonId),
      pageNumber:             (options.pageNumberId != "") ? $("#"+options.pageNumberId) : "",
      items:                  $('#'+self.attr("id")+' .'+options.itemClassName),
      currentPageNumber:      options.startingPageNumber,
      maxPageArea:            0,
      maxItemsPerPage:        0,
      totalPages:             1,
      
      setPageAreaOrMaxItems:  function() {
        if ( (options.numberOfItemsAccross > 0) && (options.numberOfItemsDown > 0) ){
          self.maxItemsPerPage = options.numberOfItemsAccross * options.numberOfItemsDown;
        }
        else{
          self.maxPageArea = self.css("height").match(/\d*/) * self.css("width").match(/\d*/); //Must use css property to work in IE.
        }
        return this;
      },
      
      fixedPaginate:          function() {
        var pageNumber = 1;
        var totalItemsOnCurrentPage = 0;
        var className;

        self.items.each( function() {
          className = $(this).attr("class");
          totalItemsOnCurrentPage++;

          if (totalItemsOnCurrentPage <= self.maxItemsPerPage) {
            className = className+" easyPaginatePage_"+pageNumber;
          }
          else{
            className = className+" easyPaginatePage_"+(++pageNumber);
            totalItemsOnCurrentPage = 1;
            self.totalPages++;
          }
          $(this).attr("class", className);
        });
        return this;
      },
      
      dynamicPaginate:        function() {
        var pageNumber = 1;
        var newContentArea = 0;
        var className;

        self.items.each( function() {
          newContentArea += $(this).fullArea();
          className = $(this).attr("class");
          if (newContentArea <= self.maxPageArea) {
            className = className+" easyPaginatePage_"+pageNumber;
          }
          else{
            className = className+" easyPaginatePage_"+(++pageNumber);
            newContentArea = $(this).fullArea();
            self.totalPages++;
          }
          $(this).attr("class", className);
        });
        return this;
      },
      
      changePage:             function(pageNumber){
        var newContentGroup = $('#'+self.attr("id")+' .easyPaginatePage_'+pageNumber);
        if (newContentGroup != null){
          self.displayNoItems();
          newContentGroup.each(function(index) {
            $(this).css('display', 'block');
          });
          self.currentPageNumber = pageNumber;
          self.updateUI();
        }
        return this;
      },
      
      displayNoItems:         function (){
        self.items.each( function() {
          $(this).css('display', 'none');
        });
        return this;
      },
      
      updateUI:                 function(){
        self.displayBackOrMoreButtons();
        if (options.pageNumberId != "") self.updatePageNumber(options.hideOneOfOnePageCount);
        return this;
      },

      displayBackOrMoreButtons: function (){
        (self.currentPageNumber == 1) ? self.prevButton.css(options.controlModifier, self.controlModifierOff) : self.prevButton.css(options.controlModifier, self.controlModifierOn);
        (self.currentPageNumber == self.totalPages) ? self.nextButton.css(options.controlModifier, self.controlModifierOff) : self.nextButton.css(options.controlModifier, self.controlModifierOn);
        return this;
      },

      updatePageNumber:         function () {
        ((self.totalPages <= 1) && options.hideOneOfOnePageCount) ? self.pageNumber.css('display', 'none') : self.pageNumber.text(""+self.currentPageNumber+" of "+self.totalPages);
        return this;
      }
    });
    
    self.setPageAreaOrMaxItems();
    self.css('display', 'block');
    options.fixedPagination ? self.fixedPaginate() : self.dynamicPaginate();
    self.changePage(self.currentPageNumber).updateUI();

    self.nextButton.click(function() {
      if ((self.currentPageNumber < self.totalPages)) self.changePage(++self.currentPageNumber);
      return false;
    });

    self.prevButton.click(function() {
      if ((self.currentPageNumber > 1)) self.changePage(--self.currentPageNumber);
      return false;
    });
  };
  
$.fn.fullArea = function(){
  var element = $(this);
  $.extend(element,{
    fullHeight: function() {
       var totalHeight = 0;
       $.each(["border", "padding", "margin"], function(){
         totalHeight += element.convertToInt(element.css(this+"-top"));
         totalHeight += element.convertToInt(element.css(this+"-bottom"));
       });
       return (totalHeight += element.height());
     },

     fullWidth: function() {
       var totalWidth = 0;
       $.each(["border", "padding", "margin"], function(){
         totalWidth += element.convertToInt(element.css(this+"-right"));
         totalWidth += element.convertToInt(element.css(this+"-left"));
       });
       return (totalWidth += element.width());
     },

     convertToInt:  function(value) {
       value = value.replace("px", "");
       return value == "" ? 0 : parseInt(value);
     }
  });
  
  return element.fullHeight() * element.fullWidth();
};
})(jQuery);