<script>
import { ref } from 'vue'

export default {
  setup() {
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
      return items.value.filter((item) => item.list == list)
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

<template>
  <!-- item list -->
  <div class="item-zone" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
    <div><h3>items</h3></div>

    <div
      v-for="item in getList(1)"
      :key="item.id"
      class="drag-el"
      draggable="true"
      @dragstart="startDrag($event, item)"
    >
      {{ item.title }}
    </div>
  </div>

  <!-- destination -->
  <div class="drop-zone" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
    <div><h3>Rucksack</h3></div>
    <div
      v-for="item in getList(2)"
      :key="item.id"
      class="drag-el"
      draggable="false"
      @dragstart="startDrag($event, item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style>
#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-smoothing: grayscale;
  text-align: center;
  color: beige;
}

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

.drag-el {
  background-color: aquamarine;
  color: rgb(144, 92, 92);
  width: 100px;
  height: 50px;
  margin: 5px;
}
</style>
