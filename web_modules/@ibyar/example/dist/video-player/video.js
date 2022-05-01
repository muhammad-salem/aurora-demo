import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Component, View } from '../../../aurora/index.js';
let VideoPlayer = class VideoPlayer {
    onInit() {
        console.log('src', this.player.src);
    }
};
__decorate([
    View(),
    __metadata("design:type", HTMLVideoElement)
], VideoPlayer.prototype, "player", void 0);
VideoPlayer = __decorate([
    Component({
        selector: 'video-player',
        extend: 'video',
        encapsulation: 'shadow-dom',
        shadowDomMode: 'open',
        shadowDomDelegatesFocus: true
    })
], VideoPlayer);
export { VideoPlayer };
let VideoPlayList = class VideoPlayList {
    constructor() {
        this.allowLoad = true;
        this.names = [
            'http://github.com/mediaelement/mediaelement-files/blob/master/big_buck_bunny.mp4?raw=true',
        ];
        this.file = undefined;
    }
    playVideo(fileName) {
        this.file = fileName;
        console.log(fileName);
    }
};
VideoPlayList = __decorate([
    Component({
        selector: 'video-play-list',
        template: `
	<div class="row">
		<div class="col-12" *forOf="let fileName of names">
			<a href="javascript:void(0);" (click)="allowLoad && playVideo(fileName)">{{fileName}}</a>
		</div>
	</div>
	<video-player *if="file; else noMedia" controls autoplay name="media">
		<source [src]="file" type="video/mp4" />
	</video-player>
	<template #noMedia>No Video Source Found</template>
	`
    })
], VideoPlayList);
export { VideoPlayList };
//# sourceMappingURL=video.js.map