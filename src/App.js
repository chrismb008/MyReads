import React from 'react'
import { Route } from 'react-router-dom'
import MainPage from './Components/MainPage'
import SearchPage from './Components/SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books
        .filter(b => b.id !== book.id)
        .concat([ book ])
      }))
    })
  };


  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <MainPage
            books={this.state.books}
            moveShelf={this.moveShelf}
          />
        )} />

        <Route path="/search" render={() => (
          <SearchPage
            books={this.state.books}
            moveShelf={this.moveShelf}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
