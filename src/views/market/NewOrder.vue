<script lang="ts" setup>
import AvaLink from '@/components/AvaLink.vue';
import router from '@/router';
import { BackButton, Popup } from 'vue-tg';
import ListItem from '@/components/ListItem.vue';
import AvaCard from '@/components/AvaCard.vue';
import { ref, computed, onMounted } from 'vue';
import type { IListItem } from '@/types/props';
import silverGoldIcon from '@/assets/images/icons/silver-gold.svg';
import goldIcon from '@/assets/images/icons/gold.svg';
import AvaNumberCounter from '@/components/AvaNumberCounter.vue';
import AvaInput from '@/components/form/AvaInput.vue';
import AvaButton from '@/components/AvaButton.vue';
import ArrowCircleIcon from '@/components/icons/ArrowCircleIcon.vue';
import ActiveOrderDrawer from '@/components/market/ActiveOrderDrawer.vue'
import { useRootStore } from '@/stores/root'
import { useMarketStore } from '@/stores/market';
import AvaCheckbox from '@/components/AvaCheckbox.vue';
import { useNotificationStore } from '@/stores/notification';
import type { OrderType } from '@/types/market';

const root = useRootStore()
const marketStore = useMarketStore();
const notificationStore = useNotificationStore()

const form = ref({
  price: 67,
  subject: 'golds',
  volume: 1,
})

const visibleModal = ref(false);
const visiblePopup = ref(false);
const createdOrder = ref<OrderType>();
const deletedId = ref<number>();
const items = computed((): IListItem[] => [
  {
    firstName: `${root.user?.golds?.toLocaleString('en-EN') ?? 0} gr.`,
    infoText: `= ${(Number(root.user?.golds) * 800000)?.toLocaleString('en-EN') ?? 0} gold dust`,
    lastName: ' ',
    avatar: silverGoldIcon,
    points: 'Gold grams from dust',
    reward: `Act. orders:`,
    type: 'golds'
  },
  {
    firstName: `${root.user?.golds_stamp?.toLocaleString('en-EN') ?? 0} gr.`,
    lastName: ' ',
    avatar: goldIcon,
    points: 'Stamp DUBAI gold bars',
    reward: `Act. orders:`,
    type: 'golds_stamp'
  }]
)

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
      router.push('/market');
      deletedId.value = undefined
      await root.fetchUser()
    } catch (e) {
      console.log(e)
    }
  }
}

const createOrder = async() => {
  try {
    if (form.value.price > 999999.99) {
      notificationStore.push({
        message: 'No more than 999999.99 USDT!',
        type: 'danger'
      })
      return;
    }

    if (form.value.subject ==='golds' && form.value.volume > 1) {
      notificationStore.push({
        message: 'No more than 1 gram!',
        type: 'danger'
      })
      return;
    }

    if (form.value.subject ==='golds' && Number(form.value.volume) > Number(root.user?.golds ?? 0)) {
      notificationStore.push({
        message: 'Not enough golds on balance!',
        type: 'danger'
      })
      return;
    }

    if (form.value.subject ==='golds_stamp' && Number(form.value.volume) > Number(root.user?.golds_stamp ?? 0)) {
      notificationStore.push({
        message: 'Not enough golds stamp on balance!',
        type: 'danger'
      })
      return;
    }

    const res = await marketStore.createOrder(form.value)
    if (res) {
      visibleModal.value = true;
      createdOrder.value = res;
      await root.fetchUser()
    }
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  marketStore.getStats();
})
</script>

<template>
  <BackButton @click="router.go(-1)"/>
  <div class="new-order page">
    <div class="new-order__title">New order for sale</div>
    <div class="new-order__subtitle">
      <span>Balance</span>
      <span>
        <AvaLink text="More about gold types" :is-external="true" link="https://avacoin.notion.site/Market-16645ff95fa24374a44dba4955d56092"/>
      </span>
    </div>
    <div class="new-order__text">Chose what type of gold you want to sell</div>

    <AvaCard>
      <div v-for="(item, i) of items" :key="i">
        <AvaCheckbox :model-value="item.type" :active="form.subject" @update="form.subject = $event">
          <ListItem
              :key="item.firstName"
              :item="item"
              hide-coin
          >
            <template #reward>
              <div class="new-order__reward">
                <span>Act. orders:</span>
                <span v-if="item.type === 'golds'">
                  <b>{{ marketStore.ordersCountGolds }}</b>
                </span>
                <span v-if="item.type === 'golds_stamp'">
                  <b>{{ marketStore.ordersCountGoldsStamp }}</b>
                </span>
              </div>
            </template>
          </ListItem>
        </AvaCheckbox>
      </div>
    </AvaCard>

    <div class="new-order__subtitle">
      <span>Order details</span>
    </div>
    <div class="new-order__text mt-12">Set your own price for order</div>

    <AvaCard>
      <AvaInput v-model="form.price" type="number" label="Set your own price for 1 gram" button-text="USDT" disabled-button/>
      <div class="new-order__card__info">
        <AvaNumberCounter v-model="form.volume"/>
      </div>
      <div class="new-order__price">
        <span>Total order price</span>
        <span>
          <b>{{ Number(form.price ?? 0) * Number(form.volume ?? 0) }} USDT</b>
        </span>
      </div>
    </AvaCard>

    <AvaButton
        class="new-order__button"
        fixed
        type="primary"
        :disabled="form.price < 1 || (form.price < 10 && form.subject === 'golds_stamp')"
        @click="createOrder"
    >
      Make order for sale
      <ArrowCircleIcon/>
    </AvaButton>

    <ActiveOrderDrawer v-model="visibleModal" :order="createdOrder" @cancel="(id: number) => { visiblePopup = true; deletedId = id}" />
  </div>
  <Popup
      v-if="visiblePopup"
      title="Are you sure?"
      :message="`Cancel your order for ${form.price} USDT?`"
      :buttons="buttons"
      @close="handlePopupClose"
  />
</template>

<style lang="scss" scoped>


.new-order {
  padding-top: 35px;
  background: #F0EFF5;

  &:deep(.list-item__coins){
    color: #000000;
    font-size: 14px;
    font-weight: 400;
  }

  &:deep(.list-item__right){
    width: auto;
  }

  &__price {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    margin-top: 16px;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 7px;
  }

  &:deep(input){
    background: #F0EFF5;
  }

  &:deep(.number-counter){
    background: #F0EFF5;
    color: var(--body-background);
  }

  &:deep(.number-counter__minus), &:deep(.number-counter__plus) {
    background: #AAAAAA33;
  }

  &__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 38.73px;
    text-align: center;
    color: var(--body-background);
  }

  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.94px;
    color: #8E8E8E;
    margin-bottom: 12px;
  }

  &__subtitle {
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
    background: #ffffff;
  }

  &__reward {
    display: flex;
    flex-direction: column;
    color: #8A8A8A;
    font-size: 12px;
    font-weight: 400;
    text-align: right;

  }
}

.mt-12 {
  margin-top: 12px;
}
</style>