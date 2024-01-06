import { ParameterErrors } from "../../enums"

export function ExecuteSwapOperationsDTO(msg:string){
    const [command, address, quantity] = msg.split(" ")

    switch(command){
        case undefined:
            throw new Error(ParameterErrors.UNDEFINED_PARAMETERS)        
    }

    switch(address){
        case undefined:
            throw new Error(`${ParameterErrors.UNDEFINED_PARAMETERS} (address)`)              
    }
    
    const validateNumberGas = isNaN(Number(quantity)) ? "0" : quantity
    switch(quantity){
        case "0" :
            throw new Error(`${ParameterErrors.INVALID_PARAMETERS} (gas)`)        
    }

    return [address, quantity];
}