export const storage = {
    set: function(name,value){
        sessionStorage.setItem( name,JSON.stringify( value ) );
    },
    get:function(name){
        return JSON.parse( sessionStorage.getItem(name) );
    },
    all:function(fields){
        return fields.reduce(
            (t,e) => {
                t[e] = JSON.parse( sessionStorage.getItem(e) );
                return t;
            },{}
        )
    },
    delete:function(fields){
        return fields.map(
            e => sessionStorage.removeItem(e)
        )
    }
}
