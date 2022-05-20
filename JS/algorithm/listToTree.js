//递归2
// function listToTree(
//   list,
//   pid = null,
//   { idName = "id", pidName = "pid", childName = "children" } = {}
// ) {
//   return list.reduce((root, item) => {
//     if (item[pidName] == pid) {
//       const children = listToTree(list, item[idName]);
//       if (children) {
//         item[childName] = children;
//       }
//       return [...root, item];
//     }
//     return root;
//   }, []);
// }

//递归2
// function list2Tree2(list, result, pid) {
//   for (item in list) {
//     if (item.id == pid) {
//       const newItem = { ...item, children: [] };
//       result.push(newItem);
//       list2Tree2(list, newItem.children, item.id);
//     }
//   }
// }

function listToTree(
  list,
  pid = null,
  { idName = "id", pidName = "pid", childName = "children" } = {}
) {
  let record = {};
  let result = [];
  list.forEach((element) => {
  record[element[idName]] = element;
  element[childName] = [];
  });

  list.forEach((element) => {
    if (element[pidName] == pid) {
      result.push(element);
    } else {
      record[element[pidName]][childName].push(element);
    }
  });
  return result;
}
const list = [
  { pid: null, id: 1, data: "1" },
  { pid: 1, id: 2, data: "2-1" },
  { pid: 1, id: 3, data: "2-2" },
  { pid: 2, id: 4, data: "3-1" },
  { pid: 3, id: 5, data: "3-2" },
  { pid: 4, id: 6, data: "4-1" },
];
let res = listToTree(list);
console.log(JSON.stringify(res));
