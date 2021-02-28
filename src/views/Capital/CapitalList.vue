<template lang="pug">
  div
    base-header.pb-6
      .row.align-items-center.py-4
        .col-lg-6.col-7
          h6.h2.text-white.d-inline-block.mb-0 投资机构
          nav.d-none.d-md-inline-block.ml-md-4(aria-label='breadcrumb')
            route-bread-crumb
        .col-lg-6.col-5.text-right
          base-button(size='sm' type='neutral' @click="create") 创建投资机构
          //- base-button(size='sm' type='neutral') 筛选
    .container-fluid.mt--6
      .row
        .col
          .card
            //- .border-0.card-header
              h3.mb-0 投资机构
            el-table.table-responsive.table-flush(header-row-class-name='thead-light' :data='items')
              el-table-column(label='名称' prop='name' sortable)
              el-table-column(label='主要LP' prop='majorLp' sortable)
              el-table-column(label='投资特点' prop='features' sortable)
              el-table-column(min-width='180px')
                template(v-slot='{ row }')
                  el-dropdown.dropdown(trigger='click')
                    span.btn.btn-sm.btn-icon-only.text-light
                      i.fas.fa-ellipsis-v.mt-2
                    el-dropdown-menu.dropdown-menu.dropdown-menu-arrow.show(slot='dropdown')
                      a.dropdown-item(href='#') 编辑
            .card-footer.py-4.d-flex.justify-content-end
              base-pagination(v-model='currentPage' :total='10')

</template>
<script>
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "element-ui";
export default {
  name: "light-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
  },
  data() {
    return {
      items: [],
      currentPage: 1,
    };
  },
  methods: {
    create() {
      this.$router.push("/capital/add");
    },
  },
};
</script>
