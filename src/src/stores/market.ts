import { ref } from 'vue';
import { useAxios } from '@/composables/useAxios';
import { defineStore } from 'pinia';
import type { DealsDto, OrderDto, OrdersCountDto, OrderType } from '@/types/market';
import { useNotificationStore } from '@/stores/notification';
import type { ErrorResponse } from '@/types/user';

export const useMarketStore = defineStore('market', () => {

  const notificationStore = useNotificationStore();
  const ordersCountGolds = ref(0);
  const ordersCountGoldsStamp = ref(0);
  const adsResponse = ref<OrderDto>({
    data: [],
    pages_count: 0,
    current_page: 0
  });
  const dealsResponse = ref<DealsDto>({
    data: [],
    pages_count: 0,
    current_page: 0
  });
  const ordersResponse = ref<OrderDto>({
    data: [],
    pages_count: 0,
    current_page: 0
  });

  async function getStats() {
    try {
      const data = await useAxios<OrdersCountDto[]>('/market/ads/my/stats/')
      if (data) {
        ordersCountGolds.value = data.find((el) => el.subject === 'golds')?.count ?? 0;
        ordersCountGoldsStamp.value = data.find((el) => el.subject === 'golds_stamp')?.count ?? 0;
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function getAds( params: { per_page: number, page: number }, isUpdate = false) {
    try {
      const data  = await useAxios<OrderDto>('/market/ads/my/', { params })
      if (data) {
        adsResponse.value.pages_count = data.pages_count;
        adsResponse.value.current_page = data.current_page;
        if (isUpdate){
          adsResponse.value.data = data.data
        } else {
          adsResponse.value.data = adsResponse.value.data.concat(data.data)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function getDeals( params: { per_page: number, page: number }, isUpdate = false) {
    try {
      const  data  = await useAxios<DealsDto>('/market/deals/my/', { params })
      if (data) {
        dealsResponse.value.pages_count = data.pages_count;
        dealsResponse.value.current_page = data.current_page;
        if (isUpdate){
          dealsResponse.value.data = data.data
        } else {
          dealsResponse.value.data = dealsResponse.value.data.concat(data.data)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function getOrders(filter: boolean, params: { per_page: number, page: number }, isUpdate = false) {
    try {
      const data = await useAxios<OrderDto>('/market/ads/', {
        params: { ...params, order_by: filter ? 'price' : '-price' }
      })
      if (data) {
        ordersResponse.value.pages_count = data.pages_count;
        ordersResponse.value.current_page = data.current_page;
        if (isUpdate){
          ordersResponse.value.data = data.data
        } else {
          ordersResponse.value.data = ordersResponse.value.data.concat(data.data)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function createDeal(data: { ad_id?: number, volume?: number }) {
    try {
      const response = await useAxios<OrderDto>('/market/deals/', { method: 'POST', data })
      return response
    } catch (e) {
      const message = (e as unknown as ErrorResponse)?.response?.data?.detail;
      if(message) {
        notificationStore.push({
          message,
          type: 'danger'
        })
      }
      console.log(e)
    }
  }

  async function createOrder(data: { subject: string, volume: number, price: number }) {
    try {
      const res = await useAxios<OrderType>('/market/ads/my/', { method: 'POST', data })
      return res
    } catch (e) {
      const message = (e as unknown as ErrorResponse)?.response?.data?.detail;
      if(message) {
        notificationStore.push({
          message,
          type: 'danger'
        })
      }
      console.log(e)
    }
  }
  async function deleteOrder(id?: number) {
    try {
      await useAxios<OrderDto>(`/market/ads/my/${id}/`, { method: 'DELETE' })
    } catch (e) {
      const message = (e as unknown as ErrorResponse)?.response?.data?.detail;
      if(message) {
        notificationStore.push({
          message,
          type: 'danger'
        })
      }
      console.log(e)
    }
  }

  return {
    getStats,
    getAds,
    getDeals,
    getOrders,
    createDeal,
    createOrder,
    deleteOrder,
    ordersCountGolds,
    ordersCountGoldsStamp,
    ordersResponse,
    adsResponse,
    dealsResponse
  }
})
