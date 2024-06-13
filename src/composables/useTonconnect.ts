import { TonConnectUI } from '@tonconnect/ui'

export const useTonConnect = () => {
  const tonConnectUI = new TonConnectUI({
    // manifestUrl: 'https://avacoin.elastoo.com/tonconnect-manifest.json',
    manifestUrl: 'https://avacoin.elastoo.com/tonconnect-manifest.json',
    buttonRootId: 'tonconnect'
  })

  return {
    tonConnectUI
  }
}