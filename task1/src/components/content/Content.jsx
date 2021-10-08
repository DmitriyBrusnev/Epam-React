import React, { useState, useEffect } from 'react';

import './content.scss';

class Content extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        albums: []
      };
    }
  
    componentDidMount() {
      fetch("https://jsonplaceholder.typicode.com/albums")
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result)
            this.setState({
              isLoaded: true,
              albums: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, albums } = this.state;
      if (error) {
        return <div>Error: { error.message }</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul className='albums'>
            {
                albums.map(album => (
                <li key={ album.id } className='albums__item'>
                    Title - <span className='album__title'>{ album.title }</span>
                </li>
                ))
            }
          </ul>
        );
      }
    }
  }

// function Content(props) {
//     const [text, setText] = useState('');
//     const goalText = 'Content...';

//     useEffect(() => {
//         for (let i = 0; i < goalText.length; i++) {
//             setTimeout(() => {
//                 setText((prevText) => prevText + goalText[i]);
//             }, 2000 * i);
//         }
//     }, []);

//     return (
//         <div className="content">
//             <span className="anim-typewriter">{ text }</span>
//         </div>
//     );
// }

export default Content;
