var defaultOptions = {
  itemClassName: 'item',
  numberOfItemsDown: 3
}

module('EasyPaginate', {
  beforeEach: function(){
    $('#itemList').easyPaginate(defaultOptions);
  }
});

test("paginates the list items with fixed pagination", function(assert){
  ok($('#itemList .item.easyPaginatePage_1').length == 3, 'Passed!');
  ok($('#itemList .item.easyPaginatePage_2').length == 3, 'Passed!');
});

test("paginates the list items with dynamic pagination", function(assert){
  $('#itemList').easyPaginate({
    itemClassName: 'item',
    fixedPagination: false
  });
  ok($('#itemList .item.easyPaginatePage_1').length == 3, 'Passed!');
  ok($('#itemList .item.easyPaginatePage_2').length == 3, 'Passed!');
});

test("changePage advances to the given page", function(assert){
  $('#itemList').data("EasyPaginate").changePage(2)
  equal(3, $('#itemList .item.easyPaginatePage_2:visible').length, "Passed!");
  equal(0, $('#itemList .item.easyPaginatePage_1:visible').length, "Passed!");
});

test("displayNoItems hides all list items", function(assert){
  $('#itemList').data("EasyPaginate").displayNoItems()
  equal(0, $("#itemList .item:visible").length, "Passed!");
});

test('next button event is bound', function(assert){
  $('#next-button').trigger('click');
  equal(3, $('#itemList .item.easyPaginatePage_2:visible').length, "Passed!");
  equal(0, $('#itemList .item.easyPaginatePage_1:visible').length, "Passed!");
});

test('prev button event is bound', function(assert){
  $('#next-button').trigger('click');
  equal(3, $('#itemList .item.easyPaginatePage_2:visible').length, "Passed!");
  equal(0, $('#itemList .item.easyPaginatePage_1:visible').length, "Passed!");
  $('#prev-button').trigger('click');
  equal(3, $('#itemList .item.easyPaginatePage_1:visible').length, "Passed!");
  equal(0, $('#itemList .item.easyPaginatePage_2:visible').length, "Passed!");
});

test('page number button even is bound', function(assert){
  $('.page-number:eq(1)').trigger('click');
  equal(3, $('#itemList .item.easyPaginatePage_2:visible').length, "Passed!");
  equal(0, $('#itemList .item.easyPaginatePage_1:visible').length, "Passed!");
});
