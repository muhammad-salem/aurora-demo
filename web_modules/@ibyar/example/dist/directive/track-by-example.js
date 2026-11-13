import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component } from '../../../aurora/index.js';
let TrackByComponent = (() => {
    let _classDecorators = [Component({
            selector: 'track-by-component',
            template: `
		<div class="row">
			<div class="col-10">
				<div class="row p-2">
					snapshot
					<div *for="const hero of snapshot; trackBy trackById; let i = index;">
						#{{i}} - {{hero.id}} - {{hero.title}}
					</div>
				</div>
				<div class="row p-2">
					*for="const hero of heroes; trackBy trackById; let i = index;"
					<div *for="const hero of heroes; trackBy trackById; let i = index;">
						#{{i}} - {{hero.id}} - {{hero.title}}
					</div>
				</div>
				<div class="row p-2">
					*for="const hero of heroes; trackBy = (index, heroRef) => heroRef.id; let i = index;"
					<div *for="const hero of heroes; trackBy = (index, heroRef) => heroRef.id; let i = index;">
						#{{i}} - {{hero.id}} - {{hero.title}}
					</div>
				</div>
				<div class="row p-2">
					*for="const hero of heroes; trackBy: trackByTitle; let i = index;"
					<div *for="const hero of heroes; trackBy: trackByTitle; let i = index;">
						#{{i}} - {{hero.id}} - {{hero.title}}
					</div>
				</div>
			</div>
			<div class="col-2">
				<div class="btn-group-vertical">
					<button type="button" class="btn btn-outline-primary" @click="shuffle()">Shuffle IDS</button>
				</div>
			</div>
		</div>
	`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TrackByComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TrackByComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        heroes = [
            {
                "id": 1,
                "title": "Super Man"
            },
            {
                "id": 2,
                "title": "Spider Man"
            },
            {
                "id": 3,
                "title": "Hulk"
            },
            {
                "id": 4,
                "title": "Wolverine"
            }
        ];
        snapshot = this.heroes.slice();
        onInit() {
        }
        trackById(index, hero) {
            return hero.id;
        }
        trackByTitle(index, hero) {
            return hero.title;
        }
        shuffle() {
            let currentIndex = this.heroes.length, randomIndex;
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                // And swap it with the current element.
                [this.heroes[currentIndex], this.heroes[randomIndex]] = [this.heroes[randomIndex], this.heroes[currentIndex]];
            }
        }
    };
    return TrackByComponent = _classThis;
})();
export { TrackByComponent };
//# sourceMappingURL=track-by-example.js.map