<template>
  <div>
    <svg
        :width="size"
        :height="size"
        @click="handleSvgClick"
        class="border border-4 text-slate-500 border-slate-500 rounded"
    >
      <path
          v-for="path in quadrantPaths"
          :key="path.id"
          :d="path.d"
          stroke="currentColor"
          :stroke-width="path.strokeWidth"
          fill="none"
      />
      <circle
          v-for="point in flatPoints"
          :key="`${point.x}-${point.y}`"
          :cx="point.x"
          :cy="point.y"
          r="3"
          fill="red"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Point {
  x: number;
  y: number;
}

interface Quadrant {
  x: number;
  y: number;
  size: number;
  points: Point[];
  children?: Quadrant[];
  depth?: number;
}

const size = 400;
const MAX_POINTS = 2;
const rootRef = ref<Quadrant>({
  x: 0,
  y: 0,
  size: size,
  points: [],
  depth: 0
});

function isPointInQuadrant(quadrant: Quadrant, point: Point): boolean {
  return (
      point.x >= quadrant.x &&
      point.y >= quadrant.y &&
      point.x < quadrant.x + quadrant.size &&
      point.y < quadrant.y + quadrant.size
  );
}

function subdivide(quadrant: Quadrant) {
  const half = quadrant.size / 2;
  const depth = (quadrant.depth || 0) + 1;
  quadrant.children = [
    { x: quadrant.x, y: quadrant.y, size: half, points: [], depth },
    { x: quadrant.x + half, y: quadrant.y, size: half, points: [], depth },
    { x: quadrant.x, y: quadrant.y + half, size: half, points: [], depth },
    { x: quadrant.x + half, y: quadrant.y + half, size: half, points: [], depth }
  ];
}

function insertPoint(quadrant: Quadrant, point: Point) {
  if (!isPointInQuadrant(quadrant, point)) return;

  if (quadrant.children) {
    for (const child of quadrant.children) {
      insertPoint(child, point);
    }
    return;
  }

  quadrant.points.push(point);

  if (quadrant.points.length > MAX_POINTS) {
    subdivide(quadrant);
    const pointsToReinsert = [...quadrant.points];
    quadrant.points = [];
    for (const p of pointsToReinsert) {
      insertPoint(quadrant, p);
    }
  }
}

const flatPoints = computed<Point[]>(() => {
  const points: Point[] = [];
  function collectPoints(quadrant: Quadrant) {
    points.push(...quadrant.points);
    if (quadrant.children) {
      for (const child of quadrant.children) {
        collectPoints(child);
      }
    }
  }
  collectPoints(rootRef.value);
  return points;
});

const quadrantPaths = computed(() => {
  const paths: { d: string; strokeWidth: number; id: string }[] = [];
  function traverse(quadrant: Quadrant) {
    const half = quadrant.size / 2;
    const depth = quadrant.depth || 0;
    const strokeWidth = 4 * (3 / 4) ** depth;

    if (quadrant.children) {
      paths.push({
        d: `M${quadrant.x + half} ${quadrant.y} V${quadrant.y + quadrant.size} M${quadrant.x} ${quadrant.y + half} H${quadrant.x + quadrant.size}`,
        strokeWidth,
        id: `${quadrant.x}-${quadrant.y}`
      });

      for (const child of quadrant.children) {
        traverse(child);
      }
    }
  }
  traverse(rootRef.value);
  return paths;
});

function handleSvgClick(event: MouseEvent) {
  const point = { x: event.offsetX, y: event.offsetY };
  insertPoint(rootRef.value, point);
}

onMounted(() => {
  for (let i = 0; i < 20; i++) {
    insertPoint(rootRef.value, {
      x: Math.random() * size,
      y: Math.random() * size
    });
  }
});
</script>
