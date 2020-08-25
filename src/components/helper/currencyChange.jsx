
export function currencyChange({
    curr,
    rates,
    rate,
    names,
    price,
    shop
}){
    const name = names[curr-1],
        currentRate = shop === curr
        ? 1
        : rate[name];
    return [name,Math.round(price*currentRate*100)/100];
}
