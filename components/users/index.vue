<template>
    <h1>USERS</h1>
    <el-button type="primary" size="large" @click="handleCount">count: {{ count }}</el-button>
</template>

<script setup lang="ts">
defineProps({
    count: Number
})

const emit = defineEmits(["onIncrease"])

const handleCount = () => {
    emit("onIncrease")
}

</script>

<style>
button{
    margin-bottom: 20px;
}
</style>