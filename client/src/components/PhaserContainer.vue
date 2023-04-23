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
      Unfortunately, the credit card did not go through, please try again.
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss" />
        <q-btn flat color="white" label="Update Credit Card" />
      </template>
    </q-banner>


  </div>
  <div :id="containerId" />
</div>
</template>
