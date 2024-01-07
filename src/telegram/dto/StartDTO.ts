import { ParameterErrors } from "../../enums"

export function StartDTO(msg:string):string{
    const [command, ambient] = msg.split(" ")

    switch(command){
        case undefined:
            throw new Error(ParameterErrors.UNDEFINED_PARAMETERS)        
    }

    switch(ambient){
        case undefined:
            throw new Error(`${ParameterErrors.UNDEFINED_PARAMETERS} (ambient)`)              
    }

    if(ambient != "mainnet" && ambient != "testnet") throw new Error(`${ParameterErrors.UNDEFINED_PARAMETERS} (rpc;;mainnet;;tesnet)`)

    return ambient;
}