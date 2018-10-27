<template>
  <div>
    <li>
      {{title}}
      <button v-on:click="$emit('remove')">remove</button>
    </li>
  </div>
</template>

<script>
export default {
  name: 'my_text_remove',
  props: ['title']
}
</script>

<style scoped>

</style>
