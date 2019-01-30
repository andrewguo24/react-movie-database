import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import ListGroup from "./common/listGroup";
import Pagenation from "./common/pagenation";
import { pagenate } from "../utils/pagenate";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    console.log("handleDelete", movie);
    const movies = this.state.movies.filter(m => (
      <div key={m._id}>m._id !== movie._id</div>
    ));
    this.setState({
      movies
    });
  };

  handleLike = movie => {
    console.log("handle like", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    console.log("Page Change", page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    console.log("handleGenreSelect", genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = pagenate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    if (count === 0) return <p>Sorry, there are no available movies.</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagenation
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
