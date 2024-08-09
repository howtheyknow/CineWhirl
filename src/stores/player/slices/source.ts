import { ScrapeMedia } from "@movie-web/providers";

import { MakeSlice } from "@/stores/player/slices/types";
import {
  SourceQuality,
  SourceSliceSource,
  selectQuality,
} from "@/stores/player/utils/qualities";
import { useQualityStore } from "@/stores/quality";
import { ValuesOf } from "@/utils/typeguard";

// Player status constants
export const playerStatus = {
  IDLE: "idle",
  SCRAPING: "scraping",
  PLAYING: "playing",
  SCRAPE_NOT_FOUND: "scrapeNotFound",
  PLAYBACK_ERROR: "playbackError",
} as const;

export type PlayerStatus = ValuesOf<typeof playerStatus>;

// Interface definitions
export interface PlayerMetaEpisode {
  number: number;
  tmdbId: string;
  title: string;
}

export interface PlayerMeta {
  type: "movie" | "show";
  title: string;
  tmdbId: string;
  imdbId?: string;
  releaseYear: number;
  poster?: string;
  episodes?: PlayerMetaEpisode[];
  episode?: PlayerMetaEpisode;
  season?: {
    number: number;
    tmdbId: string;
    title: string;
  };
}

export interface Caption {
  id: string;
  language: string;
  url?: string;
  srtData: string;
}

export interface CaptionListItem {
  id: string;
  language: string;
  url: string;
  needsProxy: boolean;
  hls?: boolean;
  opensubtitles?: boolean;
}

export interface AudioTrack {
  id: string;
  label: string;
  language: string;
}

export interface SourceSlice {
  status: PlayerStatus;
  source: SourceSliceSource | null;
  sourceId: string | null;
  qualities: SourceQuality[];
  audioTracks: AudioTrack[];
  currentQuality: SourceQuality | null;
  currentAudioTrack: AudioTrack | null;
  captionList: CaptionListItem[];
  caption: {
    selected: Caption | null;
    asTrack: boolean;
  };
  meta: PlayerMeta | null;
  setStatus(status: PlayerStatus): void;
  setSource(
    stream: SourceSliceSource,
    captions: CaptionListItem[],
    startAt: number,
  ): void;
  switchQuality(quality: SourceQuality): void;
  setMeta(meta: PlayerMeta, status?: PlayerStatus): void;
  setCaption(caption: Caption | null): void;
  setSourceId(id: string | null): void;
  enableAutomaticQuality(): void;
  redisplaySource(startAt: number): void;
}

// Helper function to convert metadata to scrape media format
export function metaToScrapeMedia(meta: PlayerMeta): ScrapeMedia {
  if (meta.type === "show") {
    if (!meta.episode || !meta.season) throw new Error("Missing show data");
    return {
      title: meta.title,
      releaseYear: meta.releaseYear,
      tmdbId: meta.tmdbId,
      type: "show",
      imdbId: meta.imdbId,
      episode: meta.episode,
      season: meta.season,
    };
  }

  return {
    title: meta.title,
    releaseYear: meta.releaseYear,
    tmdbId: meta.tmdbId,
    type: "movie",
    imdbId: meta.imdbId,
  };
}

// Factory function to create the source slice
export const createSourceSlice: MakeSlice<SourceSlice> = (set, get) => ({
  source: null,
  sourceId: null,
  qualities: [],
  audioTracks: [],
  captionList: [],
  currentQuality: null,
  currentAudioTrack: null,
  status: playerStatus.IDLE,
  meta: null,
  caption: {
    selected: null,
    asTrack: false,
  },

  setSourceId(id) {
    set((state) => {
      state.status = playerStatus.PLAYING;
      state.sourceId = id;
    });
  },

  setStatus(status: PlayerStatus) {
    set((state) => {
      state.status = status;
    });
  },

  setMeta(meta, newStatus) {
    set((state) => {
      state.meta = meta;
      state.interface.hideNextEpisodeBtn = false;
      if (newStatus) state.status = newStatus;
    });
  },

  setCaption(caption) {
    const store = get();
    store.display?.setCaption(caption);
    set((state) => {
      state.caption.selected = caption;
    });
  },

  setSource(
    stream: SourceSliceSource,
    captions: CaptionListItem[],
    startAt: number,
  ) {
    const qualityPreferences = useQualityStore.getState();
    const loadableStream = selectQuality(stream, qualityPreferences.quality);

    set((state) => {
      state.source = stream;
      state.qualities =
        stream.type === "file"
          ? (Object.keys(stream.qualities) as SourceQuality[])
          : [];
      state.currentQuality = loadableStream.quality;
      state.captionList = captions;
      state.interface.error = undefined;
      state.status = playerStatus.PLAYING;
      state.audioTracks = [];
      state.currentAudioTrack = null;
    });

    const store = get();
    store.redisplaySource(startAt);
  },

  redisplaySource(startAt: number) {
    const store = get();
    if (!store.source) return;

    const qualityPreferences = useQualityStore.getState();
    const loadableStream = selectQuality(store.source, {
      automaticQuality: qualityPreferences.quality.automaticQuality,
      lastChosenQuality: store.currentQuality,
    });

    set((state) => {
      state.interface.error = undefined;
      state.status = playerStatus.PLAYING;
    });

    store.display?.load({
      source: loadableStream.stream,
      startAt,
      automaticQuality: qualityPreferences.quality.automaticQuality,
      preferredQuality: qualityPreferences.quality.lastChosenQuality,
    });
  },

  switchQuality(quality) {
    const store = get();
    if (!store.source) return;

    if (store.source.type === "file") {
      const selectedQuality = store.source.qualities[quality];
      if (!selectedQuality) return;

      set((state) => {
        state.currentQuality = quality;
        state.status = playerStatus.PLAYING;
        state.interface.error = undefined;
      });

      store.display?.load({
        source: selectedQuality,
        startAt: store.progress.time,
        automaticQuality: false,
        preferredQuality: quality,
      });
    } else if (store.source.type === "hls") {
      store.display?.changeQuality(false, quality);
    }
  },

  enableAutomaticQuality() {
    const store = get();
    store.display?.changeQuality(true, null);
  },
});
