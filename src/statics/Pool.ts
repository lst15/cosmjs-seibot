export class Pool {
    private bfBuyPools: { [chave: number]: boolean } = {};

    public addBfBuyPool(message_id:number){
        this.bfBuyPools[message_id] = true;
    }

    public rmBfBuyPool(message_id:number){
        this.bfBuyPools[message_id] = false;
    }

    public isActivedBfByPool(message_id:number){
        return this.bfBuyPools[message_id]
    }

    public getBfPool():{ [chave: number]: boolean }{
        return this.bfBuyPools;
    }

}