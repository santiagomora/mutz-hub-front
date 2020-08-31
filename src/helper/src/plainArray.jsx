export function plainArray(arr){
    return Object.values(arr).reduce(
        (t,e,i) => [...t,...e],[]
    )
}
