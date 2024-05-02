<template>
  <div class="drag-el" draggable="true" @dragstart="startDrag">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    correct: Boolean,
    list: Number
  },
  methods: {
    startDrag(event) {
      event.dataTransfer.setData('itemID', this.id)
    }
  }
}
</script>

<style>
.drag-el {
  background-color: aquamarine;
  color: rgb(144, 92, 92);
  width: 100px;
  height: 50px;
  margin: 5px;
}
</style>
