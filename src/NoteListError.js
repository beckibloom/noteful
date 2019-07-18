import React from 'react'

class NoteListError extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    render() {
        if (this.state.hasError) {
            return (
                <p>There was a problem displaying the note or note list. Please try again later.</p>
            )
        }
        return this.props.children
    }
}

export default NoteListError