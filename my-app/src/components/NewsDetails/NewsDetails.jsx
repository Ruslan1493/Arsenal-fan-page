import React from 'react'

class NewsDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newsDetails: {},
            editDescription: false
        }

        this.saveEditing = this.saveEditing.bind(this)
        this.editDescription = this.editDescription.bind(this)
    }

    componentDidMount() {
        console.log(this.props.id)
        fetch(`http://localhost:8000/news/${this.props.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    newsDetails: data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    saveEditing(e) {
        e.preventDefault()
        console.log('Title: ', this.state.newsDetails.title)
        fetch(`http://localhost:8000/news/${this.props.id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    description: this.state.newsDetails.description
                }),
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(data => {
                console.log('New data: ', data)
            })
            .catch(err => {
                console.log(err)
            })
            console.log('Title: ', this.state.newsDetails.title)
        this.setState({
            editDescription: false
        })
    }

    editDescription(e) {
        e.preventDefault()
        this.setState({
            editDescription: true
        })
    }

    handleChange(e) {
        e.preventDefault()
        this.setState({
            newsDetails: {
                ...this.state.newsDetails,
                description: e.target.value
            }
        })
    }

    render() {
        return (
            <div>
                <h2>{this.state.newsDetails.title}</h2>
                {
                    this.state.editDescription
                        ?
                        <div>
                            <textarea
                                name="editDescription"
                                id="editDescription"
                                cols="30" rows="10"
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.newsDetails.description}>
                            </textarea>
                            <button onClick={this.saveEditing}>Save editing</button>
                        </div>
                        :
                        <p>{this.state.newsDetails.description}</p>

                }
                {
                    // this.props.isAdmin
                    //     ?
                    <div>
                        <button onClick={this.editDescription}>Edit</button>
                        <button>Remove</button>
                    </div>
                    // :
                    // null
                }
            </div>
        )
    }
}

export default NewsDetails;