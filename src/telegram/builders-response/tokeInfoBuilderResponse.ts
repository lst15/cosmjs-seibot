export const tokeInfo_BuilderResponse = (tokenInfo:any) => {
    let message = ""
    message += `name: ${tokenInfo.name}\n`
    message += `symbol: ${tokenInfo.symbol}\n`
    message += `decimals: ${tokenInfo.decimals}\n`
    message += `supply: ${tokenInfo.total_supply}\n`
    
    return message
}