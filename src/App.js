import {useEffect, useState} from 'react';

function App() {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
    {
      title: 'Javascript',
      url: 'https://www.learn-js.org/',
      author: 'Js',
      num_comments: 4,
      points: 3,
      objectID: 2,
    },
    {
      title: 'Css',
      url: 'https://www.w3.org/Style/CSS/Overview.en.html',
      author: 'Js',
      num_comments: 4,
      points: 5,
      objectID: 3,
    },
    {
      title: 'Html',
      url: 'https://www.learn-html.org/',
      author: 'Html',
      num_comments: 6,
      points: 6,
      objectID: 4,
    },
  ];

  const [searchTerm, setSearchTerm] = useState(
    // if no value is found in local storage
    // which will happen on initial search,
    // React word will be used to filter 
        localStorage.getItem('search') || 'React');

// useEffect is used to change the value of search term in local storage
// whenever dependency term changes loacal storage term will change
  useEffect( () => {
    localStorage.setItem( 'search', searchTerm );
  }, [searchTerm] ); // dependency

  const handleSearch = event => {
    setSearchTerm( event.target.value );
  };

  const searchedStories = stories.filter(story =>
    // benefit of using include method is if nothing is entered 
    // the whole data will be shown
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  

  return (
    <div className="App">
      <header className="App-header">
        <Search search={searchTerm} onSearch={handleSearch} />
        <hr />
        <List list={searchedStories} />
      </header>
    </div>
  );
}

const Search = ( { search, onSearch } ) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      // call back
      value={search}
      onChange={onSearch}
    />
  </div>
);

const List = ( {list} ) => { 
  // console.log(list);
  // rest item after taking objectID
  // which will remove the objectID from remaning item.
  return list.map( ({ objectID, ...item }) => < Item key={objectID} {...item} />)
  //                             rest                                  spread
}

// now you can directly destructring item
// destructring will be done first then other parameter will be written after comma
const Item = ( { url, title, author, num_comments, points }, key ) => {
  return (
    <div>
      <span>
        <a href={url}>{title}</a>
      </span>
      <ul key={key.objectID}>
        <li>{author}</li>
        <li>{num_comments}</li>
        <li>{points}</li>
      </ul>
    </div>
  );
};
export default App;