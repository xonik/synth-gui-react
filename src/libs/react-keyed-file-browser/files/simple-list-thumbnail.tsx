import React from 'react'

import ListThumbnailFile from './list-thumbnail'

class SimpleListThumbnailFile extends React.Component {
    render() {
        return (
            // @ts-ignore - Props are passed through from parent file browser
            <ListThumbnailFile
                {...this.props}
                showName={false}
                showSize={false}
                showModified={false}
                isSelectable={false}
            />
        )
    }
}

export default SimpleListThumbnailFile
