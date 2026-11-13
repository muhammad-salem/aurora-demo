import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component, view } from '../../../aurora/index.js';
let VideoPlayer = (() => {
    let _classDecorators = [Component({
            selector: 'video-player',
            extend: 'video',
            encapsulation: 'shadow-dom', // will be ignored 'video' element can't attach shadow dom, it already applied before
            shadowRootInit: { mode: 'open', delegatesFocus: true }, // will be ignored
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var VideoPlayer = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            VideoPlayer = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        player = view('video');
        onInit() {
            console.log('src', this.player.src);
        }
    };
    return VideoPlayer = _classThis;
})();
export { VideoPlayer };
let VideoPlayList = (() => {
    let _classDecorators = [Component({
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
	`,
            imports: [VideoPlayer]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var VideoPlayList = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            VideoPlayList = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        allowLoad = true;
        names = [
            'http://github.com/mediaelement/mediaelement-files/blob/master/big_buck_bunny.mp4?raw=true',
        ];
        file = undefined;
        playVideo(fileName) {
            this.file = fileName;
            console.log(fileName);
        }
    };
    return VideoPlayList = _classThis;
})();
export { VideoPlayList };
//# sourceMappingURL=video.js.map