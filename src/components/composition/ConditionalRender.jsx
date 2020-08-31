import React, {
    Component
} from 'react';


export default function ConditionalRender({
    condition,
    children,
    other
}){
    return (
        condition
        ? other
        : children
    )
}
