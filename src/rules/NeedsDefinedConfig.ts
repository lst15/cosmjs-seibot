import { ConfigErrors } from "../enums";
import { env } from "../env-schema";

export function NeedsDefinedConfig(configname: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
  
      descriptor.value = async function (msg: any) {              
        if(!env[configname]) throw new Error(`${ConfigErrors.UNDEFINED_CONFIG_FIELD}` )
        
        return await originalMethod.call(this,msg.text);
      };

    };
  }