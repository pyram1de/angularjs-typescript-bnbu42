
export class AwObservable {

    private _eventName;
    private _data;

    constructor() {
        this._eventName = `awObservable.${Math.random()}`;
    }

    //This is based on RxJS.BehaviorSubject
    public getValue() {
        return this._data;
    }

    //This is based on RxJS.Observable
    public AwObservable() {
        let callbackList = [];

        let self = this;

        const notifier = {
            subscribe: function (fn: Function) {
                callbackList.push(fn);
            },
            next: function (notifyData: Object) {
                self._data = notifyData;

                //IE11 workaround!
                var event;
                if (typeof (Event) === 'function') {
                    event = new Event(self._eventName);
                } else {
                    event = document.createEvent('Event');
                    event.initEvent(self._eventName, true, true);
                }
                //IE11 workaround! 

                window.dispatchEvent(event);
            }
        };

        window.addEventListener(this._eventName, (ev) => {
            for (let cb of callbackList) {
                cb(self._data);
            }
        });

        return notifier;
    }
}