import {useEffect, useRef, useState} from 'react';

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

// To gain control over the list, we are making it stateful 
// by using it as initial state in React's useState hook
const initialStories = [
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

const getAsyncStories = () => { 
  return new Promise( resolve => {
    setTimeout( () => resolve( 
      {data:{ stories:initialStories } } ), 2000 
    )
  })
};

// Arrow function without bracket and return
// const getAsyncStories = () => 
//   new Promise( resolve => 
//     setTimeout( () => resolve( 
//       {data:{ stories:initialStories } } ), 2000 
//     )
//   );

function App() {
  const [ stories, setStories ] = useState([]);

  // setting up loading
  const [isLoading, setIsLoading ] = useState(false);

  const [ isError, setIsError ] = useState(false);

  useEffect( () => {
    setIsLoading(true);

    getAsyncStories()
      .then( result => {
        setStories(result.data.stories);
        setIsLoading(false);
    })
    // catch block will catch the error send from server
    .catch(() => setIsError(true))
  }, []);

  // here form item detail, which came from List, 
  // we perform filter and remove that item which matches
  // the id in stories
  const handleRemoveStory = ( item ) => {
    console.log(item)
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    )
    // now we are resetting the stories with filtered items
    setStories(newStories);
  }
                                                                // key, value
  const [ searchTerm, setSearchTerm ] = useSemiPersistentState( 'search', '');

  const handleSearch = event => { setSearchTerm( event.target.value ) };

  const searchedStories = stories.filter(story =>
    // benefit of using include method is if nothing is entered 
    // the whole data will be shown
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
      <div className="App">
      {console.log('return inside App ran')}
      <header className="App-header">
        {/* We are inserting text: Search between component's element tags */}
        {/* now you can access this information via react's children prop */}
        {/* Everything that’s passed between a component’s elements can be accessed as children in the component and be rendered somewhere.*/}
        <InputWithLabel
          id = 'search'
          value = {searchTerm}
          /*  
          - isFoc an attribute is equivalent to isFocused={true}.
          - its just a varaible that we are passsing so we can name it anything
          */
          isFoc
          onInputChange={handleSearch}>
         <strong>Search:</strong>
        </InputWithLabel>
        {/* This time, it’s either rendering something or nothing. So instead of having a ternary operator where one side returns null, use the logical && operator as shorthand:
        so if there is error then only p tag will be shown */}
        {isError && <p>Something Went Wrong.....</p> }
        <hr />
        {/* conditional rendering with ternary operator */}
        { 
          isLoading ? (
            <p>Loading...</p> )
          : (
            <List 
            list={searchedStories} 
            onRemoveItem={handleRemoveStory} 
            />
          )
        }
      </header>
    </div>
  );
} 

// id label value onInputchange are now dynamic value
// you can change them
// you can access infomation between component tag with keyword children

const InputWithLabel = ( { id, value, type='text', isFoc, onInputChange, children } ) => {
  const inputRef = useRef();

// React’s useEffect Hook, performing the focus 
// on the input field when the component renders
// (or its dependencies change).
  useEffect( () => {
    // we are passing isFoc to element
    // so it will be present or we can say isFoc=true;
    if( isFoc && inputRef.current ){
      console.log(isFoc)
      // <input type ='text' id='search' value>
      // The focus() method is used to give focus to an element
      // so we are setting focus on input that have id='search'
      inputRef.current.focus();
    }
    // now we are executing focus programmatically as a side-effect,
    // but only if isFoc is set and the current property is existent.
  },[isFoc]);

  return(
  <>
    <label htmlFor={id}>{children}</label>
    {/* as we are passing the isFoc to input so it will always be present
    so that concludes that autoFocus will be true */}
    <input ref={inputRef} type={type} id={id} value={value} onChange={onInputChange}/>
  </>
) 
}

const List = ( {list, onRemoveItem} ) => { 
  // console.log(list);
  // rest item after taking objectID
  // which will remove the objectID from remaning item.
  return list.map( (item) => < Item  key={item.objectID} item={item} onRemoveItem={onRemoveItem} />)
}

// now you can directly destructring item
// destructring will be done first then other parameter will be written after comma
const Item = ( {item, onRemoveItem} ) => {
  const { url, title, author, num_comments, points } = item;

  return (
    <div>
      <span>
        <a href={url}>{title}</a>
      </span>
      <ul >
        <li>{author}</li>
        <li>{num_comments}</li>
        <li>{points}</li>
      </ul>
      <button type='button'
      // inline handlers allow us to execute the function right in the JSX.
      // here we are sending back the item to function handleRemoveStory
      // so each item will have a button which on click will send item detail back 
      // to the function
      onClick={ () => onRemoveItem(item) }>
        Dismiss
      </button>
    </div>
  );
};
export default App;