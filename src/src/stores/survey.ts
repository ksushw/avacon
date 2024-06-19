import { useAxios } from '@/composables/useAxios'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ISurvey } from '@/types/survey';

export const useSurvey = defineStore('survey', () => {

    const surveys = ref<ISurvey[]>()

    async function getSurvey() {
        try {
            surveys.value = await useAxios<ISurvey[]>('/survey/')
        } catch (e) {
            console.log(e)
        }
    }

    async function checkSurveyPoint(survey_id: number, survey_point_id: number) {
        try {
            await useAxios<ISurvey[]>(`/survey/${survey_id}/${survey_point_id}/check/`, {
                method: 'POST'
            })
        } catch (e) {
            console.log(e)
        }
    }

    return {
        surveys,
        getSurvey,
        checkSurveyPoint
    }
})