import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import style from './Main.module.css';
import Squad from '../Squad';
import Team from '../Team/Team';
import About from '../About/About';
import News from '../News/News';
import NewsDetails from '../NewsDetails/NewsDetails';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ErrorComponent from '../ErrorComponent/ErrorNotification';
import Navbar from '../Navbar/Navbar';
import jwt from 'jwt-decode';
import Cookies from 'js-cookie';
import Logout from '../Logout';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            isAuthed: false,
            isAdmin: false,
            error: false,
            notification: false,
            message: ''
        }
        this.displayNotification = this.displayNotification.bind(this)
        this.signup = this.signup.bind(this)
        this.isAdmin = this.isAdmin.bind(this)
        this.logout = this.logout.bind(this)
    }

    displayNotification(error, message) {
        console.log(message)
        if (error) {
            this.setState({
                error: true,
                notification: true,
                message
            })
        } else {
            this.setState({
                error: false,
                notification: true,
                message
            })
        }
        this.clearNotification()
    }

    clearNotification() {
        setTimeout(() => {
            this.setState({
                error: false,
                notification: false
            })
        }, 3000)
    }

    signup() {
        this.setState({
            isAuthed: true
        })
    }

    isAdmin() {
        this.setState({
            isAdmin: true
        })
    }

    logout() {
        if (Cookies.get('userToken')) {
            Cookies.remove('userToken')
            this.setState({
                user: '',
                isAuthed: false
            })
        }
    }

    componentDidMount() {
        if (Cookies.get('userToken')) {
            const user = jwt(Cookies.get('userToken'))
            if (user) {
                this.setState({
                    user: user.name,
                    isAuthed: true,
                    notification: false
                })
            }
        }
        console.log('Main component:')
        console.log(this.state.isAdmin)
    }

    render() {
        return (
            <div className={style.main}>
                <header>
                    <Navbar isAuthed={this.state.isAuthed} logout={this.logout} />
                </header>
                {
                    this.state.notification
                        ?
                        <ErrorComponent error={this.state.error} message={this.state.message} />
                        :
                        null
                }
                <div className={style.body}>
                    <Route exact path='/'>
                        <Squad />
                    </Route>
                    <Route path='/team'>
                        <Team />
                    </Route>
                    <Route path='/about'>
                        <About />
                    </Route>
                    <Route path='/news' exact>
                        <News isAdmin={this.state.isAdmin} />
                    </Route>
                    <Route path='/news/:id'
                        render={({ match }) => <NewsDetails isAdmin={this.state.isAdmin} id={match.params.id}/>}
                    />
                    <Route path='/register'>
                        <Register displayNotification={this.displayNotification} signup={this.signup} />
                    </Route>
                    <Route path='/login'>
                        <Login displayNotification={this.displayNotification} signup={this.signup} isAdmin={this.isAdmin} />
                    </Route>
                    <Route path='/logout'>
                        <Logout logout={this.logout} />
                    </Route>
                </div>
            </div>
        )
    }
}

export default Main;
