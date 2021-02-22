import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            games: [1, 2, 3, 4, 5]
        }
    }

    // authenticate() {
    //     this.setState({
    //         isAuthed: true
    //     })
    //     console.log('The user was logged in!')
    // }

    render() {
        return (
            <div className={style.navigation}>
                <div className={style.logo}>

                </div>
                <ul className={style.navbar}>

                    <span>
                        <li>
                            <Link to='/squad' className={style.link}>
                                Squad
                            </Link>
                        </li>
                        <li>
                            <Link to='/team' className={style.link}>
                                The team
                            </Link>
                        </li>
                        <li>
                            <Link to='/about' className={style.link}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to='/news' className={style.link}>
                                News
                            </Link>
                        </li>
                    </span>
                    {!this.props.isAuthed
                        ?
                        <span>
                            <li>
                                <Link to={{
                                    pathname: '/register',
                                    games: this.state.games
                                }} className={style.link}>
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to={{
                                    pathname: '/login',
                                }} className={style.link}>
                                    Login
                                </Link>
                            </li>
                        </span>
                        :
                        <span>
                            <li>
                                <Link to={{
                                    pathname: '/logout',
                                }} className={style.link}>
                                    Logout
                                </Link>
                            </li>
                        </span>
                    }
                </ul>
            </div>
        )
    }
}

export default Navbar;

