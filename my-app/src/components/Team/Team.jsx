import React from 'react';
import style from './Team.module.scss'

class Team extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squad: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/squad')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    squad: data,
                    isLoading: false
                })
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Players List</h2>
                <ul>
                </ul>
                <div className={style.gridContainer}>
                    {
                        this.state.isLoading
                            ?
                            <p>Loading...</p>
                            :
                            this.state.squad.map(player => {
                                return (
                                    <div className={style.gridItem}>
                                        <div>{player.name}</div>
                                        <div>{player.position}</div>
                                        <p className={style.number}>{player.number}</p>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        )
    }
}

export default Team;