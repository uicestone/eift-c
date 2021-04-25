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
                    .col-md-8
                      base-input(v-model="item.name" label="名称" name="名称" :rules="{required:true}")
                    .col-md-4
                      base-input(v-model="item.abbr" label="简称" name="简称" :rules="{required:true}")
                card
                  template(#header)
                    .row
                      .col-md-6
                        h3.mb-0 联系人
                      .col-md-6.d-flex.justify-content-end
                        base-button.btn-sm(type="primary" outline @click="addContact")
                          span.btn-inner--icon
                            i.ni.ni-fat-add
                  .row(v-for="(contact,i) in item.contacts" :key="i")
                    .col-md-6
                      base-input(placeholder="姓名" v-model="contact.name")
                    .col-md-5
                      base-input(placeholder="备注" v-model="contact.remarks")
                    .col-md-1.px-0.pt-2
                      base-button.btn-sm(type="primary" outline @click="removeContact(i)")
                        span.btn-inner--icon
                          i.ni.ni-fat-delete
                    .row.mx-0.px-0.col-md-12(v-for="(detail,index) in contact.contactDetails" :key="index")
                      .col-md-3
                        base-input
                          el-select(v-model="detail.type")
                            el-option(value="mobile" label="手机")
                            el-option(value="email" label="Email")
                            el-option(value="fixed" label="固定电话")
                      .col-md-8
                        base-input(placeholder="联系方式" v-model="detail.value")
                      .col-md-1.px-0.pt-2
                        base-button.btn-sm.btn-link(v-if="index" type="none" @click="removeContactDetail(contact, index)")
                          span.btn-inner--icon
                            i.ni.ni-fat-delete
                        base-button.btn-sm.btn-link(v-else type="none" @click="addContactDetail(contact)")
                          span.btn-inner--icon
                            i.ni.ni-fat-add
                .card
                  .card-header
                    h3.mb-0 备注
                  .card-body
                    form
                      html-editor(v-model="item.remarks")
            .col-lg-6
              .card-wrapper
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
import { BusinessResource } from "@/resources";
import { Business } from "@/resources/interfaces";
import DropFileUpload from "@/components/Inputs/DropFileUpload.vue";
import { Contact } from "@/resources/interfaces";

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
export default class BusinessDetail extends Vue {
  item: Business = {
    name: "",
    abbr: "",
    contacts: [],
    addresses: [],
    files: [],
    remarks: "",
  };

  addContact() {
    this.item.contacts.push(defaultContact());
  }

  removeContact(i: number) {
    this.item.contacts = this.item.contacts
      .slice(0, i)
      .concat(this.item.contacts.slice(i + 1));
  }

  addContactDetail(contact: Contact) {
    contact.contactDetails.push({ type: "mobile", scene: "", value: "" });
  }

  removeContactDetail(contact: Contact, i: number) {
    contact.contactDetails = contact.contactDetails
      .slice(0, i)
      .concat(contact.contactDetails.slice(i + 1));
  }
  async save() {
    this.item.contacts = this.item.contacts.filter((c) => c.name);

    this.item = await BusinessResource.save(this.item);
    this.$notify({ title: "", message: "被投企业保存成功", type: "success" });
    if (this.$route.params.id === "add") {
      this.$router.replace("/business/" + this.item.id);
    }
    if (!this.item.contacts.length) {
      this.item.contacts.push(defaultContact());
    }
  }

  async created() {
    const id = this.$route.params.id;
    if (id !== "add") {
      this.item = await BusinessResource.get({ id });
    }
    if (!this.item.contacts.length) {
      this.item.contacts.push(defaultContact());
    }
  }
}

const defaultContact = () =>
  ({
    name: "",
    contactDetails: [{ type: "mobile", scene: "", value: "" }],
  } as Contact);
</script>
