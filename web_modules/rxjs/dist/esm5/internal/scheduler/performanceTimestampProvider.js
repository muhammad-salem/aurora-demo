export var performanceTimestampProvider = {
    now: function () {
        return (performanceTimestampProvider.delegate || performance).now();
    },
    delegate: undefined,
};
//# performanceTimestampProvider.js.map