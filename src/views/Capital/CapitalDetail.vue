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
      .row
        .col-lg-6
          .card-wrapper
            card
              h3.mb-0(slot='header') 基本信息
              form
                .row
                  .col-md-12
                    base-input(placeholder='名称')
                  .col-md-12
                    base-input(placeholder='主要LP')
            card
              h3.mb-0(slot='header') 团队
              form
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
                  html-editor
        .col-lg-6
          .card-wrapper
            card
              // Card Header
              h3.mb-0(slot='header') 投资特点
              // Card Body
              tags-input.test(v-model='inputs.tags' placeholder='新增特点')
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
              dropzone-file-upload(v-model='inputs.fileMultiple' multiple)
        .col-lg-12.row.justify-content-end
          base-button(type="primary" native-type="submit") 保存
</template>

<script>
import { Select, Option } from "element-ui";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import HtmlEditor from "@/components/Inputs/HtmlEditor";
import TagsInput from "@/components/Inputs/TagsInput";
import DropzoneFileUpload from "@/components/Inputs/DropzoneFileUpload";
import BaseSlider from "@/components/BaseSlider";

export default {
  name: "form-components",
  components: {
    HtmlEditor,
    TagsInput,
    DropzoneFileUpload,
    BaseSlider,
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      selectOptions: [
        {
          label: "Alerts",
          value: "Alerts",
        },
        {
          label: "Badges",
          value: "Badges",
        },
        {
          label: "Buttons",
          value: "Buttons",
        },
        {
          label: "Cards",
          value: "Cards",
        },
        {
          label: "Forms",
          value: "Forms",
        },
        {
          label: "Modals",
          value: "Modals",
        },
      ],
      selects: {
        simple: "Badges",
        multiple: ["Alerts", "Buttons"],
      },
      dates: {
        simple: new Date(),
        range: "2019-04-19 to 2019-04-24",
      },
      inputs: {
        tags: ["智能化", "网联化"],
        fileSingle: [],
        fileMultiple: [],
      },
      switches: {
        off: false,
        primary: true,
        default: true,
        danger: true,
        warning: true,
        success: true,
        info: true,
      },
      sliders: {
        simple: 50,
        range: [200, 400],
      },
    };
  },
};
</script>
