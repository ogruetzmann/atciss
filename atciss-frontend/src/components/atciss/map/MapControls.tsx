import { useAppDispatch, useAppSelector } from "app/hooks"
import { Map } from "leaflet"
import { RefObject } from "react"
import { usePollControllers } from "services/controllerApi"
import {
  selectAirwayLowerUpper,
  selectAirwayOnMap,
  selectAreasOnMap,
  selectDFSOnMap,
  selectDWDOnMap,
  selectLightning,
  selectLoaOnMap,
  selectOpenFlightmapsOnMap,
  selectSatelliteOnMap,
  selectSectorsOnMap,
  selectSigmetOnMap,
  setAirwayLowerUpper,
  setAirwayOnMap,
  setAreas,
  setDFS,
  setDWD,
  setLightning,
  setLoa,
  setOpenFlightmaps,
  setSatellite,
  setSectors,
  setSigmet,
} from "services/mapSlice"
import { Box, Flex, Text } from "theme-ui"
import { SectorControls } from "../SectorControls"
import { LevelChoice } from "./LevelChoice"
import { Search } from "./search/Search"
import { selectUser } from "app/auth/slice"

export const MapControls = ({ map }: { map: RefObject<Map> }) => {
  const dispatch = useAppDispatch()

  usePollControllers()

  const ofm = useAppSelector(selectOpenFlightmapsOnMap)
  const dfs = useAppSelector(selectDFSOnMap)
  const dwd = useAppSelector(selectDWDOnMap)
  const satellite = useAppSelector(selectSatelliteOnMap)
  const lightning = useAppSelector(selectLightning)
  const sectors = useAppSelector(selectSectorsOnMap)
  const areas = useAppSelector(selectAreasOnMap)
  const loa = useAppSelector(selectLoaOnMap)
  const airways = useAppSelector(selectAirwayOnMap)
  const airwayLowerUpper = useAppSelector(selectAirwayLowerUpper)
  const sigmet = useAppSelector(selectSigmetOnMap)
  const user = useAppSelector(selectUser)

  return (
    <Search map={map}>
      <Box>
        <Text as="label" variant="label">
          <input
            type="checkbox"
            checked={ofm}
            onChange={(e) => dispatch(setOpenFlightmaps(e.target.checked))}
          />
          open flightmaps
        </Text>
      </Box>
      {user?.admin && (
        <Box>
          <Text as="label" variant="label">
            <input
              type="checkbox"
              checked={dfs}
              onChange={(e) => dispatch(setDFS(e.target.checked))}
            />
            DFS ICAO map
          </Text>
        </Box>
      )}
      <Box>
        <Text as="label" variant="label">
          <input
            type="checkbox"
            checked={satellite}
            onChange={(e) => dispatch(setSatellite(e.target.checked))}
          />
          Satellite
        </Text>
      </Box>
      <Box>
        <Text as="label" variant="label">
          <input
            type="checkbox"
            checked={dwd}
            onChange={(e) => dispatch(setDWD(e.target.checked))}
          />
          DWD Niederschlagsradar
        </Text>
      </Box>
      <Box>
        <Text as="label" variant="label">
          <input
            type="checkbox"
            checked={lightning}
            onChange={(e) => dispatch(setLightning(e.target.checked))}
          />
          Blitzortung
        </Text>
      </Box>
      <Box>
        <Text as="label" variant="label">
          <input
            type="checkbox"
            checked={sigmet}
            onChange={(e) => dispatch(setSigmet(e.target.checked))}
          />
          SIGMET
        </Text>
      </Box>
      <Box>
        <Text as="label" variant="label">
          <input
            type="checkbox"
            checked={areas}
            onChange={(e) => dispatch(setAreas(e.target.checked))}
          />
          Areas
        </Text>
      </Box>
      <Box>
        <Text as="label" variant="label">
          <input
            type="checkbox"
            checked={sectors}
            onChange={(e) => dispatch(setSectors(e.target.checked))}
          />
          Sectors
        </Text>
      </Box>
      <Box>
        <Text as="label" variant="label">
          <input
            type="checkbox"
            checked={loa}
            onChange={(e) => dispatch(setLoa(e.target.checked))}
          />
          LOA
        </Text>
      </Box>
      <Flex sx={{ gap: 2 }}>
        <Text as="label" variant="label">
          <input
            type="checkbox"
            checked={airways}
            onChange={(e) => dispatch(setAirwayOnMap(e.target.checked))}
          />
          Airways
        </Text>
        {airways && (
          <select
            value={airwayLowerUpper}
            onChange={(e) =>
              dispatch(setAirwayLowerUpper(e.target.value as "LOWER" | "UPPER"))
            }
          >
            <option value="LOWER">Lower</option>
            <option value="UPPER">Upper</option>
          </select>
        )}
      </Flex>
      {(areas || sectors || loa) && <LevelChoice />}
      {sectors && <SectorControls />}
    </Search>
  )
}
