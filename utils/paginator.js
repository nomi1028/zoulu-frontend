module.exports = function (q_page, q_limit, total) {
  const page = parseInt(q_page, 10) || 1;
  const limit = parseInt(q_limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;
  
  const pagination = {
    pages: Math.ceil(total / limit),
    current_page: page,
    records_per_page: limit,
    start_index: startIndex,
    last_index: lastIndex,
    next: null,
    prev: null
  };
  
  if(startIndex > 0) {
    pagination.prev = {
      page: page - 1
    }
  }
  
  if(lastIndex < total) {
    pagination.next = {
      page: page + 1
    }
  }
  
  return pagination;
}