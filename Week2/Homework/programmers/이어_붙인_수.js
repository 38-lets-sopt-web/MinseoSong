function solution(num_list) {
  const mapping = (num_list, filter) => {
    return num_list.filter((num) => num % 2 === filter).join("");
  };

  return +mapping(num_list, 0) + +mapping(num_list, 1);
}
