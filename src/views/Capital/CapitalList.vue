<template lang="pug">
  div
    base-header.pb-6
      .row.align-items-center.py-4
        .col-lg-6.col-7
          h6.h2.text-white.d-inline-block.mb-0 投资机构
        .col-lg-6.col-5.text-right
          base-button(size='sm' type='neutral' @click="showCreate") 创建投资机构
          //- base-button(size='sm' type='neutral') 筛选
    .container-fluid.mt--6
      .row
        .col
          .card
            el-table.table-responsive.table-flush(header-row-class-name='thead-light' :data='items' @row-click="showDetail")
              el-table-column(label='名称' prop='name' sortable)
              el-table-column(label='主要LP' prop='majorLp' sortable)
              el-table-column(label='团队' prop='teams' sortable)
                template(#default="{row:{teams}}")
                  span {{teams.length}}
              el-table-column(label='投资特点' prop='features' sortable)
                template(#default="{row:{features}}")
                  base-button.btn-sm(v-for="feature in features" :key="feature" @click.stop) {{feature}}
            .card-footer.pt-2.pb-0.d-flex.justify-content-end
              base-pagination(v-model='currentPage' :perPage="perPage" :total='total')

</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "element-ui";
import List from "../Components/List";
import { Capital } from "@/resources/interfaces";
import { CapitalResource } from "@/resources";

@Component({
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
  },
})
export default class CapitalList extends List<Capital> {
  name = "capital";
  resource = CapitalResource;
}
</script>
