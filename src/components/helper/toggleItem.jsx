export function toggleItem(e){
    e.preventDefault();
    let item;
    const elem = e.currentTarget,
        index = parseInt(elem.getAttribute("index")),
        dir = parseInt(elem.getAttribute("value")),
        st = this.props.location.state||{},
        order = st.order,
        items = order.items;

    if (items.length>0){
        item = items[index];
        item.quantity+=dir;
        if (item.quantity === 0){
            items.splice(index,1);
        } else
            items[index] = item;
        order.items = items;
    }
    this.props.save({name:'order',data:order})
}
