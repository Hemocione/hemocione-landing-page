<template>
    <div class="iframe-container">
        <Transition name="fade">
            <div v-if="state.isLoading" class="iframe-loader">
                <img :src="logo.src" alt="Gota de sangue com um sorriso">
                <span>Carregando...</span>
            </div>
        </Transition>
        <iframe
            :src="url"
            :title="title"
            width="100%"
            height="100%"
            frameborder="0"
            @load="onLoad"
        />
    </div>
</template>

<script lang="ts" setup>
import { reactive  } from 'vue';
import logo from '../assets/logo.svg';

defineProps({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const state = reactive({
    isLoading: true,
})

function onLoad() {
    state.isLoading = false;
}
</script>

<style>
html {
    overflow: hidden;
}
</style>

<style scoped>
.iframe-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.iframe-loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--hemo-color-secondary);
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
}

.iframe-loader img {
    width: 6.25rem;
    height: 6.25rem;
    animation: zoom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

@keyframes zoom {
    from {
        transform: scale(0.5);
    }
    to {
        transform: scale(1);
    }
}
</style>