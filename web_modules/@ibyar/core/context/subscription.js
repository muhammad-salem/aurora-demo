export function createSubscriptionDestroyer(unsubscribe, pause, resume) {
    return {
        pause() {
            pause?.();
        },
        resume() {
            resume?.();
        },
        unsubscribe() {
            unsubscribe();
        },
    };
}
//# subscription.js.map