export const sliceWallet = (str: string) => {
    if (str.length > 10){
        return `${str.slice(0,5)}...${str.slice(str.length-4, str.length)}`
    }
    return str;
}