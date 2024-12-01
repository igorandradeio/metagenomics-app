<template>
  <li>
    <div>
      <strong>{{ item.name }}</strong>
      <span v-if="item.type === 'file'">({{ item.size }} bytes)</span>
    </div>
    <ul v-if="item.type === 'folder' && item.children.length > 0">
      <directory-item v-for="(child, index) in item.children" :key="index" :item="child" />
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
  },
}
</script>
