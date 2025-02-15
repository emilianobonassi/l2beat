import { Bridge, Layer2, safeGetTokenByAssetId } from '@l2beat/config'
import { ProjectId, TvlApiResponse } from '@l2beat/types'

import { ChartProps } from '../../components'

export function getChart(
  project: Layer2 | Bridge,
  tvlApiResponse: TvlApiResponse,
): ChartProps {
  return {
    tvlEndpoint: `/api/${project.display.slug}-tvl.json`,
    activityEndpoint: `/api/${project.display.slug}-activity.json`,
    ethereumActivityEndpoint: '/api/ethereum-activity.json',
    tokens: getTokens(project.id, tvlApiResponse),
    hasActivity: true,
  }
}

function getTokens(projectId: ProjectId, tvlApiResponse: TvlApiResponse) {
  return tvlApiResponse.projects[projectId.toString()]?.tokens
    .map(({ assetId, tvl }) => {
      const symbol = safeGetTokenByAssetId(assetId)?.symbol
      if (symbol) {
        return {
          symbol,
          tvlEndpoint: `/api/projects/${projectId.toString()}/tvl/assets/${assetId.toString()}`,
          tvl,
        }
      }
    })
    .filter(notUndefined)
    .sort((a, b) => b.tvl - a.tvl)
}

function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined
}
