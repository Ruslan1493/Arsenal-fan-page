import React, { Component } from 'react';
import style from './Squad.module.scss';
import data from '../services/data-provider';

class Squad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            firstName: '',
            lastName: '',
            number: '',
            position: '',
            nationality: '',
        }
        this.addPlayer = this.addPlayer.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        // this.setState({
        //     data: data
        // })
    }

    addPlayer(e) {
        e.preventDefault()
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const name = firstName + ' ' + lastName
        const number = e.target.number.value
        const position = e.target.position.value
        const nationality = e.target.nationality.value

        fetch('http://localhost:8000/create-player', {
            method: 'POST',
            body: JSON.stringify({
                name,
                position,
                number,
                nationality
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    firstName: '',
                    lastName: '',
                    number: '',
                    position: '',
                    nationality: '',
                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Squad List</h1>
                <div className={style.squadTable}>
                    <div>
                        Name:
                    </div>
                </div>
                {console.log(this.props.isAdmin)}
                {this.props.isAdmin ?
                    <form onSubmit={this.addPlayer}>
                        <span>First Name</span>
                        <input type="text" name="firstName" value={this.state.firstName} placeholder="First name" onChange={this.handleChange} />
                        <span>Last Name</span>
                        <input type="text" name="lastName" value={this.state.lastName} placeholder="Last name" onChange={this.handleChange} />
                        <span>Number</span>
                        <input type="text" name="number" value={this.state.number} placeholder="Number" onChange={this.handleChange} />
                        <span>Position</span>
                        <input type="text" name="position" value={this.state.position} placeholder="Position" onChange={this.handleChange} />
                        <span>Nationality</span>
                        <input type="text" name="nationality" value={this.state.nationality} placeholder="Nationality" onChange={this.handleChange} />
                        <button className={style.addPlayer}>Add player</button>
                    </form>
                    : null}
            </div>
        )
    }
}

export default Squad;