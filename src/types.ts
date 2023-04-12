export type UserType = {
    accessToken: string;
    email: string;
    name: string;
    image: string;
    refreshToken: string;
    username: string;
}

export type SessionType = {
    update?: (data?: Partial<UserType>) => void;
    data?: {
        user: UserType;
        expires: string;
        error?: string;
    };
    status?: 'loading' | 'authenticated' | 'unauthenticated';
}

export interface PlaylistType {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: [ImagesType];
    name: string;
    owner: OwnerType;
    primary_color: string | null;
    public: boolean;
    snapshot_id: string;
    tracks: TrackType;
    type: string;
    uri: string;
}

export type ImagesType = {
    height: number;
    url: string;
    width: number;
};

export type OwnerType = {
    display_name: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
};

export type TracksType = {
    href: string;
    items: [ItemsType];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
};

export type ItemsType = {
    added_at: string;
    added_by: AddedByType;
    is_local: boolean;
    primary_color: string | null;
    track: TrackType;
    video_thumbnail: {
        url: string | null;
    }
};

export type AddedByType = {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
};

export type TrackType = {
    album: AlbumType;
    artists: [ArtistsType];
    available_markets: [string];
    disc_number: number;
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track: boolean;
    track_number: number;
    type: string;
    uri: string;
    video_thumbnail: {
        url: string | null;
    }
};

export type AlbumType = {
    album_group: string | null;
    album_type: string;
    artists: [ArtistsType];
    available_markets: [string];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: [ImagesType];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
};

export type ArtistsType = {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
};