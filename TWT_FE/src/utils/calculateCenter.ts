import { PageProps } from '../api/type';

export function calculateCenter(places: PageProps | undefined) {
  if (!places || !places.content) {
    return { lat: 37.552987017, lng: 126.972591728 }; // Default coordinates
  }

  const allCoordinates = places.content.map((place: any) => ({
    latitude: place.latitude,
    longitude: place.longitude,
  }));

  const totalCoordinates = allCoordinates.length;
  if (totalCoordinates === 0) {
    return { lat: 37.552987017, lng: 126.972591728 }; // Default coordinates
  }

  const sumLat = allCoordinates.reduce(
    (sum: number, coord: any) => sum + coord.latitude,
    0
  );
  const sumLng = allCoordinates.reduce(
    (sum: number, coord: any) => sum + coord.longitude,
    0
  );
  return {
    lat: sumLat / totalCoordinates,
    lng: sumLng / totalCoordinates,
  };
}
