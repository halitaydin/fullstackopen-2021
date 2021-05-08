import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>
const Static = ({clicks, text, sign}) => {
  return (
<table>
  <tbody>
    <tr>
      <td>{text}:</td>
      <td>{clicks}</td>
      <td>{sign}</td>
    </tr>
  </tbody>
</table>
  )
}

const Statistics = ({clicks, sum, ratio}) => {
if(sum === 0) {
  return <p>No feedback given</p>
}
return (
<div>
  <Static clicks={clicks.good} text='Good'/>
  <Static clicks={clicks.neutral} text='Neutral'/>
  <Static clicks={clicks.bad} text='Bad'/>
  <Static clicks={sum} text='All'/>
  <Static clicks={ratio / sum} text='Avarage'/>
  <Static clicks={clicks.good * 100 / sum} text='Positive' sign='%'/>
</div>
)
}

const App = () => {
  // save clicks of each button to its own state
  const [clicks, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0,
  })

  const handleGoodClick = () => setFeedback({...clicks, good: clicks.good + 1 });
  const handleNeutralClick = () => setFeedback({...clicks, neutral: clicks.neutral + 1 });
  const handleBadClick = () => setFeedback({...clicks, bad: clicks.bad + 1 });

  return (
    <div>
      <h3>{'Give feedback'}</h3>
      <Button handleClick={handleGoodClick} text='Good'/>
      <Button handleClick={handleNeutralClick} text='Neutral'/>
      <Button handleClick={handleBadClick} text='Bad'/>
      <h3>{'Statistics'}</h3>
      <Statistics
      clicks={clicks}
      sum={clicks.good + clicks.neutral + clicks.bad}
      ratio={(clicks.good * 1) + (clicks.neutral * 0) + (clicks.bad * -1)}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
