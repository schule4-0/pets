<template>
    <div class="game-container">
    <DropArea @droppedInArea="handleDropInArea" :image="cartoondogImg" width="30vw" height="30vw"/>

    <DraggableItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :type="item.type"
      :image="item.image"
      :initialX="item.initialX"
      :initialY="item.initialY"
    />

    <button @click="goToNextStage">Nächstes Minigame</button>
  </div>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue'
    import DraggableItem, { type DraggableItemType } from '@/components/DraggableItem.vue'
    import DropArea from '@/components/DropArea.vue'
    import { onMounted } from 'vue'
    import { useStageNavigator } from '@/composables/useNavigation'
    import boneImg from '@/assets/bone.png'
    import cartoondogImg from '@/assets/cartoondog1.png'
    import mascotMessages from '@/config/mascotMessages'
    import { useMascotStore } from '@/stores/useMascotStore'

    const { goToNextStage } = useStageNavigator()

    const mascot = useMascotStore()
    //TODO: dynamic loading of correct messages according to route
    const instructionMessage = mascotMessages.dog.stage3
    const generalMessages = mascotMessages.general.expressions

    onMounted(() => {
        mascot.showMascotItem()
        mascot.setMessage(instructionMessage.message1)
        mascot.showMessage()
    })

    const items = ref<DraggableItemType[]>([
        { id: 1, type: 'accepted', image: boneImg, initialX: 50, initialY: 80 },
    ])

    const removeItem = (id: number) => {
        items.value = items.value.filter((i) => i.id !== id)
    }

    const handleDropInArea = (item: {
        id: number
        isWithin: boolean
        type: 'accepted' | 'rejected'
    }) => {
        console.log('handleDropInArea', item)
        if (item.type === 'accepted') {
            removeItem(item.id)
            mascot.setMessage(generalMessages.rockyHappy)
        }
    }
</script>