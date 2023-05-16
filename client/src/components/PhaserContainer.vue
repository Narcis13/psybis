<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { Game } from 'phaser'

let gameInstance: Game | null = null
const containerId = 'game-container'
const game = await import('@/game/game')

onMounted(() => {
  gameInstance = game.launch(containerId)
})

onUnmounted(() => {
  gameInstance?.destroy(false)
})
</script>

<template>
  <div>
  <div class="q-pa-md q-gutter-sm">
    <q-banner class="bg-primary text-white">
      Test psihologic
      <template v-slot:action>
        <q-btn flat color="white" label="Instructiuni" />
        <q-btn flat color="white" label="Solicita ajutor!" />
      </template>
    </q-banner>


  </div>
  <div :id="containerId" />
</div>
</template>
