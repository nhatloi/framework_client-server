export function Ismatch(pasword,cf_password) {
    if(pasword !== cf_password)
         return false
     return true
 }

export function Islengt(text) {
    if(text.length < 6)
         return false
     return true
 }

export function IsEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
