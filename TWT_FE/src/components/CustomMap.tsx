import { useState, Fragment } from 'react';
import { Map, CustomOverlayMap, Polyline } from 'react-kakao-maps-sdk';
import NotificationDistance from '../components/NotificationDistance';

function CustomMap({ data }: { data: any }) {
  const paths = data.courseList.map((item) => ({
    lat: item.latitude,
    lng: item.longitude,
  }));

  const [hoveredPolylineIndex, setHoveredPolylineIndex] = useState<
    number | null
  >(null);

  return (
    <>
      <Map
        key={data.id}
        center={{
          lat: data.averageLatitude,
          lng: data.averageLongitude,
        }}
        style={{ width: '100%', height: '450px' }}
        level={6}
      >
        <Polyline
          path={[paths]}
          strokeWeight={5}
          strokeColor="#90DCE1"
          strokeOpacity={1}
          strokeStyle={'solid'}
        />
        {data.courseList.map((item, idx) => (
          <Fragment key={idx}>
            <Polyline
              path={[paths[idx]]}
              strokeWeight={5}
              strokeColor={hoveredPolylineIndex === idx ? 'red' : '#90DCE1'}
              strokeOpacity={1}
              strokeStyle={'solid'}
              onMouseover={() => {
                setHoveredPolylineIndex(idx);
                console.log(hoveredPolylineIndex);
              }}
              onMouseout={() => setHoveredPolylineIndex(null)}
            />
            {hoveredPolylineIndex === idx && (
              <CustomOverlayMap position={paths[idx]}>
                <NotificationDistance distance={item.distance} />
              </CustomOverlayMap>
            )}
          </Fragment>
        ))}

        {data.courseList.length > 0 &&
          data.courseList.map((item, idx) => (
            <>
              <CustomOverlayMap
                key={idx}
                position={{
                  lat: item.latitude,
                  lng: item.longitude,
                }}
              >
                <div
                  key={idx}
                  className={`w-5 h-5 z-10 flex items-center justify-center text-white -translate-x-1/2 rounded-full ring-2 ring-white p-1 ${
                    item.placeType === 'STAY' && 'bg-pink-500'
                  } ${item.placeType === 'HOT_PLACE' && 'bg-amber-500'} ${
                    item.placeType === 'RESTAURANT' && 'bg-blue'
                  }`}
                >
                  {idx + 1}
                </div>
              </CustomOverlayMap>
            </>
          ))}
      </Map>
    </>
  );
}
export default CustomMap;
