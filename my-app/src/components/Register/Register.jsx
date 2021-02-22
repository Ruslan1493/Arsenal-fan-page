import React from 'react';
import style from './Register.module.scss'
import { withRouter } from 'react-router';

class Register extends React.Component {
    constructor(props){
        super(props)

        this.registerSubmit = this.registerSubmit.bind(this)
    }
    componentDidMount() {
        console.log('Props:')
        console.log(this.props.location.games)
    }

    registerSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value
        if (username.length < 4) {
            console.log('The username should be atleast 4 characters long!')
            this.props.displayNotification(true, 'The username should be atleast 4 characters long!')
            return
        } else if (password !== confirmPassword) {
            console.log('The passwords should be equal!')
            this.props.displayNotification(true, 'The passwords should be equal!')
            return
        } else if (password.length < 3) {
            console.log('The password should be atleast 3 characters long!')
            this.props.displayNotification(true, 'The password should be atleast 3 characters long!')
            return
        }



        fetch('http://localhost:8000/register', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.props.signup()
                if(data.roles && data.roles[0] === 'admin'){
                    console.log('admin!')
                    this.props.isAdmin()
                }
                this.props.displayNotification(false, 'Registration successful!')
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return (
            <div>
                <h2>Register</h2>
                <form method='POST' onSubmit={this.registerSubmit}>
                    <label>
                        Username:
                </label>
                    <div className={style.inputClass}>
                        <input type="text" name="username" className={style.input} />
                    </div>
                    <label>
                        Password:
                </label>
                    <div className={style.inputClass}>
                        <input type="password" name="password" className={style.input} />
                    </div>
                    <label>
                        Confirm Password:
                </label>
                    <div className={style.inputClass}>
                        <input type="password" name="confirmPassword" className={style.input} />
                    </div>
                    <input type="submit" value="Submit" className={style.submit} />
                </form >
            </div >
        )
    }
}

export default withRouter(Register);