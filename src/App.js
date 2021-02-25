import {useState} from 'react';

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
  ];

  const [searchTerm, setSearchTerm] = useState('React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story =>
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

const Search = ({ search, onSearch }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
    />
  </div>
);

const List = ( {list} ) => { 
  // now are speading the item after taking objectID
  // which will remove the objectID from remaning item.
  return list.map( ({ objectID, ...item }) => < Item key= {objectID} {...item} />)
}

// now you can directly destructring item
const Item = ( { url, title, author, num_comments, points }  ) => {
  return (
    <div>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </div>
  );
};
export default App;
