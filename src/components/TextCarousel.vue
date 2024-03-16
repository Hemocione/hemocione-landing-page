<template>
    <div class="text-container" :class="class">
        <Transition name="side-up" mode="out-in" appear>
            <span :key="texts[state.currentIndex]">{{ texts[state.currentIndex] }}</span>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, type PropType } from 'vue';

const props = defineProps({
    texts: {
        type: Array as PropType<string[]>,
        required: true
    },
    interval: {
        type: Number,
        default: 3000
    },
    class: {
        type: String,
        default: ''
    }
})

const state = reactive({
    currentIndex: 0,
    intervalId: 0
})

const changeText = () => {
    state.currentIndex = (state.currentIndex + 1) % props.texts.length;
}

onMounted(() => {
    state.intervalId = setInterval(changeText, props.interval);
})

onUnmounted(() => {
    clearInterval(state.intervalId);
})
</script>

<style scoped>
.side-up-enter-from {
    opacity: 0;
    transform: translateY(-100%);
}

.side-up-leave-to {
    opacity: 0;
    transform: translateY(100%);
}

.side-up-enter-active,
.side-up-leave-active {
    transition: all 0.3s ease;
}

span {
    display: block;
}

.text-container {
    position: relative;
    overflow: hidden;
    padding: 0.5rem 0;
}
</style>
