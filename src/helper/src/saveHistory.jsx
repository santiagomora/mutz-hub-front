export function saveHistory({
    name,
    data
}){
    const loc = this.props.location,
        path = loc.pathname,
        lstate = loc.state||{},
        store = {};
    store[name] = data;
    this.props.history.replace(
        path,{
        ...lstate,
        ...store
    });
}
