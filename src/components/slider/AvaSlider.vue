<template>
  <div class="ava-slider">
    <Carousel :autoplay="6000" :wrap-around="true"  >
      <Slide v-for="(survey, i) in surveyStore.surveys" :key="i">
        <div class="carousel__item">
          <SportBetBlock :survey="survey" @check="checkSurvey"/>
        </div>
      </Slide>
      <Slide :key="3">
        <div class="carousel__item">
          <TasksBlock/>
        </div>
      </Slide>
      <Slide :key="4">
        <div class="carousel__item">
          <AppsBlock/>
        </div>
      </Slide>
      <Slide :key="5">
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
import SportBetBlock from '@/components/slider/components/SportBetBlock.vue';
import { useSurvey } from '@/stores/survey';
import { onMounted } from 'vue';

const surveyStore = useSurvey();

const checkSurvey = async (survey_id: number, survey_point_id: number) => {
  await surveyStore.checkSurveyPoint(survey_id, survey_point_id);
  await surveyStore.getSurvey();
}

onMounted(() => {
  surveyStore.getSurvey();
})
</script>

<style lang="scss" scoped>
.ava-slider {
  margin-bottom: 20px;
}
</style>
