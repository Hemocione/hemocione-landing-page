<template>
    <Vue3Marquee :direction="direction" :duration="duration">
        <div v-once v-for="(item, index) in items" :key="index" class="item" :class="createItemClasses(item)">
            <img v-if="item.kind === 'image'" class="image-showcase" :src="item.src" alt="blablabla">
            <template v-else>
                <p>{{ item.text }}</p>
                <div class="author">
                    <img :src="item.authorSrc" alt="blablabla">
                    <div>
                        <p>{{ item.authorName }}</p>
                        <span>{{ item.eventName }}</span>
                    </div>
                </div>
            </template>
        </div>
    </Vue3Marquee>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Vue3Marquee } from 'vue3-marquee'

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

const COLORS_CLASSES = ['light-blue', 'blue', 'yellow', 'red']

const props = defineProps<{
    direction?: 'normal' | 'reverse'
    items: Item[]
    duration?: number
}>()

const currentFeedbackIndex = ref(0)

function createItemClasses(item: Item) {
    const color = COLORS_CLASSES[currentFeedbackIndex.value % COLORS_CLASSES.length]

    if(item.kind === 'feedback') currentFeedbackIndex.value++

    return {
        small: item.kind === 'image' && item.size === 'small',
        large: item.kind === 'image' && item.size === 'large',
        'on-bottom': props.direction !== 'reverse',
        [`feedback ${color}`]: item.kind === 'feedback',
    }
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
    flex-direction: column;
}

.item > * {
    height: fit-content;
}

.item p {
    line-height: 1.4rem;
}

.item.on-bottom {
    align-self: flex-end;
}

.image-showcase {
    min-width: var(--height);
    height: var(--height);
    object-fit: cover;
    border-radius: 1rem;
}

.feedback {
    padding: 1.5rem;
    border-radius: 1rem;
    width: 400px;
}

.feedback.light-blue {
    color: #25282B;
    background-color: var(--hemo-color-midsummers_dream);
}

.feedback.blue {
    color: #f2f2f2;
    background-color: var(--hemo-color-cornflower_blue);
}

.feedback.red {
    color: white;
    background-color: var(--hemo-color-primary);
}

.feedback.yellow {
    color: #25282B;
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

.author p {
    margin: 0;
    font-size: 0.875rem;
}

.author span {
    font-size: 0.75rem;
}
</style>
