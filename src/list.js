import { init } from "snabbdom/build/package/init";
import { h } from "snabbdom/build/package/h";
import { styleModule } from "snabbdom/build/package/modules/style";
import { classModule } from "snabbdom/build/package/modules/class";
import { eventListenersModule } from "snabbdom/build/package/modules/eventlisteners";
import pic from "./assect/1.jpg";
const patch = init([styleModule, classModule, eventListenersModule]);
const originalData = [
  {
    row: 1,
    title: "蜘蛛侠",
    desc: "蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠蜘蛛侠",
    imgSrc: pic,
  },
  {
    row: 2,
    title: "金刚狼",
    desc: "金刚狼金刚狼金刚狼金刚狼金刚狼金刚狼金刚狼",
    imgSrc: pic,
  },
  {
    row: 3,
    title: "钢铁侠",
    desc: "钢铁侠钢铁侠钢铁侠钢铁侠钢铁侠钢铁侠",
    imgSrc: pic,
  },
  {
    row: 4,
    title: "美国队长",
    desc: "美国队长美国队长美国队长美国队长美国队长",
    imgSrc: pic,
  },
  {
    row: 5,
    title: "雷神托尔",
    desc: "雷神托尔雷神托尔雷神托尔雷神托尔雷神托尔",
    imgSrc: pic,
  },
  {
    row: 6,
    title: "绿巨人",
    desc: "绿巨人绿巨人绿巨人绿巨人绿巨人绿巨人",
    imgSrc: pic,
  },
  {
    row: 7,
    title: "鹰眼",
    desc: "鹰眼鹰眼鹰眼鹰眼鹰眼鹰眼鹰眼鹰眼鹰眼",
    imgSrc: pic,
  },
  {
    row: 8,
    title: "惊奇队长",
    desc: "惊奇队长惊奇队长惊奇队长惊奇队长惊奇队长惊奇队长",
    imgSrc: pic,
  },
  {
    row: 9,
    title: "黑豹",
    desc: "黑豹黑豹黑豹黑豹黑豹黑豹黑豹黑豹黑豹",
    imgSrc: pic,
  },
  {
    row: 10,
    title: "死侍",
    desc: "死侍死侍死侍死侍死侍死侍死侍死侍死侍死侍死侍死侍",
    imgSrc: pic,
  },
];
let data = [
  originalData[9],
  originalData[8],
  originalData[7],
  originalData[6],
  originalData[5],
  originalData[4],
  originalData[3],
  originalData[2],
  originalData[1],
  originalData[0],
];

let vnode;
let nextKey = 11;
let sortType = "row";
function add() {
  const n = originalData[Math.floor(Math.random() * 10)];
  data = [
    { row: nextKey++, title: n.title, desc: n.desc, imgSrc: pic },
    ...data,
  ];
  changeSort(sortType);
}

function removeItem(item) {
  data = data.filter((m) => m !== item);
  nextKey--;
  changeSort(sortType);
  // vnode = patch(vnode, getVnode(data));
}

function changeSort(type) {
  sortType = type;
  data.sort((a, b) => {
    if (a[sortType] < b[sortType]) {
      return 1;
    }
    if (a[sortType] > b[sortType]) {
      return -1;
    }
    return 0;
  });
  vnode = patch(vnode, getVnode(data));
}

// 生成每列表每一项
function renderRow(item) {
  return h(
    "div.row",
    {
      key: item.row,
    },
    [
      h("div", { style: { fontWeight: "bold" } }, item.row),
      h("div", { style: { width: 100 + "px" } }, item.title),
      h("div", item.desc),
      h("div.imgContent", {
        style: { backgroundImage: "url(" + item.imgSrc + ")" },
      }),
      h("a.remove", { on: { click: () => removeItem(item) } }, "删除"),
    ]
  );
}

function getVnode(data) {
  return h("div", [
    h("h1", "漫威电影排名"),
    h("div.options", [
      h("div", [
        h("label", "排序方式："),
        h("span.btn-group", [
          h(
            "button.btn",
            {
              class: { active: sortType === "row" },
              on: {
                click: () => {
                  changeSort("row");
                },
              },
            },
            "热度值"
          ),
          h(
            "button.btn.title",
            {
              class: { active: sortType === "title" },
              on: {
                click: () => {
                  changeSort("title");
                },
              },
            },
            "电影名"
          ),
        ]),
      ]),
      h("button.btn.add", { on: { click: add } }, "新增"),
    ]),
    h("div.list", {}, data.map(renderRow)),
  ]);
}

window.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  vnode = patch(app, getVnode(data));
});
