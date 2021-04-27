<template lang="pug">
  .dropzone.mb-3(@drop.prevent="addDropFile", @dragover.prevent)
    .dz-default.dz-message
      button.dz-button(type='button') 把文件拖到这里上传
    .preview.preview-single(v-if='!multiple')
      .preview-cover
        img.preview-img
    ul.preview.preview-multiple.list-group.list-group-lg.list-group-flush(v-else)
      li.list-group-item.px-0(v-for="file in files" :key="file.name")
        .row.align-items-center
          .col-auto
            .avatar.bg-primary(@click="open(file)" style="font-size:2rem;cursor:pointer")
              i.far(:class="'fa-'+fileTypeIcon(file)")
          .col.ml--3
            h4.mb-1(@click="open(file)" style="cursor:pointer") {{file.name}}
            p.small.text-muted.mb-0 {{file.createdAt|date}}
          .col-auto
            button.btn.btn-danger.btn-sm(@click="removeFile(file)")
              i.fas.fa-trash
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { File as FileDoc } from "@/resources/interfaces";
import { http } from "@/resources";

@Component({
  model: {
    prop: "value",
    event: "change",
  },
})
export default class DropFileUpload extends Vue {
  @Prop({ type: Array })
  value!: (File | FileDoc)[];

  @Prop({ type: Boolean })
  multiple!: boolean;

  get files() {
    return this.value;
  }

  set files(files) {
    this.$emit("change", files);
  }

  fileTypeIcon(file: FileDoc) {
    const extension = file.name.match(/.*\.(.*?)$/)?.[1] || "";
    if (extension.match(/jpe?g|png|gif|bmp|tif/)) {
      return "file-image";
    }
    if (extension.match(/docx?/)) {
      return "file-word";
    }
    if (extension.match(/xlsx?/)) {
      return "file-excel";
    }
    if (extension.match(/pptx?/)) {
      return "file-powerpoint";
    }
    if (extension.match(/pdf?/)) {
      return "file-pdf";
    }
  }

  addDropFile(e: DragEvent) {
    if (!e.dataTransfer) return;
    Array.from(e.dataTransfer.files).forEach(async (file) => {
      const fileDoc = await this.uploadFile(file);
      this.files.push(fileDoc);
    });
    this.$notify({
      title: "文件已上传",
      message: "您还需要点击保存按钮将它保存到当前页面",
      type: "info",
    });
  }

  async uploadFile(file: Blob) {
    const formData = new FormData();
    formData.append("file", file);
    const fileDoc: FileDoc = (
      await http.post("file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
    return fileDoc;
  }

  removeFile(file: File | FileDoc) {
    this.files = this.files.filter((f) => f.name !== file.name);
    this.$notify({
      title: "文件还未删除",
      message: "您还需要点击保存按钮，撤销请退出或刷新当前页面",
      type: "info",
    });
  }

  open(file: FileDoc) {
    window.open(file.url);
  }
}
</script>
<style></style>
