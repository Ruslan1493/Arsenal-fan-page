import React from 'react'
import { withRouter } from 'react-router'
import style from '../Register/Register.module.scss'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.loginSubmit = this.loginSubmit.bind(this)
    }

    loginSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value
        console.log('Password ', password)
        if (username.length < 4) {
            console.log('The username should be atleast 4 characters long!')
            this.props.displayNotification(true, 'The username should be atleast 4 characters long!')
            return
        } else if (password.length < 3) {
            console.log('The password should be atleast 3 characters long!')
            this.props.displayNotification(true, 'The password should be atleast 3 characters long!')
            return
        }

        fetch('http://localhost:8000/login', {
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
                if(data.success){
                    console.log(this.props)
                    this.props.signup()
                    console.log(data)
                    if(data.roles && data.roles[0] === 'admin'){
                        console.log('admin!')
                        this.props.isAdmin()
                    }
                    this.props.displayNotification(false, 'Login successful!')
                    this.props.history.push('/');
                }else{
                    this.props.displayNotification(true, 'Wrong username or password!')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form method='POST' onSubmit={this.loginSubmit}>
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
                    <input type="submit" value="Submit" className={style.submit} />
                </form >
            </div >
        )
    }
}

export default withRouter(Login)