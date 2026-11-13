import { OnInit } from '@ibyar/aurora';
export type Hero = {
    id: number;
    title: string;
};
export declare class TrackByComponent implements OnInit {
    heroes: Hero[];
    snapshot: Hero[];
    onInit(): void;
    trackById(index: number, hero: Hero): number;
    trackByTitle(index: number, hero: Hero): string;
    shuffle(): void;
}
//# sourceMappingURL=track-by-example.d.ts.map