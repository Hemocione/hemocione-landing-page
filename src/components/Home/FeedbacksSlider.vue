<template>
    <Vue3Marquee clone :direction="direction" :duration="duration">
        <div v-for="(item, index) in items" :key="index" class="item" :class="createItemClasses(item)">
            <img v-if="item.kind === 'image'" class="image-showcase" :src="item.src" alt="blablabla">
            <div v-else class="feedback" :class="createFeedbackClasses()">
                <p>{{ item.text }}</p>
                <div class="author">
                    <img :src="item.authorSrc" alt="blablabla">
                    <div>
                        <p>{{ item.authorName }}</p>
                        <span>{{ item.eventName }}</span>
                    </div>
                </div>
            </div>
        </div>
    </Vue3Marquee>
</template>

<script lang="ts" setup>
import { Vue3Marquee } from 'vue3-marquee'
import { reactive } from 'vue'

type ImageItem = {
    kind: 'image';
    src: string;
};

type FeedbackItem = {
    kind: 'feedback';
    text: string;
    eventName: string;
    authorName: string;
    authorSrc: string;
};

export type Item = {
    size: 'small' | 'default' | 'large'
} & (ImageItem | FeedbackItem);

const COLORS_CLASSES = ['blue', 'yellow', 'red']

const props = defineProps<{
    direction?: 'normal' | 'reverse'
    items: Item[]
    duration?: number
}>()

const state = reactive({
    currentFeedbackIndex: 0,
})

function createItemClasses(item: Item) {
    return {
        small: item.kind === 'image' && item.size === 'small',
        large: item.kind === 'image' && item.size === 'large',
        'on-bottom': props.direction !== 'reverse',
    }
}

function createFeedbackClasses() {
    const color = COLORS_CLASSES[state.currentFeedbackIndex % COLORS_CLASSES.length]
    state.currentFeedbackIndex++

    return color
}
</script>

<style scoped>
.item.small {
    --height: 160px;
}

.item.large {
    --height: 320px;
}

.item.default {
    --height: 240px;
}

.item {
    height: var(--height);
    margin-left: 2rem;
    display: flex;
    align-self: flex-start;
}

.item > * {
    height: fit-content;
}

.item.on-bottom,
.item.on-bottom > * {
    align-self: flex-end;
}

.image-showcase {
    min-width: 100%;
    height: 100%;
    object-fit: cover;
}

.feedback {
    padding: 1.5rem;
    border-radius: 1rem;
    width: 400px;
}

.feedback.blue {
    color: var(--hemo-color-text-primary);
    background-color: var(--hemo-color-cornflower_blue);
}

.feedback.red {
    color: var(--hemo-color-background);
    background-color: var(--hemo-color-primary);
}

.feedback.yellow {
    color: var(--hemo-color-text-secondary);
    background-color: var(--hemo-color-princess_ivory);
}

.feedback p {
    margin: 0 0 1.5rem;
}

.author {
    display: flex;
    align-items: center;
}

.author img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-right: 1rem;
}

.author div {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.author p {
    margin: 0;
    font-size: 0.875rem;
}

.author span {
    font-size: 0.75rem;
}
</style>
