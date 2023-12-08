<template>
  <div :class="cardClass">
    <Card>
      <div class="left-content">
        <Tree
          :data="datalist"
          :render="renderContent"
          class="demo-tree-render"
          @on-select-change="selectChange"
        ></Tree>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      datalist: [
        {
          title: "parent 1",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%",
                },
              },
              [
                h("span", [
                  // h("Icon", {
                  //   props: {
                  //     type: "ios-folder-outline",
                  //   },
                  //   style: {
                  //     marginRight: "8px",
                  //   },
                  // }),
                  h("span", data.title),
                ]),
                h("span", {
                  style: {
                    display: "inline-block",
                    float: "right",
                    marginRight: "32px",
                  },
                }),
              ]
            );
          },
          children: [
            {
              title: "child 1-1",
              expand: true,
              render: (h, { root, node, data }) => {
                return h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      width: "100%",
                    },
                  },
                  [
                    h("span", [
                      // h("Icon", {
                      //   props: {
                      //     type: "ios-folder-outline",
                      //   },
                      //   style: {
                      //     marginRight: "8px",
                      //   },
                      // }),
                      h("span", data.title),
                    ]),
                    h("span", {
                      style: {
                        display: "inline-block",
                        float: "right",
                        marginRight: "32px",
                      },
                    }),
                  ]
                );
              },
              children: [
                {
                  title: "leaf 1-1-1",
                  id: "leaf 1-1-1",
                  expand: true,
                },
                {
                  title: "leaf 1-1-2",
                  id: "leaf 1-1-2",
                  expand: true,
                },
              ],
            },
            {
              title: "child 1-2",
              expand: true,
              render: (h, { root, node, data }) => {
                return h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      width: "100%",
                    },
                  },
                  [
                    h("span", [
                      // h("Icon", {
                      //   props: {
                      //     type: "ios-folder-outline",
                      //   },
                      //   style: {
                      //     marginRight: "8px",
                      //   },
                      // }),
                      h("span", data.title),
                    ]),
                    h("span", {
                      style: {
                        display: "inline-block",
                        float: "right",
                        marginRight: "32px",
                      },
                    }),
                  ]
                );
              },
              children: [
                {
                  title: "leaf 1-2-1",
                  id: "leaf 1-2-1",
                  expand: true,
                },
                {
                  title: "leaf 1-2-2",
                  id: "leaf 1-2-2",
                  expand: true,
                },
              ],
            },
          ],
        },
      ],
      selectRow: {},
    };
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%",
          },
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-wifi",
                color: this.selectRow.id === data.id ? "#17C232" : "#515a6e",
              },
              style: {
                marginRight: "8px",
              },
            }),
            h("span", data.title),
          ]),
          h("span", {
            style: {
              display: "inline-block",
              float: "right",
              marginRight: "32px",
            },
          }),
          h(
            "span",
            {
              style: {
                display: this.selectRow.id === data.id ? "block" : "none",
              },
            },
            [
              h("img", {
                attrs: {
                  src: require("@/assets/location.png"),
                  title: "定位",
                },
                style: {
                  width: "25px",
                  height: "25px",
                  marginRight: "8px",
                  marginTop: "5px",
                },
              }),
              // h("Icon", {
              //   props: {
              //     type: "ios-wifi",
              //     color: "#FCA802",
              //     title: "实时轨迹",
              //   },
              //   style: {
              //     marginRight: "8px",
              //     fontSize: "30px",
              //   },
              // }),
              // h("Icon", {
              //   props: {
              //     type: "ios-wifi",
              //     color: "#FCA802",
              //     title: "查看直播",
              //   },
              //   style: {
              //     marginRight: "8px",
              //     fontSize: "30px",
              //   },
              // }),
              // h("Icon", {
              //   props: {
              //     type: "ios-wifi",
              //     color: "#FCA802",
              //     title: "远程对讲",
              //   },
              //   style: {
              //     marginRight: "8px",
              //     fontSize: "30px",
              //   },
              // }),
              // h("Dropdown", [
              //   h("Icon", {
              //     props: {
              //       type: "ios-more",
              //       color: "#FCA802",
              //       title: "更多",
              //     },
              //     style: {
              //       marginRight: "8px",
              //       fontSize: "30px",
              //     },
              //   }),
              //   h("DropdownMenu", { slot: "list" }, [
              //     h("DropdownItem", {}, "历史轨迹"),
              //     h("DropdownItem", {}, "历史视频"),
              //     h("DropdownItem", {}, "设备信息"),
              //   ]),
              // ]),
            ]
          ),
        ]
      );
    },
    selectChange(data, item) {
      if (data.length) {
        this.selectRow = item;
      }
    },
  },
  computed: {
    cardClass() {
      return `left-card${this.visible ? "" : " left-card-close"}`;
    },
  },
};
</script>

<style scoped lang="less">
.left-card {
  position: absolute;
  top: 60px;
  left: 8px;
  width: 520px;
  z-index: 1000;
  transition: left linear 0.36s;
}
.left-card-close {
  left: -720px;
}

.left-content {
  width: 100%;
  height: 400px;
  overflow: auto;
}

.demo-tree-render .ivu-tree-title {
  width: 100%;
}
</style>
