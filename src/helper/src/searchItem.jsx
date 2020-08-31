export function searchItem (data,key) {
    return data.reduce(
            (t,e,i) => e.id === key ? i : t,-1
        )
}
