import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRootStore } from './root'
import type { ISelectedSkin, ISkin } from '@/types/skin'
import { useAxios } from '@/composables/useAxios'

export const skinsNames: Record<number, string> = {
  0: 'coin',
  1: 'watch',
  2: 'khachapuri',
  3: 'avacoin',
  4: 'money'
}

export const defaultSkin: ISkin = {
  id: 0,
  name: 'Coin Skin',
  description: 'A universal skin for begginers',
  background_color_hex:
    'linear-gradient(1deg, #E46F12 39.37%, #FDB442 55.02%, #FDAF3C 76.73%, #DEB27B 86.14%, #B56518 94.97%)',
  price: -1,
  price_subject: 'usdt'
}

export const useSkinStore = defineStore('skin', () => {
  const rootStore = useRootStore()

  const skinLoading = ref(false)
  const chosenSkin = ref<null | ISelectedSkin>()

  const allSkins = ref<ISkin[]>([])
  const mySkins = ref<ISelectedSkin[]>([])

  function isSkinOwned({ id }: ISkin): boolean {
    return !!mySkins.value.find((skin) => skin.coin_skin.id === id)
  }

  function getSkinOwned({ id }: ISkin): ISelectedSkin | null {
    return mySkins.value.find((skin) => skin.coin_skin.id === id) ?? null
  }

  function canWearSkin(skin: ISkin): boolean {
    const skinName = skinsNames[skin.id]
    const skinOwned = isSkinOwned(skin)

    // Watch skin -> only if holding 2 gold stamp (or bought)
    if (skinName === 'watch' && !skinOwned) {
      return (rootStore.user?.golds_stamp ?? 0) >= 2
    }
    // Unknown
    else {
      return skinOwned
    }
  }

  async function deactivateSkin() {
    if (chosenSkin.value === null) return

    try {
      await useAxios('/coin_skin/deactivate', {
        method: 'POST'
      })

      chosenSkin.value = null
    } catch (e) {
      console.error(e)
    }
  }

  async function activateSkin(skin: ISelectedSkin) {
    if (!canWearSkin(skin.coin_skin)) {
      return
    }

    try {
      await useAxios(`/coin_skin/activate/?user_coin_skin_id=${skin.id}`, {
        method: 'POST'
      })

      chosenSkin.value = skin
    } catch (e) {
      console.error(e)
    }
  }

  async function getSelectedSkin() {
    if (skinLoading.value || chosenSkin.value) return

    // Set that we are currently loading selected skin...
    skinLoading.value = true

    // if (!rootStore.user) await rootStore.fetchUser()

    // Get selected skin
    // chosenSkin.value = rootStore.user!.current_coin_skin
    skinLoading.value = false
  }

  async function getAllSkins() {
    if (allSkins.value.length > 0) return

    try {
      allSkins.value = await useAxios(`/coin_skin/`, {
        method: 'GET'
      })
    } catch (e) {
      console.error(e)
    }

    /*
    allSkins.value = [
      {
        id: 1,
        name: 'Watch Skin',
        description: 'Only for holding 2 gr. Stamp Gold',
        big_description: `Yoy can take this skin by two ways:
        1. Buy it for 300 USDT
        2. Hold 2 gr. of Stamp Gold on your balance, you can buy it on our market, always welcome`,
        background_color_hex: 'linear-gradient(4.35deg, #C3A778 56.61%, #D4C1A2 101.63%)',
        icon: watchIcon,
        price: 300,
        price_subject: 'usdt',
        new: true
      },
      {
        id: 2,
        name: 'Khachapuri Skin',
        description: 'Delicious hot skin with smoke',
        big_description: `Golden crispy crust, tender flesh and a unique aroma of smoke that fills each piece. Khachapuri with smoke is the perfect combination of taste and aroma, which will certainly conquer your heart and stomach.`,
        background_color_hex: `url('${khachapuriBg}')`,
        //backgroundBlurred: false,
        icon: khachapuriIcon,
        price: 10,
        price_subject: 'usdt',
        new: true
      },
      {
        id: 3,
        name: 'AvaCoin Skin',
        description: 'Classic skin for real members',
        big_description: `AVACoin is an engaging Telegram game where players mine virtual gold by tapping on a coin icon. Take this legendary skin and enjoy`,
        background_color_hex:
          'linear-gradient(1.3deg, #3E3600 39.35%, #E7A23B 54.52%, #FDD33C 75.56%, #FFE27A 84.68%, #FFBB0D 93.24%)',
        icon: avacoinIcon,
        price: 10_000,
        price_subject: 'coins_legit',
        new: true
      },
      {
        id: 4,
        name: 'Money Button Skin',
        description: 'Click and make MONEY',
        big_description: `Everyone would love to have a “Loot” button because it would allow them to instantly receive the desired amount of money without much effort. AVAcoin gives you this opportunity.`,
        background_color_hex:
          'linear-gradient(1.3deg, #E3A368 39.35%, #FD993C 75.56%, #C16F5D 93.24%)',
        icon: moneyIcon,
        price: 50_000,
        price_subject: 'coins_legit',
        new: true
      }
    ]
    */
  }

  async function getMySkins() {
    try {
      mySkins.value = await useAxios<ISelectedSkin[]>(`/coin_skin/my`, {
        method: 'GET'
      })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    chosenSkin,
    skinLoading,
    allSkins,
    mySkins,
    isSkinOwned,
    getSkinOwned,
    canWearSkin,
    getSelectedSkin,
    activateSkin,
    deactivateSkin,
    getAllSkins,
    getMySkins
  }
})
