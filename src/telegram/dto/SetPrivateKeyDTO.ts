import { ParameterErrors } from "../../enums"

export function SetPrivateKeyDTO(msg:string):string{
    const [command, privateKey] = msg.split(" ")

    switch(command){
        case undefined:
            throw new Error(ParameterErrors.UNDEFINED_PARAMETERS)        
    }

    switch(privateKey){
        case undefined:
            throw new Error(`${ParameterErrors.UNDEFINED_PARAMETERS} (privateKey)`)              
    }

    return privateKey;
}