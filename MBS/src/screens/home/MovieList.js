import React from "react";
import ImageList from '@material-ui/core/ImageList';
import moviesData from  "../../common/moviesData";
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Link } from "react-router-dom";

// Displays the list of published movies
class MovieList extends React.Component{
  // function to convert date object to string
  dateConverter=dateEntry=>{
    let myDate = new Date(dateEntry);
    return myDate.toDateString();
  }
  // function to get date in milliseconds elapsed for comparison
  getDateTime=date=>{
    let newDate = new Date(date);
    return newDate.getTime();
  }
  render(){
    let movieTitle = this.props.parameters.movieName;
    let genreArr = this.props.parameters.genre;
    let artistArr = this.props.parameters.artist;
    let dateStart = this.props.parameters.releaseDateStart;
    let dateEnd = this.props.parameters.releaseDateEnd;
    let filteredMovies = [...moviesData];
    // filtering by movie title
    if(movieTitle.length > 0){
      filteredMovies = filteredMovies.filter((item)=>item.title.toLowerCase().includes(movieTitle.toLowerCase()));
    }
    // filtering by genres
    if(genreArr.length > 0){
      filteredMovies = filteredMovies.filter((item)=>item.genres.some((element)=>genreArr.includes(element)));
    }
    // filtering by artists
    if(artistArr.length > 0){
      filteredMovies = filteredMovies.filter((item)=>item.artists.some(element=>artistArr.includes(element.first_name + " " + element.last_name)))
    }
    // filtering movies having release date post to date entered
    if(dateStart.length > 0){
      filteredMovies = filteredMovies.filter((item)=>this.getDateTime(item.release_date) >= this.getDateTime(dateStart));
    }
    // filtering movies having release date prior to date entered
    if(dateEnd.length > 0){
      filteredMovies = filteredMovies.filter((item)=>this.getDateTime(item.release_date) <= this.getDateTime(dateEnd));
    }
    return (
      <ImageList rowHeight={350} cols={4} gap={10}>
        {filteredMovies.map((item, index)=>(
          <ImageListItem key={item.id}>
            <Link to={`/detail?id=${index}`}>
            <img className="img-link" src={item.poster_url} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>{"Release Date:  " + this.dateConverter(item.release_date)}</span>}
            />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    )
  }
}

export default MovieList;