import { LayerGroup } from "react-leaflet"
import { NavaidMarker } from "./NavaidMarker"
import { navaidApi } from "../../services/navaidApi"
import { loaApi, selectLoaCops } from "../../services/loaApi"
import { useAppSelector } from "../../app/hooks"
import { selectOwnedSectors } from "../../services/activePositionSlice"

export const LoaNavaidLayer = () => {
  const ownedSectors = useAppSelector(selectOwnedSectors)
  const { data: _l } = loaApi.useGetBySectorsQuery(ownedSectors, {
    skip: ownedSectors.length == 0,
  })
  const cops = useAppSelector(selectLoaCops)
  const { data: _n } = navaidApi.useGetByDesignatorsQuery(cops)

  return (
    <LayerGroup>
      {cops.map((cop) => (
        <NavaidMarker key={cop} designator={cop} />
      ))}
    </LayerGroup>
  )
}
