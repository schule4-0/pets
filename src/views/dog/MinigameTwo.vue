<template>
  <!-- item list -->
  <div class="item-zone">
    <div><h3>items</h3></div>

    <!-- Use the Item component for each item -->
    <Item
      v-for="item in getList(1)"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :correct="item.correct"
      :list="item.list"
    />
  </div>

  <!-- destination -->
  <div class="drop-zone" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
    <div><h3>Rucksack</h3></div>
    <div class="drag-el" draggable="false">
      <!-- Render items for the second list -->
      <Item
        v-for="item in getList(2)"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :correct="item.correct"
        :list="item.list"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Item from '../../components/DragItem.vue'

export default {
  components: {
    Item // Register the Item component
  },
  setup() {
    // item list
    const items = ref([
      { id: 0, title: 'Leine', correct: true, list: 1 },
      { id: 1, title: 'Mülltüte', correct: true, list: 1 },
      { id: 2, title: 'Leckerli', correct: true, list: 1 },
      { id: 3, title: 'Schrank', correct: false, list: 1 },
      { id: 4, title: 'Schulbücher', correct: false, list: 1 },
      { id: 5, title: 'Stift', correct: false, list: 1 }
    ])

    // get the items for a specific list
    const getList = (list) => {
      return items.value.filter((item) => item.list === list)
    }

    // start event handler for drag
    const startDrag = (event, item) => {
      // pass the item id to the dataTransfer object
      event.dataTransfer.setData('itemID', item.id)
    }

    // drop event handler
    const onDrop = (event, list) => {
      const itemID = event.dataTransfer.getData('itemID')
      const droppedItem = items.value.find((item) => item.id == itemID)
      console.log('droppedItem: ', droppedItem)
      console.log('list: ', list)

      if (droppedItem.correct) {
        // logic for correct item
        droppedItem.list = list
        console.log('richtiges Item')
      } else {
        // logic for wrong item
        console.log('falsches Item')
      }
    }

    return {
      getList,
      onDrop,
      startDrag
    }
  }
}
</script>

<style>
.drop-zone {
  width: 250px;
  height: 250px;
  margin: 50px auto;
  border: 0.3cm dashed black;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>
