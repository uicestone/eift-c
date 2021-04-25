<template lang="pug">
  div
    base-header.pb-6
      .row.align-items-center.py-4
        .col-lg-6.col-7
          h6.h2.text-white.d-inline-block.mb-0 被投企业
        .col-lg-6.col-5.text-right
          base-button(size='sm' type='neutral' @click="showCreate") 创建被投企业
          //- base-button(size='sm' type='neutral') 筛选
    .container-fluid.mt--6
      .row
        .col
          .card
            el-table.table-responsive.table-flush(header-row-class-name='thead-light' :data='items' @row-click="showDetail")
              el-table-column(label='名称' prop='name' sortable)
              el-table-column(label='联系人' prop='contacts' sortable)
                template(#default="{row:{contacts}}")
                  span {{contacts}}
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
import { Business } from "@/resources/interfaces";
import { BusinessResource } from "@/resources";

@Component({
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
  },
})
export default class BusinessList extends List<Business> {
  name = "business";
  resource = BusinessResource;
}
</script>
