<template>
    <Teleport to="body">
      <el-dialog v-model="open" width="500px" title="My Profile" @close="emit('onCancel')">
        <div class="list" v-for="({label, value}, index) in list" v-bind:key="index">
            <label>{{ label }}:</label>
            <span>{{ value }}</span>
        </div>
      </el-dialog>
    </Teleport>
</template>
  
<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";

  const props = defineProps<{
    open: boolean;
  }>();
  
  const emit = defineEmits(["onCancel", "update:open"])
  const user: any  = useUserStore();
  const {name, phone_number, email, role} = user.userInfo.data

  const list = computed(() => [
    {
        label: 'Name',
        value: name
    },
    {
        label: 'Email',
        value: email
    },
    {
        label: 'Phone number',
        value: phone_number
    },
    {
        label: 'Role',
        value: role
    }
  ])

  const open = computed({
    get() {
      return props.open;
    },
    set(value) {
      emit("update:open", value);
    },
  });
</script>
  
<style scoped>
    .list {
        display: flex;
        gap: 30px;
        margin-bottom: 20px;
    }

    .list label {
        font-weight: 600;
        width: 105px;
    }
</style>