// Model for toasts
export class Toast {

    // Properties
    type: string;
    message: string;

    constructor(message:string, type:string){
        this.type=type;
        this.message=message;
    }
}