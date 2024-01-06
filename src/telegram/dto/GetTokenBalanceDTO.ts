import { ParameterErrors } from "../../enums"

export function GetTokenBalanceDTO(msg:string):string{
    const [command, address] = msg.split(" ")

    switch(command){
        case undefined:
            throw new Error(ParameterErrors.UNDEFINED_PARAMETERS)        
    }

    switch(address){
        case undefined:
            throw new Error(`${ParameterErrors.UNDEFINED_PARAMETERS} (address)`)              
    }

    return address;
}