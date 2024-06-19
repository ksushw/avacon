<script setup lang="ts">
import AvaButton from '@/components/AvaButton.vue';
import AvaCard from '@/components/AvaCard.vue';
import ArrowCircleIcon from '@/components/icons/ArrowCircleIcon.vue';
import AvaLink from '@/components/AvaLink.vue';
import ListItem from '@/components/ListItem.vue';
import { computed, defineModel, ref } from 'vue';
import silverGoldIcon from '@/assets/images/icons/silver-gold.svg';
import goldIcon from '@/assets/images/icons/gold.svg';
import AvaSwitch from '@/components/AvaSwitch.vue';
import AvaHistoryTable from '@/components/AvaHistoryTable.vue';
import type { IListItem } from '@/types/props';
import router from '@/router';
import { useRootStore } from '@/stores/root';
import { useMarketStore } from '@/stores/market';
import moment from 'moment';
import ActiveOrderDrawer from '@/components/market/ActiveOrderDrawer.vue';
import { Popup } from 'vue-tg';
import type { OrderType } from '@/types/market';

const switchValue = defineModel({ default: 'sell' });

const root = useRootStore()
const marketStore = useMarketStore();

const visibleModal = ref(false);
const visiblePopup = ref(false);
const deletedId = ref<number>();
const currentOrder = ref<OrderType>();

const buttons = [
  {
    id: 'no',
    type: 'cancel',
    text: 'No'
  },
  {
    id: 'yes',
    text: 'Yes'
  }
];

async function handlePopupClose(id = 'yes') {
  visiblePopup.value = false
  visibleModal.value = false
  if (id === 'yes') {
    try {
      await marketStore.deleteOrder(deletedId.value)
      deletedId.value = undefined
      await marketStore.getAds({ per_page: 15, page: 1 }, true);
    } catch (e) {
      console.log(e)
    }
  }
}

const items = computed((): IListItem[] => [
  {
    firstName: `${root.user?.golds?.toLocaleString('en-EN') ?? 0} gr.`,
    infoText: `= ${(Number(root.user?.golds) * 800000)?.toLocaleString('en-EN') ?? 0} gold dust`,
    lastName: ' ',
    avatar: silverGoldIcon,
    points: 'Gold grams from dust',
    reward: `Act. orders:`
  },
  {
    firstName: `${root.user?.golds_stamp?.toLocaleString('en-EN') ?? 0} gr.`,
    lastName: ' ',
    avatar: goldIcon,
    points: 'Stamp DUBAI gold bars',
    reward: `Act. orders:`
  }]
)

const switchValues = ref([{
  title: 'Buy',
  value: 'buy'
},
  {
    title: 'Sell',
    value: 'sell'
  }])

const getStatus = (status: string) => {
  switch (status) {
    case 'created':
      return 'On sale'
    case 'executed':
      return 'Success'
    case 'closed':
      return 'Closed'
  }
}

const adsList = computed(() => marketStore.adsResponse?.data.map((el) => ({
  quantity: `${el.start_volume} gr.`,
  price:`${el.price} usdt`,
  date: moment(el.created_at).format('DD.MM.YY'),
  status: el.status,
  statusTitle: getStatus(el.status),
  icon: el.subject === 'golds_stamp' ? goldIcon : silverGoldIcon,
  id: el.id
})))

const dealsList = computed(() => marketStore.dealsResponse?.data.map((el) => ({
  quantity: `${el.ad.start_volume} gr.`,
  price:`${Number(el.ad.price ?? 0) * Number(el.volume ?? 0)} usdt`,
  date: moment(el.created_at).format('DD.MM.YY'),
  status: el.ad.status,
  statusTitle: getStatus(el.ad.status),
  icon: el.ad.subject === 'golds_stamp' ? goldIcon : silverGoldIcon,
  id: el.id
})))

const openInfo = (id: number) => {
  if (switchValue.value === 'sell') {
    currentOrder.value = marketStore.adsResponse?.data.find((el) => el.id === id);
    visibleModal.value = true;
  }
}
</script>

