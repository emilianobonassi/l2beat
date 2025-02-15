import { ActivityApiChart, ActivityApiResponse, UnixTime } from '@l2beat/types'

import { JsonHttpClient } from './caching/JsonHttpClient'

export async function fetchActivityApi(
  apiUrl: string,
  http: JsonHttpClient,
): Promise<ActivityApiResponse> {
  const url = apiUrl + '/api/activity'

  try {
    const json = await http.fetchJson(url)
    return ActivityApiResponse.parse(json)
  } catch (e) {
    return getMockData()
  }
}

const getMockData = (): ActivityApiResponse => {
  const data: ActivityApiChart['data'] = []

  const HOW_MANY_DAYS = 14
  const START = UnixTime.now().toStartOf('day').add(-HOW_MANY_DAYS, 'days')

  for (let i = 0; i < HOW_MANY_DAYS; i++) {
    data.push([START.add(i, 'days'), 100_000 + i * 10_000])
  }

  const arbitrumData: [UnixTime, number][] = data.map((d) => [d[0], d[1] * 0.6])
  const optimismData: [UnixTime, number][] = data.map((d) => [d[0], d[1] * 0.3])
  const dydxData: [UnixTime, number][] = data.map((d) => [d[0], d[1] * 0.1])

  return {
    combined: {
      types: ['timestamp', 'daily tx count'],
      data,
    },
    projects: {
      arbitrum: {
        types: ['timestamp', 'daily tx count'],
        data: arbitrumData,
      },
      optimism: {
        types: ['timestamp', 'daily tx count'],
        data: optimismData,
      },
      dydx: {
        types: ['timestamp', 'daily tx count'],
        data: dydxData,
      },
    },
  }
}
