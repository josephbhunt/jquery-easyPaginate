easyPaginate.js
===============
EasyPaginate is a jQuery plugin that provides a simple way to paginate any group of HTML elements on a page. The functionality of the pagination is separated from your styles, and by default it looks very sparse. This allows you to apply any styles you like. 

EasyPaginate has the ability to paginate both vertically and horizontally. By default, when you call easyPaginate on an element it will find the area of that element and fit as many items into that space as possible. So, the items you want to paginate can be of variable size, and they can display as a list or a grid. (See the examples in the test folder.)

How to use it
-------------
Simply call esayPaginate on any HTML list element or a list of nested divs.

Example: $("#itemList").easyPaginate();

Pass any desired parameters as a hash into the function. See easyPaginate.js for descriptions of each option.
If you want to get the gird-like effect (as in the test/fixedGridExample.html), just float the paginated elements to the left.

Why I created it
----------------
I created this plugin so that I could easily paginate a list of HTML elements, without making any assumptions about how many items should fit inside the pagination area, or how they should be styled.

Why I like it
-------------
I like this solution because it abstracts the functionality of the pagination from the styles. The user is free to add what ever styles he/she likes. I am also proud of this plugin because it is very versatile, and it can paginate the items inside another HTML element in a grid-like fashion (See the fixedGridExample under /test).