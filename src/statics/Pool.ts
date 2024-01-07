export class Pool {
    private bfBuyPools: { [chave: number]: boolean } = {};

    constructor(){
        this.bfBuyPools = []
    }

    public addBfBuyPool(message_id:number){
        this.bfBuyPools[message_id] = true;
    }

    public rmBfBuyPool(message_id:number){
        this.bfBuyPools[message_id] = true;
    }

    public isActivedBfByPool(message_id:number){
        return this.bfBuyPools[message_id]
    }

}