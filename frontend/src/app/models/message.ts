export class Message {
    messages: string[];
    dismissable: true;
    timeout: number;
    type: string;

    constructor(m, d, ti, ty) {
        this.messages = m;
        this.dismissable = d;
        this.timeout = ti;
        this.type = ty;
    }
}
