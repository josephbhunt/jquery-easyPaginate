test("paginates the list items", function(assert){
  $('#itemList').easyPaginate({
    itemClassName: 'item',
    numberOfItemsDown: 3
  })
  ok($('#itemList .item.easyPaginatePage_1').length == 3, 'Passed!');
  ok($('#itemList .item.easyPaginatePage_2').length == 3, 'Passed!');
});
