import { useState } from 'react';
import { Map, CustomOverlayMap, Polyline } from 'react-kakao-maps-sdk';

function CustomMap({ data }: { data: any }) {
  const [isPolylineHovered, setIsPolylineHovered] = useState<number | null>(0);
  return (
    <>
      <Map
        center={{
          lat: data.averageLatitude,
          lng: data.averageLongitude,
        }}
        style={{ width: '100%', height: '450px' }}
        level={3}
      >
        <Polyline
          path={[
            [
              {
                lat: 33.452344169439975,
                lng: 126.56878163224233,
              },
              {
                lat: 33.452739313807456,
                lng: 126.5709308145358,
              },
              {
                lat: 33.45178067090639,
                lng: 126.572688693875,
              },
            ],
          ]}
          strokeWeight={5}
          strokeColor={'#90DCE1'}
          strokeOpacity={1}
          strokeStyle={'solid'}
          onMouseover={() => setIsPolylineHovered(true)}
          onMouseout={() => setIsPolylineHovered(false)}
        />
        {data.courseList.length > 0 &&
          data.courseList.map((item, idx) => (
            <>
              {item.map((arr) => {})}
              <CustomOverlayMap
                key={idx}
                position={{
                  lat: item.latitude,
                  lng: item.longitude,
                }}
              >
                <div
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
