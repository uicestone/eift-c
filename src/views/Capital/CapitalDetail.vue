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
                  template(#header)
                    .row
                      .col-md-6
                        h3.mb-0 团队
                      .col-md-6.d-flex.justify-content-end
                        base-button.btn-sm(type="primary" icon outline @click="addTeam")
                          span.btn-inner--icon
                            i.ni.ni-fat-add
                  .row(v-for="(team,i) in item.teams" :key="i")
                    .col-md-6
                      base-input(placeholder='联系人' v-model="team.name")
                    .col-md-6
                      base-input(placeholder='联系方式' v-model="team.contacts")
                .card
                  .card-header
                    h3.mb-0 备注
                  .card-body
                    form
                      html-editor(v-model="item.remarks")
            .col-lg-6
              .card-wrapper
                card
                  h3.mb-0(slot='header') 投资特点
                  tags-input(v-model='item.features' placeholder='新增特点')
                card
                  template(#header)
                    .row
                      .col-md-6
                        h3.mb-0 近期项目
                      .col-md-6.d-flex.justify-content-end
                        base-button.btn-sm(type="primary" icon outline @click="addRecentInvestment")
                          span.btn-inner--icon
                            i.ni.ni-fat-add
                  form
                    .row
                      .col-md-12(v-for="(investment,i) in item.recentInvestments" :key="i")
                        base-input(placeholder='项目名称' v-model="item.recentInvestments[i]")
                card
                  h3.mb-0(slot='header') 相关文件
                  drop-file-upload(v-model='item.files' multiple)
            .col-lg-12.row.justify-content-end
              base-button.btn-icon-only.btn-fixed-fab(round type="primary" native-type="submit")
                span.btn-inner--icon
                  i.fas.fa-save
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Select, Option } from "element-ui";
// @ts-ignore
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import HtmlEditor from "@/components/Inputs/HtmlEditor.vue";
import TagsInput from "@/components/Inputs/TagsInput.vue";
import { CapitalResource } from "@/resources";
import { Capital } from "@/resources/interfaces";
import DropFileUpload from "@/components/Inputs/DropFileUpload.vue";

@Component({
  components: {
    HtmlEditor,
    TagsInput,
    DropFileUpload,
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,
  },
})
export default class CapitalDetail extends Vue {
  item: Capital = {
    features: [],
    majorLp: "",
    teams: [{ name: "", contacts: "" }],
    recentInvestments: [],
  };

  addTeam() {
    this.item.teams.push({ name: "", contacts: "" });
  }

  addRecentInvestment() {
    this.item.recentInvestments.push("");
  }

  async save() {
    this.item.recentInvestments = this.item.recentInvestments.filter((i) => i);
    this.item.teams = this.item.teams.filter((t) => t.name);
    this.item = await CapitalResource.save(this.item);
    this.$notify({ title: "", message: "投资机构保存成功", type: "success" });
    this.$router.replace("/capital/" + this.item.id);
  }

  async created() {
    const id = this.$route.params.id;
    if (id !== "add") {
      this.item = await CapitalResource.get({ id });
      if (!this.item.teams.length) {
        this.item.teams.push({ name: "", contacts: "" });
      }
      if (!this.item.recentInvestments.length) {
        this.item.recentInvestments.push("");
      }
    }
  }
}
</script>
