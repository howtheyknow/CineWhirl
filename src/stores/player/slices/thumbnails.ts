import { MakeSlice } from "@/stores/player/slices/types";

export interface ThumbnailImage {
  at: number;
  data: string;
}

export interface ThumbnailSlice {
  thumbnails: {
    images: ThumbnailImage[];
    addImage(img: ThumbnailImage): void;
    resetImages(): void;
  };
}

export interface ThumbnailImagePosition {
  index: number;
  image: ThumbnailImage;
}

/**
 * Gets the nearest image at the provided timestamp.
 * Assumes images are sorted by their 'at' property.
 * @param images - Array of ThumbnailImage, sorted by 'at'.
 * @param at - Timestamp to find the nearest image for.
 * @returns The nearest ThumbnailImagePosition or null if no images exist.
 */
export function nearestImageAt(
  images: ThumbnailImage[],
  at: number,
): ThumbnailImagePosition | null {
  if (images.length === 0) return null;

  const indexPastTimestamp = images.findIndex((image) => image.at > at);

  if (indexPastTimestamp === -1) {
    return { index: images.length - 1, image: images[images.length - 1] };
  }

  const imagePastTimestamp = images[indexPastTimestamp];
  if (indexPastTimestamp === 0) {
    return { index: indexPastTimestamp, image: imagePastTimestamp };
  }

  const imageBeforeTimestamp = images[indexPastTimestamp - 1];
  const distanceBefore = at - imageBeforeTimestamp.at;
  const distancePast = imagePastTimestamp.at - at;

  if (distanceBefore < distancePast) {
    return { index: indexPastTimestamp - 1, image: imageBeforeTimestamp };
  }

  return { index: indexPastTimestamp, image: imagePastTimestamp };
}

export const createThumbnailSlice: MakeSlice<ThumbnailSlice> = (set, get) => ({
  thumbnails: {
    images: [],

    resetImages() {
      set((state) => {
        state.thumbnails.images = [];
      });
    },

    addImage(img) {
      const store = get();
      const index = store.thumbnails.images.findIndex(
        (image) => image.at >= img.at,
      );

      if (index === -1) {
        set((state) => {
          state.thumbnails.images.push(img);
          state.thumbnails.images = [...state.thumbnails.images];
        });
      } else if (store.thumbnails.images[index].at === img.at) {
        set((state) => {
          state.thumbnails.images[index] = img;
          state.thumbnails.images = [...state.thumbnails.images];
        });
      } else {
        set((state) => {
          state.thumbnails.images.splice(index, 0, img);
          state.thumbnails.images = [...state.thumbnails.images];
        });
      }
    },
  },
});
