<template>
  <div class="markdown-body" v-html="renderedContent"></div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
import { ref, onMounted, watch } from "vue";

const props = defineProps(["content"]);

const renderedContent = ref("");

const addEllipsisToTable = (html) => {
  console.info(html);
  const maxLength = 20;

  // 正则捕获 <td> 标签，可能带有 style 属性
  return html.replace(
    /<td([^>]*)>(.*?)<\/td>/gis,
    (match, attrPart, content) => {
      // 解码实体，避免 title 显示乱码
      const decodedContent = content
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      const plainText = decodedContent.replace(/<[^>]+>/g, ""); // 去掉 HTML 标签再判断长度

      // 判断是否超长
      if (plainText.length > maxLength) {
        // 提取已有 style
        const styleMatch = attrPart.match(/style="([^"]*)"/);
        let style = styleMatch ? styleMatch[1] : "";

        // 追加省略号相关样式
        style += style && !style.endsWith(";") ? ";" : "";

        // 构造新的 <td>
        return `<td style="${style}" title="${plainText}">${plainText.slice(
          0,
          maxLength
        )}...</td>`;
      }

      // 没超长就原样返回
      return match;
    }
  );
};

const renderMarkdown = () => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  });
  let rendered = md
    .render(props.content)
    .replaceAll("<table>", '<table class="chat-table">');
  renderedContent.value = addEllipsisToTable(rendered);
};

onMounted(() => {
  renderMarkdown();
});

watch(
  () => props.content,
  (value) => {
    if (value) {
      renderMarkdown();
    }
  }
);
</script>

<style lang="less">
/* 样式可以根据需要自行定义 */
.markdown-body {
  .chat-table {
    border-spacing: 0;
    border-collapse: collapse;
    display: block;
    width: max-content;
    max-width: 100%;
    overflow: auto;
    border: 1px solid #f0f0f0;
    margin-bottom: 16px;
    th,
    td {
      min-width: 180px;
      text-align: center;
      height: 40px;
      font-size: 14px;
      padding: 6px 13px;
      border: 1px solid #d0d7de;
    }
  }

  h1 {
    margin: 0.67em 0;
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid #d8dee4;
    color: #333;
    line-height: 1.5;
    &:first-child {
      margin-top: 0 !important;
    }
  }

  h2 {
    margin-top: 24px;
    margin-bottom: 16px;
    line-height: 1.2;
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 1.2em;
    border-bottom: 1px solid #d8dee4;
    color: #333;
  }

  hr {
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border-bottom: 1px solid #d8dee4;
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #d0d7de;
    border: 0;
  }

  p {
    margin-top: 0;
    margin-bottom: 16px;
  }

  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 6px;
    margin-bottom: 16px;
  }
}
</style>
