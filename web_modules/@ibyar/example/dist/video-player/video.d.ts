import { OnInit } from '@ibyar/aurora';
export declare class VideoPlayer implements OnInit {
    player: HTMLVideoElement;
    onInit(): void;
}
export declare class VideoPlayList {
    allowLoad: boolean;
    names: string[];
    file: string | undefined;
    playVideo(fileName: string): void;
}
//# sourceMappingURL=video.d.ts.map