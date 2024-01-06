import { ParameterErrors } from "../../enums"

export function SetGasPriceDTO(msg:string):string{
    const [command, gas] = msg.split(" ")

    switch(command){
        case undefined:
            throw new Error(ParameterErrors.UNDEFINED_PARAMETERS)        
    }
    
    const validateNumberGas = isNaN(Number(gas)) ? "0" : gas

    switch(validateNumberGas){
        case "0" :
            throw new Error(`${ParameterErrors.INVALID_PARAMETERS} (gas)`)
                    
    }

    return gas;
}