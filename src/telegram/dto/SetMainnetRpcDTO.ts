import { ParameterErrors } from "../../enums"

export function SetMainnetRpcDTO(msg:string):string{
    const [command, rpc] = msg.split(" ")

    switch(command){
        case undefined:
            throw new Error(ParameterErrors.UNDEFINED_PARAMETERS)        
    }

    switch(rpc){
        case undefined:
            throw new Error(`${ParameterErrors.UNDEFINED_PARAMETERS} (rpc)`)              
    }

    return rpc;
}