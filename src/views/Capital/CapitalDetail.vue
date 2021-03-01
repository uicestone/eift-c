<template lang="pug">
  div
    base-header.pb-6
      .row.align-items-center.py-4
        .col-lg-6.col-7
          h6.h2.text-white.d-inline-block.mb-0 {{ $route.name }}
          nav.d-none.d-md-inline-block.ml-md-4(aria-label='breadcrumb')
            route-breadcrumb
        .col-lg-6.col-5.text-right
          //- base-button(size='sm' type='neutral') New
          //- base-button(size='sm' type='neutral') Filters
    .container-fluid.mt--6
      validation-observer(v-slot="{ handleSubmit }" ref="formValidator")
        form(@submit.prevent="handleSubmit(save)")
          .row
            .col-lg-6
              .card-wrapper
                card
                  h3.mb-0(slot='header') 基本信息
                  .row
                    .col-md-12
                      base-input(placeholder='名称' v-model="item.name" name="名称" :rules="{required:true}")
                    .col-md-12
                      base-input(placeholder='主要LP' v-model="item.majorLp" name="主要LP" :rules="{required:true}")
                card
                  h3.mb-0(slot='header') 团队
                  .row
                    .col-md-12
                      base-input(placeholder='联系人')
                    .col-md-12
                      base-input(placeholder='联系方式')
                // Text editor
                .card
                  // Card header
                  .card-header
                    h3.mb-0 备注
                  // Card body
                  .card-body
                    form
                      html-editor(v-model="item.remarks")
            .col-lg-6
              .card-wrapper
                card
                  // Card Header
                  h3.mb-0(slot='header') 投资特点
                  // Card Body
                  tags-input.test(v-model='item.features' placeholder='新增特点')
                card
                  h3.mb-0(slot='header') 近期项目
                  form
                    .row
                      .col-md-12
                        base-input(placeholder='名称')
                      .col-md-12
                        base-input(placeholder='主要LP')
                card
                  // Card Header
                  h3.mb-0(slot='header') 相关文件
                  // Card Body
                  dropzone-file-upload(v-model='item.fileMultiple' multiple)
            .col-lg-12.row.justify-content-end
              base-button(type="primary" native-type="submit") 保存
</template>

<script lang="ts">
import { Select, Option } from "element-ui";
// @ts-ignore
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import HtmlEditor from "@/components/Inputs/HtmlEditor.vue";
import TagsInput from "@/components/Inputs/TagsInput.vue";
import DropzoneFileUpload from "@/components/Inputs/DropzoneFileUpload.vue";
import Component from "vue-class-component";
import Vue from "vue";
import { CapitalResource } from "@/resources";
import { Capital } from "@/resources/interfaces";

@Component({
  components: {
    HtmlEditor,
    TagsInput,
    DropzoneFileUpload,
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,
  },
})
export default class CapitalDetail extends Vue {
  item: Capital = {
    features: [],
    majorLp: "",
    teams: [],
    recentInvestments: [],
  };

  async save() {
    this.item = await CapitalResource.save(this.item);
    this.$notify({ title: "", message: "投资机构保存成功", type: "success" });
  }

  async created() {
    const id = this.$route.params.id;
    if (id !== "add") {
      this.item = await CapitalResource.get({ id });
    }
  }
}
</script>
