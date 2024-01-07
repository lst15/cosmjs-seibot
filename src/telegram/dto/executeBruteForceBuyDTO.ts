import { ParameterErrors } from "../../enums"

export function executeBruteForceBuyDTO(msg:string){
    const [command, address, quantity,tries] = msg.split(" ")

    switch(command){
        case undefined:
            throw new Error(ParameterErrors.UNDEFINED_PARAMETERS)        
    }

    switch(address){
        case undefined:
            throw new Error(`${ParameterErrors.UNDEFINED_PARAMETERS} (address)`)              
    }
    
    const validateNumberQuantity = isNaN(Number(quantity)) ? "0" : quantity
    switch(validateNumberQuantity){
        case "0" :
            throw new Error(`${ParameterErrors.INVALID_PARAMETERS} (quantity)`)        
    }

    const validateNumberTries = isNaN(Number(tries)) ? "0" : quantity
    switch(validateNumberTries){
        case "0" :
            throw new Error(`${ParameterErrors.INVALID_PARAMETERS} (tries)`)        
    }

    return [address, quantity,tries];
}