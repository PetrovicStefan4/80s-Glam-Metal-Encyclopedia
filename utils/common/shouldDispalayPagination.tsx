const shouldShowPagination = (data: any) => {
  let displayPagination = false;

  if (data.totalPages > 1) {
    displayPagination = true;
  }

  console.log(data);
  return displayPagination;
};

export default shouldShowPagination;
