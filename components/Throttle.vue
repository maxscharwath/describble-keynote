<template>
  <div class="flex flex-col gap-4">
    <button @click="trigger" class="p-2 bg-blue-500 text-white rounded active:bg-blue-600">
      Trigger action
    </button>

    <div class="flex flex-col gap-4">
      <div class="bg-yellow-300 h-10 p-1 rounded ring-4 ring-yellow-500">
        <div class="relative w-full h-full overflow-hidden rounded">
          <div
              v-for="time in triggerTimes"
              :key="'trigger-' + time"
              class="absolute w-2 h-full bg-yellow-500 rounded"
              :style="{ left: calculateLeft(time) + '%' }"
          />
        </div>
      </div>
      <div class="bg-green-300 h-10 p-1 rounded ring-4 ring-green-500">
        <div class="relative w-full h-full overflow-hidden rounded">
          <div
              v-for="time in executeTimes"
              :key="'execute-' + time"
              class="absolute w-2 h-full bg-green-500 rounded"
              :style="{ left: calculateLeft(time) + '%' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { throttle } from '../utils';

const triggerTimes = ref<number[]>([]);
const executeTimes = ref<number[]>([]);

const maxTimeDiff = 15 * 1000;  // 10 seconds

const logEvent = (type: 'trigger' | 'execute') => {
  const now = Date.now();

  while (triggerTimes.value[0] && now - triggerTimes.value[0] > maxTimeDiff) {
    triggerTimes.value.shift();
  }
  while (executeTimes.value[0] && now - executeTimes.value[0] > maxTimeDiff) {
    executeTimes.value.shift();
  }

  if (type === 'trigger') {
    triggerTimes.value.push(now);
  } else {
    executeTimes.value.push(now);
  }
};

const action = throttle(() => {
  logEvent("execute");
}, 2000);

const trigger = () => {
  logEvent("trigger");
  action();
};

const earliestTime = computed(() => {
  if (triggerTimes.value.length === 0 && executeTimes.value.length === 0) return Date.now();
  return Math.min(
      ...triggerTimes.value,
      ...executeTimes.value
  );
});

const calculateLeft = (time: number) => {
  return (time - earliestTime.value) / maxTimeDiff * 100; // Convert to percentage of timeline-container width
};
</script>
