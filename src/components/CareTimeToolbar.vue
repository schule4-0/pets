<template>
  <div class="toolbar">
    <div
      v-for="tool in selectableTools"
      :key="tool.state"
      class="tool-item"
      :class="{
        selected: toolStore.selectedTool === tool.toolName,
        recommended:
          tool.state === currentState &&
          toolStore.selectedTool !== tool.toolName &&
          !selectedTools.includes(tool.toolName)
      }"
      @click="selectTool(tool.toolName)"
    >
      <img :src="tool.icon" :alt="tool.alt" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useCareTimeToolStore } from '@/stores/careTimeToolStore'
import placeholderImg from '@/assets/logo.svg'
import type { CareTimeState, CareTimeTool } from '@/views/dog/MinigameCareTime.vue'
import { useSound } from '@/composables/sound'
import clickSound from '@/assets/audio/soundEffects/click.mp3'

const toolStore = useCareTimeToolStore()
const sound = useSound()

defineProps<{
  currentState: CareTimeState
}>()

interface SelectableTools {
  state: CareTimeState
  toolName: CareTimeTool
  icon: string
  alt: string
}

const selectableTools: SelectableTools[] = [
  { state: 'shampooing', toolName: 'shampoo', icon: placeholderImg, alt: 'Shampoo' },
  { state: 'showering', toolName: 'shower', icon: placeholderImg, alt: 'Shower' },
  { state: 'drying', toolName: 'hairDryer', icon: placeholderImg, alt: 'HairDryer' }
]

const selectedTools = ref<CareTimeTool[]>([])

function selectTool(toolName: CareTimeTool) {
  sound.play(clickSound)
  toolStore.setTool(toolName)
  if (!selectedTools.value.includes(toolName)) {
    selectedTools.value.push(toolName)
  }
}

// Watch for changes in toolStore.selectedTool and add it to selectedTools if not already present
watch(
  () => toolStore.selectedTool,
  (newTool) => {
    if (!selectedTools.value.includes(newTool)) {
      selectedTools.value.push(newTool)
    }
  }
)
</script>

<style lang="scss" scoped>
.toolbar {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  background-color: #f8f9fa;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 10px;
  width: fit-content;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition:
    transform 0.2s,
    border 0.2s;
  padding: 0.5rem;
  border: 2px solid transparent;
  border-radius: 50%;
  margin: 0 0.5rem;
}

.tool-item:hover {
  transform: scale(1.1);
}

.tool-item.selected {
  border-color: #007bff;
}

.tool-item img {
  width: 40px;
  height: 40px;
}

/* Add pulsing animation for the recommended tool */
.tool-item.recommended {
  animation: pulse 1.5s infinite;
  border-color: #ff9800;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
