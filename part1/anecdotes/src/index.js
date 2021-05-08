import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVoted] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0));
  const [mostVoted, setMostVoted] = useState(selected);

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }
  const handleVoteClick = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVoted(copy);
    if(vote[selected] >= vote[mostVoted]) {
      setMostVoted(selected);
    }
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>{vote[selected]}</p>
      <h3>Anecdote with most votes : {vote[mostVoted]}</h3>
      <p>{anecdotes[mostVoted]}</p>
      <Button handleClick={handleVoteClick} text='vote'/>
      <Button handleClick={handleNextClick} text='next anecdote'/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
