<template>
    <div><span class="progressLoader"></span></div>
</template>

<script>
export default {
    name: "LoadingSpinnerComponent",
};
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}

.progressLoader {
    width: 48px;
    height: 48px;
    border: 5px solid #4f46e5;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
