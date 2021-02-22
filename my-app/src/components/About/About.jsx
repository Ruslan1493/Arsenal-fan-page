import React from 'react';
import style from './About.module.scss';

class About extends React.Component {
    render() {
        return (
            <div>
                <h1>Arsenal</h1>
                <div className={style.about}>
                    Who we are
                    Arsenal Football Club was born when a group of workers
                    at Dial Square armaments factory in Woolwich,
                    notably exiled Scotsman David Danskin and Jack Humble,
                    decided to form a football team to break the monotony of
                    factory life.
                </div>
            </div>
        )
    }
}

export default About;