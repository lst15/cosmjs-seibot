export const executeBuy_buildMessage = (transaction:any) => {
    const y = transaction.events.filter((event: { type: string; }) => event.type == "wasm")
    const z = y.filter((event: { attributes: { filter: (arg0: (attr: any) => boolean) => { (): any; new(): any; length: number; }; }; }) => event.attributes.filter((attr: { key: string; }) => attr.key == "offer_amount").length > 0)
    
    const offer_amount:Array<{key:string,value:string}> = z[0].attributes.filter((attr: { key: string; }) => attr.key == "offer_amount")
    const return_amount:Array<{key:string,value:string}> = z[0].attributes.filter((attr: { key: string; }) => attr.key == "return_amount")

    let message = ""
    message += "Hash `" + transaction.transactionHash + "`\n\n"
    message += "Spents `" + offer_amount[0].value + "` SEIs\n"
    message += "Received `" + return_amount[0].value + "` Tokens\n"
    message += "Gas `" + transaction.gasUsed + "` used"

    return message;
}
