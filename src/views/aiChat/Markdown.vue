<template>
  <div v-html="renderedContent"></div>
</template>

<script>
import MarkdownIt from "markdown-it";

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      renderedContent: "",
    };
  },
  mounted() {
    this.renderMarkdown();
  },
  watch: {
    content() {
      this.renderMarkdown();
    },
  },
  methods: {
    renderMarkdown() {
      const md = new MarkdownIt();
      this.renderedContent = md.render(this.content);
    },
  },
};
</script>

<style scoped>
/* 样式可以根据需要自行定义 */
</style>
