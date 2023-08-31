import { Text, Flex, ThemeUIStyleObject, Box } from "theme-ui"
import {
  Clouds,
  hpaToInhg,
  tl,
  usePollMetarByIcaoCode,
  xmc,
} from "../services/metarApi"
import { ReactNode } from "react"
import { usePollAtisByIcaoCode } from "../services/atisApi"
import { useSearchParams } from "react-router-dom"
import { usePollAdByIcaoCode } from "../services/adApi"
import { DateTime } from "luxon"
import { z2, z3, z4 } from "../app/utils"

const DEFAULT_AERODROME = "EDDM"

const AtisRow = ({
  children,
  sx,
}: {
  children: ReactNode
  sx?: ThemeUIStyleObject
}) => (
  <Flex sx={{ justifyContent: "space-between", alignItems: "baseline", ...sx }}>
    {children}
  </Flex>
)

const Atis = ({ sx }: { sx?: ThemeUIStyleObject }) => {
  const [query] = useSearchParams()
  const aerodrome = query.get("icao") ?? DEFAULT_AERODROME
  const {
    data: metar,
    isLoading: metarIsLoading,
    error: metarError,
  } = usePollMetarByIcaoCode(aerodrome)
  const {
    data: atis,
    isLoading: atisIsLoading,
    error: atisError,
  } = usePollAtisByIcaoCode(aerodrome)
  const {
    data: ad,
    isLoading: adIsLoading,
    error: adError,
  } = usePollAdByIcaoCode(aerodrome)

  if (!metarIsLoading && metar && !atisIsLoading && !adIsLoading && ad) {
    const obs = new Date(`${metar.time}`)
    const wind = metar.wind_dir !== null ? z3(metar.wind_dir) : "VRB"
    const wind_gust = metar.wind_gust ? `G${z2(metar.wind_gust)}` : ""
    const wind_from_to =
      metar?.wind_dir_from && metar.wind_dir_to
        ? `${z3(metar.wind_dir_from)}V${z3(metar.wind_dir_to)} `
        : ""
    const qfe = metar.qnh - (12.017 * (ad.elevation / 3.28084)) / 100

    const clouds =
      metar.clouds.length === 0
        ? "CAVOK"
        : metar.clouds
            .map((clouds: Clouds) =>
              ["NCD", "NSC"].includes(clouds.cover)
                ? clouds.cover
                : `${clouds.cover}${
                    clouds.height ? z3(clouds.height / 100) : "///"
                  }${clouds.type ?? ""}`,
            )
            .join(" ")

    return (
      <Flex
        sx={{
          ...sx,
          flexDirection: "column",
          fontSize: 3,
          fontFamily: "monospace",
        }}
      >
        <AtisRow>
          <Text variant="atisL" sx={{ fontWeight: "bold" }}>
            {aerodrome}
          </Text>
          <Text variant="atisXL">{atis?.atis_code ?? "-"}</Text>
          <Text>
            <Text variant="label">OBS: </Text>
            {z2(obs.getUTCDate())}
            {z2(obs.getUTCHours())}
            {z2(obs.getUTCMinutes())}
          </Text>
          <Text variant="primary">{xmc(metar)}</Text>
          <Text>
            <Text variant="label">SR:</Text>{" "}
            {DateTime.fromISO(ad.sunrise).toUTC().toFormat("HHMM")}
          </Text>
          <Text>
            <Text variant="label">SS:</Text>{" "}
            {DateTime.fromISO(ad.sunset).toUTC().toFormat("HHMM")}
          </Text>
        </AtisRow>
        <AtisRow>
          <Box>
            <Text variant="label">Rwy: </Text>
            <Text variant="atisL">{atis?.runways_in_use.join(" ")}</Text>
          </Box>
          <Box>
            <Text variant="label">TL: </Text>
            <Text variant="atisL">{tl(metar)}</Text>
          </Box>
          <Box>
            <Text variant="label">WX-Type: </Text>
            <Text sx={{ fontSize: 5 }}>METAR</Text>
          </Box>
        </AtisRow>
        <Flex sx={{ flexGrow: 1, gap: 1 }}>
          <Text variant="label" sx={{ display: "block", flexShrink: 0 }}>
            Info:
          </Text>
          <Text sx={{ flexGrow: 1, borderStyle: "inset", display: "block" }}>
            {atis?.text_atis ?? "Offline"}
          </Text>
        </Flex>
        <AtisRow>
          <Text>
            <Text variant="label">Wind/Vis.:</Text> {wind}
            {z2(metar.wind_speed)}
            {wind_gust}KT {wind_from_to}
          </Text>
          <Text>/ {z4(metar.vis)}</Text>
        </AtisRow>
        <AtisRow>
          <Text variant="label">Weather:</Text> {metar.weather.join(" ")}
        </AtisRow>
        <AtisRow>
          <Text>
            <Text variant="label">Temp/Dew:</Text> {z2(metar.temp)}/
            {z2(metar.dewpt)}
          </Text>
          <Box>
            <Text>
              <Text variant="label">Clouds:</Text> {clouds}
            </Text>
          </Box>
        </AtisRow>
        <AtisRow>
          <Text variant="label">QNH:</Text>
          <Text>
            <Text
              variant="atisL"
              sx={{
                borderColor: "red",
                borderWidth: 2,
                paddingX: 4,
                paddingY: 1,
                borderStyle: "solid",
              }}
            >
              {metar.qnh.toFixed(0)}
            </Text>
            /{hpaToInhg(metar.qnh).toFixed(2)}
          </Text>
          <Text>
            <Text variant="label">QFE:</Text> {qfe.toFixed(0)}/
            {hpaToInhg(qfe).toFixed(2)}
          </Text>
        </AtisRow>
        <AtisRow>
          <Text variant="label">Trend:</Text> {metar.trend}
        </AtisRow>
      </Flex>
    )
  } else {
    return metarError?.data?.detail
      ? metarError.data.detail
      : metarIsLoading
      ? "Loading..."
      : "Unknown Error"
  }
}

export { Atis }
