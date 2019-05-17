define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
    'vueTable',
    'vueAlert',
    'vueTableFilter',
], function (require, Vue, systemConfig, $, table, alert) {
    'use strict';
    var tableHelper = table.helper;
    var tableVm1 = new Vue({
        el: "#table1",
        data: {
            filters: [
                {
                    name: "key",
                    text: "显示名",
                    type: "options",
                    all: true,
                    isOut: false,
                    options: [{ text: "显示1", value: "value1" }, { text: "显示2", value: "value2" }, { text: "显示3", value: "value3" }]
                }
            ],
            filter: {
                key: "value1"
            },
            loadingMessage: '正在加载，请等候......',
            pageSize: 20,
            domainAjaxOptions: {},
            btns: [
                {
                    id: "add",
                    name: "添加",
                    enableClass: "btn-danger"
                },
                {
                    id: "show",
                    name: "显示选中",
                    enableClass: "btn-success"
                }
            ],
            keyword: "",
            tableConfig: { checkbox: true },
            tableColumns: [
                {
                    title: '名称',
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    sortable:true
                },
                {
                    title: '性别',
                    field: 'xb',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                }
            ],
            tableAjaxOptions: {
                url: "./table_data/table_data1.json",
                type: "get"
            }
        },
        mounted: function () {
            this.doSearch()
        },
        methods: {
            computAjaxOptions: function () {
                this.tableAjaxOptions = {
                    url: "./table_data/table_data1.json" + "?keyword=" + this.keyword,
                    data: {
                        key: this.filter.key
                    }
                }
            },
            //执行查询
            doSearch: function () {
                this.computAjaxOptions();
            },
            //按钮方法
            executeCommand: function (command) {
                var func = "command" + command.substr(0, 1).toUpperCase() + command.substr(1);
                var checkList = this.$refs.table.checkList;
                if (this[func]) {
                    this[func](checkList);
                }
            },
            commandAdd: function () {
                alert.alert("你点了添加按钮")
            },
            commandShow: function (checkList) {
                var names = checkList.map(function (item) {
                    return item.name
                }).join(",");
                if (names.length == 1) {
                    console.log(names);
                } else {
                    alert.alert("请选择一项你需要查看的")
                }
            },
            tableSelectChange: function () {

            },
            pagerDatachange: function () {

            },
            sortRow: function () {
                console.log(111)
            }
        },
        computed: {
        }
    });
    var tableVm2 = new Vue({
        el: "#table2",
        data: {
            type: "1",
            tableColumns: [
                {
                    title: '普通列',
                    field: 'column1',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '判断列',
                    field: 'column2',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<span>\
                        <span v-if="row.column2==1">一</span>\
                        <span v-if="row.column2==2">二</span>\
                    </span>'
                },
                {
                    title: '域列',
                    field: 'column3',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    //component: tableHelper.getDomainDisplayComponent("column3", "gender")
                },
                {
                    title: '链接列',
                    field: 'column4',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<a target="_blank" :href="\'http://cn.bing.com/?q=\'+row.column4">bing {{row.column4}}</a>',
                },
                {
                    title: '按钮列',
                    field: 'column5',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: {
                        template: '<span>\
                        <a target="_blank" @click="itemClick" href="javascript:;">弹个框</a>\
                        |\
                        <a target="_blank" @click="getType" href="javascript:;">看当前的数据源</a>\
                        </span>',
                        methods: {
                            itemClick: function () {
                                alert.alert("123")
                            },
                            getType: function () {
                                alert.alert(tableVm2.type);
                            }
                        }
                    },
                },
                {
                    title: '自定义列',
                    field: 'column6',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: {
                        template: '<span>\
                        <input v-model="row.column6"><input type="button" @click="save" value="保存">\
                        </span>',
                        methods: {
                            save: function () {
                                alert.alert("column6 保存的值为" + this.row.column6)
                            }
                        }
                    },
                }
            ],
            tableAjaxOptions: {
                url: "./table_data/table_data2_1.json",
                type: "get"
            }

        },
        watch: {
            "type": function (newVal) {
                this.tableAjaxOptions = {
                    url: "./table_data/table_data2_" + this.type + ".json"
                }
            }
        },
        mounted: function () {
        },
        methods: {
        },
        computed: {
        }
    });

    // var tableVm4 = new Vue({
    //     el: "#table4",
    //     data: {
    //         tableColumns: [
    //             {
    //                 title: '名称',
    //                 field: 'name',
    //                 align: 'center',
    //                 valign: 'middle',
    //                 visible: true
    //             },
    //             {
    //                 title: '性别',
    //                 field: 'xb',
    //                 align: 'center',
    //                 valign: 'middle',
    //                 visible: true,
    //                 sortable: true
    //             }
    //         ],
    //         tableRows: [
    //             { name: "自己写1", xb: "1男" },
    //             { name: "自己写2", xb: "2男" },
    //             { name: "自己写3", xb: "3男" },
    //         ]
    //     },
    //     methods: {
    //         changeData: function () {
    //             var self = this;
    //             $.getJSON("./table_data/table_data4.json", function (rows) {
    //                 self.tableRows = rows;
    //             })
    //         },
    //         tableSelectChange: function () {
    //             console.log(this.$refs.table.checkList)
    //         },
    //         sortRow: function () {
    //             console.log(111)
    //         }
    //     }
    // });

    // var tableVm5 = new Vue({
    //     el: "#table5",
    //     data: {
    //         tableColumns: [
    //             {
    //                 title: '名称',
    //                 field: 'name',
    //                 align: 'center',
    //                 valign: 'middle',
    //                 visible: '<a href="./"></a>',
    //                 editComponent: '<input v-model="row.name"/>'
    //             },
    //             {
    //                 title: '性别',
    //                 field: 'xb',
    //                 align: 'center',
    //                 valign: 'middle',
    //                 visible: true,
    //                 editComponent: '<select v-model="row.xb"><option>男</option><option>女</option></select>'
    //             }
    //         ],
    //         tableRows: [
    //             { name: "自己写1", xb: "男" },
    //             { name: "自己写2", xb: "男" },
    //             { name: "自己写3", xb: "男" },
    //             { name: "自己写3", xb: "男" },
    //             { name: "自己写3", xb: "男" },
    //         ]
    //     }
    // });

    // var tableVm6 = new Vue({
    //     el: "#table6",
    //     data: {
    //         tableColumns: [
    //             {
    //                 title: '名称',
    //                 field: 'name',
    //                 align: 'center',
    //                 valign: 'middle',
    //                 visible: true,
    //                 sortable: true
    //             },
    //             {
    //                 title: '性别',
    //                 field: 'xb',
    //                 align: 'center',
    //                 valign: 'middle',
    //                 visible: true,
    //             }
    //         ],
    //         tableRows: [
    //             { name: "自己写1", xb: "男" },
    //             { name: "自己写2", xb: "男" },
    //             { name: "自己写3", xb: "男" },
    //         ]
    //     }
    // });
});