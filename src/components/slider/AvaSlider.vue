<template>
  <div class="ava-slider">
    <Carousel :autoplay="6000"  :wrap-around="true"  >
      <Slide :key="1">
        <div class="carousel__item">
          <TasksBlock/>
        </div>
      </Slide>
      <Slide :key="2">
        <div class="carousel__item">
          <AppsBlock/>
        </div>
      </Slide>
      <Slide :key="3">
        <div class="carousel__item">
          <ListingBlock/>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import TasksBlock from '@/components/slider/components/TasksBlock.vue';
import ListingBlock from '@/components/slider/components/ListingBlock.vue';
import AppsBlock from '@/components/slider/components/AppsBlock.vue';

</script>

<style lang="scss" scoped>
.ava-slider {
  margin-bottom: 20px;
}
</style>
