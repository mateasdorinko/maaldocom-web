import { mediaAlbumsApi, mapApiError } from '@/server';
import type { GetMediaAlbumDetailResponse, GetMediaAlbumResponse } from '@/types/api';

/** Fetch the album detail. Returns null on 404. */
export async function fetchAlbum(slug: string): Promise<GetMediaAlbumDetailResponse | null> {
  try {
    const { data } = await mediaAlbumsApi.getMediaAlbumBySlug(slug);
    return data;
  } catch (error) {
    const { status } = mapApiError(error);
    if (status === 404) return null;
    throw error;
  }
}

/** Fetch all albums for the sidebar. */
export async function fetchAllAlbums(): Promise<GetMediaAlbumResponse[]> {
  try {
    const { data } = await mediaAlbumsApi.listMediaAlbums();
    return data;
  } catch {
    return [];
  }
}
