<template>
    <el-row :gutter="15">
        <el-col :span="5">
            <el-card class="box-card">
                <template #header>
                <div class="card-header">
                    <span>欢迎来到XDJO</span>
                    <el-button class="button" text>Operation button</el-button>
                </div>
                </template>
            </el-card>
            <AnnouncementList></AnnouncementList>
        </el-col>
    </el-row>
  
</template>
<script setup>
import AnnouncementList from '../components/HomePage/AnnouncementList.vue'
</script>

<style>

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 20px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 1280px;
}
</style>