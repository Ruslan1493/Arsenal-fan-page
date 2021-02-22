import React from 'react';
import { Link } from 'react-router-dom';
import style from './News.module.css';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            news: []
        }
        this.addNews = this.addNews.bind(this);
    }

    addNews(e) {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        console.log(title);
        console.log(description);
        console.log(jwt(Cookies.get('userToken')))
        fetch('http://localhost:8000/add-news', {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                authorId: jwt(Cookies.get('userToken')).authorId
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                const { title, description, authorId, _id } = data
                this.setState({
                    news: [...this.state.news, { title, description, authorId, _id }]
                })
                console.log(data)
                console.log(this.state.news)
            })
    }

    componentDidMount() {
        if (this.props.isAdmin) {
            this.setState({
                isAdmin: true
            })
        }

        fetch('http://localhost:8000/news')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    news: data 
                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return (
            <div>
                <h2>News article</h2>
                <div>
                    {
                        this.state.news.map((item, i) => {
                            return (
                                <div className={style.itemBox} key={item._id}>
                                    <Link to={{
                                        pathname: `/news/${item._id}`,
                                        _id: item._id,
                                        isAdmin: this.state.isAdmin
                                    }} >
                                        <h2>{item.title}</h2>
                                    </Link>
                                </div>
                            )
                        }
                        )
                    }
                </div>
                {
                    this.state.isAdmin
                        ?
                        (
                            <form onSubmit={this.addNews}>
                                <label>Title</label>
                                <input type='text' name='title' />
                                <label>Text</label>
                                <textarea name='description' className={style.newsText}></textarea>
                                <button className={style.addNews}>Add news</button>
                            </form>
                        )
                        :
                        null
                }

            </div>
        )
    }

}

export default News;