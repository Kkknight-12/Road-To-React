import {useEffect, useState} from 'react';

// while making custom hook you need to
// use "use" keyword as prefix for hook name
// you must return value that too in form of array
//                         key='search', initialState='React'
const useSemiPersistentState = (key, initialState) => { 
  console.log(`useSemiPersistentState ran`)
  // React, dispatchAction()
    const [value, setValue] = useState(
    // if no value is found in local storage
    // which will happen on initial search,
    // React word will be used to filter 
    localStorage.getItem(key) || initialState );

// useEffect is used to change the value of search term in local storage
// whenever dependency term changes local storage term will change
  useEffect( () => {
    localStorage.setItem( key, value );
  }, [value, key] ); // dependency

  return [
    value,
    setValue
  ]
}

function App() {
  console.log('App function ran')
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
                                                                // key, value
  const [ searchTerm, setSearchTerm ] = useSemiPersistentState( 'search', '');
  console.log('After searchTerm')

  const handleSearch = event => { setSearchTerm( event.target.value ) };
  console.log('handleSearch')

  const searchedStories = stories.filter(story =>
    // benefit of using include method is if nothing is entered 
    // the whole data will be shown
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('searchedStories')
    
    return (
      <div className="App">
      {console.log('return inside App ran')}
      <header className="App-header">
        {/* <Search search={searchTerm} onSearch={handleSearch} /> */}
        <InputWithLabel
        id = 'search'
        label = 'Search'
        value = {searchTerm}
        onInputChange = {handleSearch}
        />
        <hr />
        <List list={searchedStories} />
      </header>
    </div>
  );
} 

// id label value onInputchange are now dynamic value
// you can change them
const InputWithLabel = ( { id, label, value, onInputChange } ) => (
  <>
    <label htmlFor={id}>{label}</label>&nbsp;
    <input type="text" id={id} value={value} onChange={onInputChange}/>
  </>
) 
// you can just you parathesis after or to return jsx or you can also use
// normal way of returning jsx 
// const InputWithLabel = ( { id, label, value, onInputChange } ) => {
//   return(
//     <>
//       <label htmlFor={id}>{label}</label>&nbsp;
//       <input type="text" id={id} value={value} onChange={onInputChange}/>
//     </>
//     )
// } 

// const Search = ( { search, onSearch } ) => (
//   <div>
//     {console.log('search component ran')}
//     <label htmlFor="search">Search: </label>
//     <input
//       id="search"
//       type="text"
//       // call back
//       value={search}
//       onChange={onSearch}
//     />
//   </div>
// );

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