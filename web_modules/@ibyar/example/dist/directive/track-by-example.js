import { __decorate } from "../../../../tslib/tslib.es6.js";
import { Component } from '../../../aurora/index.js';
let TrackByComponent = class TrackByComponent {
    constructor() {
        this.heros = [
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
    }
    onInit() {
    }
    trackById(index, hero) {
        return hero.id;
    }
    trackByTitle(index, hero) {
        return hero.title;
    }
    shuffle() {
        let currentIndex = this.heros.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [this.heros[currentIndex], this.heros[randomIndex]] = [this.heros[randomIndex], this.heros[currentIndex]];
        }
        console.log('heros', this.heros);
    }
};
TrackByComponent = __decorate([
    Component({
        selector: 'track-by-component',
        template: `
		<div class="row">
			<div class="col-10">
				<div class="row p-2">
					*for="const hero of heros; trackBy trackById; let i = index;"
					<div *for="const hero of heros; trackBy trackById; let i = index;">
						#{{i}} - {{hero.id}} - {{hero.title}}
					</div>
				</div>
				<div class="row p-2">
					*for="const hero of heros; trackBy = (index, heroRef) => heroRef.id; let i = index;"
					<div *for="const hero of heros; trackBy = (index, heroRef) => heroRef.id; let i = index;">
						#{{i}} - {{hero.id}} - {{hero.title}}
					</div>
				</div>
				<div class="row p-2">
					*for="const hero of heros; trackBy: trackByTitle; let i = index;"
					<div *for="const hero of heros; trackBy: trackByTitle; let i = index;">
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
    })
], TrackByComponent);
export { TrackByComponent };
//# sourceMappingURL=track-by-example.js.map