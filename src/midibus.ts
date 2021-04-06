
type Subscriber = {
    id: number;
    values?: [number];
    callback: (value: number) => void;
}

const loopback = true;
let idPool = 0;
const subscribers: {[key: number]: Subscriber[]} = {}

export const subscribe = (callback: (value: number) => void, cc: number, values?: [number]) => {
    const id = idPool++;
    subscribers[cc] = [...subscribers[cc], {id, values, callback}];
    return id;
}

export const unsubscribe = (cc: number, id: number) => {
    const subscribersForCC = subscribers[cc];
    const index = subscribersForCC.map(sub => sub.id).indexOf(id);
    if(index > -1){
        subscribers[cc] = [...subscribersForCC.slice(0, index), ...subscribersForCC.slice(index+1)];
    }
}

const publishCC = (cc: number, value: number) => {
    if(subscribers[cc]) {
        subscribers[cc].forEach((subscriber) => {
            if(!subscriber.values || subscriber.values.includes(value)){
                subscriber.callback(value);
            }
        })
    }
}

export const sendCC = (cc: number, value: number) => {
    if(loopback) {
        publishCC(cc, value);
    }
    // TODO: Send with midi
}

export const receiveCC = (cc: number, value: number) => {
    // publish event
    publishCC(cc, value);
}