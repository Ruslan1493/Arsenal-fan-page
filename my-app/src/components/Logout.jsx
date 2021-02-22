import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

class Logout extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.logout()
    }

    render() {
        return <Redirect to='/' />
    }
}

export default withRouter(Logout)