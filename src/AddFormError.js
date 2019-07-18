import React from 'react'

class AddFormError extends React.Component {
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
                <p>There was a problem displaying the ADD NEW form. Please try again later.</p>
            )
        }
        return this.props.children
    }
}

export default AddFormError