export interface HemocioneEvent {
    _id: string;
    name: string;
    slug: string;
    banner: string;
    location: {
        address: string;
        city: string;
        state: string;
    }
    startAt: string;
}
