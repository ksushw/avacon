import axios, { type AxiosRequestConfig } from 'axios';
import { useWebApp } from 'vue-tg';
import { useRouter } from 'vue-router'

export async function useAxios<T>(url: string, options: AxiosRequestConfig = {}): Promise<T> {

  const webApp = useWebApp()
  const router = useRouter()

  let token = webApp.initData
  if (import.meta.env?.VITE_INIT_DATA) {
    token = import.meta.env?.VITE_INIT_DATA
  }

  const defaultOptions: AxiosRequestConfig = {
    url,
    method: 'GET',
    baseURL: 'https://avacoin.elastoo.com/api',
    // @ts-ignore
    transformResponse: [function (data, headers, status) {
      console.log(`%c ${this.method?.toUpperCase()} ${url}`, `background: green`, JSON.parse(data))
      if (status === 424) {
        router.push('/captcha')
      } else if (status === 412) {
        router.push(`/users-limit`)
      }
      return JSON.parse(data);
    }],
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      ...(options?.headers ?? {})
    },
  }

  const { data } = await axios(defaultOptions)

  return data
}