<template>
  <div class="gold-tab">
    <AvaCard bg-color="#ffffff">
      <div class="gold-tab__header">
        <img class="gold" src="@/assets/images/icons/gold.svg" alt="gold">
        <div class="gold-tab__info">
          <AvaCard bg-color="#F0EFF5">
            <div class="title">1 gr. = 75.9 USD</div>
            <div class="subtitle">1 kg. = 75 974 USD</div>
          </AvaCard>
          <span class="text">
            <img src="@/assets/images/market/british-flag.svg" alt="flag">
            London Stock official Exchange price
          </span>
        </div>
      </div>
      <div class="gold-tab__buttons">
        <AvaButton type="warning" @click="router.push('/market/buy')">
          Buy
          <img src="@/assets/images/icons/coins.svg" alt="coins">
        </AvaButton>
        <AvaButton @click="router.push('/market/new-order')" type="primary">
          Sell
          <ArrowCircleIcon/>
        </AvaButton>
      </div>
    </AvaCard>

    <div class="gold-tab__title">
      <span>Balance</span>
      <span>
        <AvaLink text="More about gold types" :is-external="true" link="https://avacoin.notion.site/Market-16645ff95fa24374a44dba4955d56092"/>
      </span>
    </div>

    <AvaCard bg-color="#ffffff">
      <ListItem
          v-for="(item, i) of items"
          :key="i"
          :item="item"
          hide-coin
      >
        <template #reward>
          <div class="gold-tab__reward">
            <span>Act. orders:</span>
            <span v-if="i === 0">
              <b>{{ marketStore.ordersCountGolds }}</b>
            </span>
            <span v-if="i === 1">
              <b>{{ marketStore.ordersCountGoldsStamp }}</b>
            </span>
          </div>
        </template>
      </ListItem>
    </AvaCard>

    <div class="gold-tab__title">
      <span>My orders history</span>
      <AvaSwitch :values="switchValues" v-model="switchValue"/>
    </div>
    <div class="gold-tab__text">Your deals here</div>

    <AvaHistoryTable :type="switchValue" :data="switchValue === 'sell' ? adsList : dealsList" @open="openInfo"/>
  </div>
  <ActiveOrderDrawer v-model="visibleModal" :order="currentOrder" @cancel="(id: number) => { visiblePopup = true; deletedId = id}" />
  <Popup
      v-if="visiblePopup"
      title="Are you sure?"
      :message="`Cancel your order for ${currentOrder?.price} USDT?`"
      :buttons="buttons"
      @close="handlePopupClose"
  />
</template>

<style lang="scss" scoped>
.gold-tab {
  margin-top: 16px;

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 500;
    color: var(--body-background);
    margin-top: 15px;
  }

  &:deep(.list-item__title){
    color: var(--body-background);
    white-space: pre-line;
  }

  &:deep(.list-item__icon){
    background-size: 80%;
  }

  &:deep(.ava-card__body){
    padding: 16px;
  }

  &:deep(.list-item__coins){
    color: #000000;
    font-size: 14px;
    font-weight: 400;
  }

  &__reward {
    display: flex;
    flex-direction: column;
    color: #8A8A8A;
    font-size: 12px;
    font-weight: 400;
    text-align: right;

  }

  img.gold {
    width: 48px;
  }

  &__header {
    display: grid;
    grid-template-columns: 50px 1fr;
    column-gap: 5px;
    margin-bottom: 30px;
    align-items: center;
  }

  &__text {
    font-size: 16px;
    font-weight: 400;
    line-height: 19.36px;
    color: #8E8E8E;
    margin-bottom: 16px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    .title {
      font-size: 24px;
      font-weight: 600;
      color: var(--body-background);
    }

    .subtitle {
      font-size: 16px;
      font-weight: 500;
      color: var(--body-background);
    }

    .text {
      font-size: 12px;
      font-weight: 400;
      line-height: 14.52px;
      color: #8A8A8A;
      display: flex;
      align-items: center;
      column-gap: 5px;
    }
  }

  &__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 12px;

    &:deep(.ava-button) {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 5px;
    }
  }
}
</style>