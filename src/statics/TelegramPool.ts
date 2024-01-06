export class TelegramPool {
    private isBusy:boolean;

    constructor(){
        this.isBusy = false;
    }
    
    public getBusy(){
        return this.isBusy
    }

    public setBusy(value:boolean){
        this.isBusy = value;
    }
}