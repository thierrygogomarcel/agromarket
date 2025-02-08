import { useFetch, type AsyncData } from '#imports'
import type { NitroFetchRequest } from 'nitropack'
import type { UseFetchOptions } from '#imports'
import type { Ref } from 'vue'

export const useApi = async <DataT, ResT = DataT>(
  request: string | NitroFetchRequest | Ref<NitroFetchRequest, NitroFetchRequest> | (() => NitroFetchRequest), 
  options: UseFetchOptions<ResT> & { method?: 'get' | 'post' | 'put' | 'delete' } = {}
): Promise<{ data: ResT | null, error: Error | null }> => {
  try {
    const { method = 'get', ...fetchOptions } = options

    // Resolve the request if it's a function
    const resolvedRequest = typeof request === 'function' ? request() : request

    const { data, error } = await useFetch<ResT>(resolvedRequest, {
      ...fetchOptions,
      method: method as any,
      default: () => null as ResT,
    })

    return { 
      data: data.value ?? null, 
      error: error.value ?? null 
    }
  } catch (err) {
    console.error('API Error:', err)
    return { 
      data: null, 
      error: err instanceof Error ? err : new Error(String(err)) 
    }
  }
}
