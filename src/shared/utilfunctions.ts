export const isPropEmpty = (val: Array<any> | string | number | null | undefined)=>{
    if(Array.isArray(val) && val.length === 0) return true;

    else if(val === '' || val === null || val === undefined) return true;

    else return false;
}