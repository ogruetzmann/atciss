import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchWithAuth } from "../app/auth"

const tafFormat = (taf: string) =>
  taf
    ?.replace(/.*?[A-Z]{4}\s/, "")
    .replaceAll(/\s(BECMG|PROB\d{2}\sTEMPO|TEMPO|FM\d{6})/g, "\n  $1")

export const tafApi = createApi({
  reducerPath: "taf",
  baseQuery: fetchWithAuth,
  endpoints: (builder) => ({
    getByIcaoCodes: builder.query<{ [id: string]: string }, string[]>({
      query: (icaoList) => ({
        url: `taf`,
        params: icaoList.map((icao) => ["icao", icao]),
      }),
      transformResponse: (tafs) =>
        Object.entries(tafs ?? {}).reduce(
          (acc, [ad, taf]) => ({ ...acc, [ad]: tafFormat(taf) }),
          {},
        ),
    }),
  }),
})

export const usePollTafByIcaoCodes: typeof tafApi.useGetByIcaoCodesQuery = (
  icao,
  options,
) => tafApi.useGetByIcaoCodesQuery(icao, { pollingInterval: 60000, ...options })
