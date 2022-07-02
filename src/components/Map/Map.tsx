import 'mapbox-gl/dist/mapbox-gl.css'
import { randomCirclePoint } from 'random-location'
import React, { useMemo, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import CloseIcon from '../../assets/close-icon.svg'
import LinkIcon from '../../assets/link-icon.svg'
import PointIcon from '../../assets/point-icon.svg'
import RadiusIcon from '../../assets/radius-mark.svg'
import WhatsAppIcon from '../../assets/whatsapp-icon.svg'
import { MAPBOX_GL_TOKEN } from '../../constants'
import { TPoint } from '../../types'
import {
  AddressStyle,
  LinkIconStyle,
  LinksStyle,
  MarkerStyle,
  PointStyle,
  PopupCloseIconStyle,
  PopupContentStyle,
  PopupSubTitleStyle,
  PopupTitleStyle,
  UserPointStyle,
  WhatsAppIconStyle,
} from './styles'

interface IMapProps {
  lat?: number
  lng?: number
  data?: TPoint[]
}

const DEFAULT_PROPS: IMapProps = {
  lat: -31.4173391,
  lng: -64.183319,
  data: [],
}

const MapComponent = ({
  lat = DEFAULT_PROPS.lat,
  lng = DEFAULT_PROPS.lng,
  data = DEFAULT_PROPS.data,
}: IMapProps): React.ReactElement => {
  const [selectedPoint, setSelectedPoint] = useState<TPoint>(null)
  const [currentZoom, setCurrentZoom] = useState<number>(13)

  const DATA_POINTS = useMemo(() => {
    return data
      ? data.map((point: TPoint) => {
          const { latitude: lat, longitude: lng } = randomCirclePoint(
            {
              latitude: point.location.latLng.lat,
              longitude: point.location.latLng.lng,
            },
            100
          )
          return {
            ...point,
            location: {
              ...point.location,
              latLng: { lat, lng },
            },
          }
        })
      : []
  }, [data])

  const handleClickMarker = (point: TPoint): void => {
    setSelectedPoint(point)
  }

  const handleClosePopup = (): void => {
    setSelectedPoint(null)
  }

  return (
    <Map
      mapboxAccessToken={MAPBOX_GL_TOKEN}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 13,
      }}
      onZoom={(data) => setCurrentZoom(data.viewState.zoom)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{
        height: '100%',
        width: '100%',
      }}
      {...(selectedPoint && {
        longitude: selectedPoint?.location.latLng.lng,
        latitude: selectedPoint?.location.latLng.lat,
      })}
    >
      <>
        {DATA_POINTS?.length &&
          DATA_POINTS.map((point) => {
            return (
              <Marker
                longitude={point?.location.latLng?.lng}
                latitude={point?.location.latLng?.lat}
                key={point?.id}
                onClick={(e) => {
                  e.originalEvent.stopPropagation()
                  handleClickMarker(point)
                }}
              >
                <div className={MarkerStyle}>
                  <RadiusIcon
                    width={Math.round(0.01 * Math.pow(2, currentZoom))}
                    height={Math.round(0.01 * Math.pow(2, currentZoom))}
                    className={PointStyle}
                  />
                </div>
              </Marker>
            )
          })}
        <Marker longitude={lng} latitude={lat}>
          <PointIcon width={24} height={24} className={UserPointStyle} />
        </Marker>
        {selectedPoint && (
          <Popup
            longitude={selectedPoint?.location.latLng.lng}
            latitude={selectedPoint?.location.latLng.lat}
            anchor="bottom"
            offset={[7, -20]}
            className={PopupContentStyle}
            closeButton={false}
            closeOnMove={true}
            onClose={handleClosePopup}
          >
            <CloseIcon
              width={16}
              height={16}
              onClick={handleClosePopup}
              className={PopupCloseIconStyle}
            />
            <span className={PopupTitleStyle}>{selectedPoint?.name}</span>
            <span className={PopupSubTitleStyle}>F2F</span>
            <a
              href={`https://maps.google.com/?q=${selectedPoint?.location?.latLng.lat},${selectedPoint?.location?.latLng.lng}`}
              target="_blank"
              rel="noreferrer"
              className={AddressStyle}
            >
              {selectedPoint?.location?.address}
            </a>
            <span className={LinksStyle}>
              {selectedPoint?.contact?.whatsapp && (
                <a
                  href={`https://wa.me/54${selectedPoint.contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon
                    width={16}
                    height={16}
                    className={WhatsAppIconStyle}
                  />
                </a>
              )}
              {selectedPoint?.contact?.link && (
                <a
                  href={
                    selectedPoint.contact.link.startsWith('http')
                      ? selectedPoint.contact.link
                      : `//${selectedPoint.contact.link}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon width={20} height={20} className={LinkIconStyle} />
                </a>
              )}
            </span>
          </Popup>
        )}
      </>
    </Map>
  )
}

export default MapComponent
