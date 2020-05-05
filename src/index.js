import React from 'react';
import ReactDOM from 'react-dom';

// const formatDate = (date) => {
//   return date.toLocaleString();
// };

const UserInfo = props => {
  return (
    <div className="UserInfo">
        <p className="UserInfo-name">
          {props.user}
        </p>
      </div>
  );
};

class CommentForm extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    comments: JSON.parse(localStorage.getItem('state')) || [],
    newCommentName: '',
    newCommentText: ''
  };
  
  }

  addComment() {
    const comments = this.state.comments;
    comments.push({
      date: new Date().toLocaleString(),
      name: this.state.newCommentName,
      text: this.state.newCommentText
    });
    localStorage.setItem('state', JSON.stringify(this.state.comments));
    this.setState({comments});
    
  }

  deleteComment(i) {
    const comments = this.state.comments;
    comments.splice(i, 1);
    localStorage.setItem('state', JSON.stringify(this.state.comments));
    this.setState({comments});
  }

  componentDidMount() {
    if (localStorage.getItem('state')) {
      this.setState({...JSON.parse(localStorage.getItem('state'))})
    }
  }
  

 render() {
  
  return (
    <div>
      {
        this.state.comments.map((props, i) => {
          return (
            <div key={i} index={i} className="Comment">
              <UserInfo user={props.name} />
              <span className="Comment-date">
                {props.date}
              </span>
              <p className="Comment-text">
                {props.text}
              </p>
              <div 
              className="delete"
              onClick={e => this.deleteComment()}>
                <span></span>
                <span></span>
              </div>
            </div>
          )
        })
      }
      <label>Имя:</label>
      <input 
        name="name" 
        className="CommentForm-name" 
        onChange={e => {
          this.setState({newCommentName: e.target.value})
        }}
        />
        <label>Комментарий:</label>
        <textarea 
          name="comment" 
          className="CommentForm-text" 
          onChange={e => {
            this.setState({newCommentText: e.target.value})
          }}
          ></textarea>
        <button onClick={e => this.addComment()}>Добавить комментарий</button>
    </div>
  );
 }

}

const App = () => {
  return (
    <div>
      {/* <Comment
      date={comment.date} 
      text={comment.text}
      author={comment.author} 
      /> */}
      <CommentForm />
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};

ReactDOM.render(
  <App />,
  document.querySelector('.app')
);

