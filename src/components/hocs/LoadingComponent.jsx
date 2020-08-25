import React from 'react';

import Loader from 'react-loader-spinner'

export default React.memo(LoadingComponent);

function LoadingComponent(props) {
    return (
        props.data
            ?   props.children
            :   <div
                    className="mvpadding minheight aligncenter"
                    style={{width:"100%"}}>
                    <Loader
                        type="TailSpin"
                        color="var(--dgray)"
                        height={80}
                        width={80} />
                </div>
    )
}
