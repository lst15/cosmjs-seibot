export function TelegramExceptionsDeco() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        
        descriptor.value = async function (msg:any) {            
            let response;

            try {
                response = await originalMethod.call(this, msg);
            } catch (error: any) {
                response = String(error);
            }

            return response;
        };
    };
}
