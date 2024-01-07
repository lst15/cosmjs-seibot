import { ParameterErrors } from "../../enums"

export function SetTestnetRpcDTO(msg:string):string{
    const [command, rpc,ambient] = msg.split(" ")

    switch(command){
        case undefined:
            throw new Error(ParameterErrors.UNDEFINED_PARAMETERS)        
    }

    switch(rpc){
        case undefined:
            throw new Error(`${ParameterErrors.UNDEFINED_PARAMETERS} (rpc)`)              
    }

    switch(ambient){
        case undefined:
            throw new Error(`${ParameterErrors.UNDEFINED_PARAMETERS} (ambient)`)
    }

    if(ambient != "mainnet" && ambient != "testnet") throw new Error(`${ParameterErrors.UNDEFINED_PARAMETERS} (rpc;;mainnet;;tesnet)`)

    return rpc;
}