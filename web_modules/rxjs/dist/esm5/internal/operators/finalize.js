import { operate } from '../util/lift.js';
export function finalize(callback) {
    return operate(function (source, subscriber) {
        try {
            source.subscribe(subscriber);
        }
        finally {
            subscriber.add(callback);
        }
    });
}
//# finalize.js.map