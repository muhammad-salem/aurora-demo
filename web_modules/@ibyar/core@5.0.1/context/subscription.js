export function createDestroySubscription(unsubscribe, pause, resume) {
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
//# sourceMappingURL=subscription.js.map