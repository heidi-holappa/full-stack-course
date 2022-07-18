import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  const average = ((good - bad) / total).toFixed(2)
  const positive = (good / total * 100).toFixed(2)
  if (good + neutral + bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } 
  return (
    <div>
      <table>
        <tbody>
          <tr><StatisticLine text='good' value={good}/></tr>
          <tr><StatisticLine text='neutral' value={neutral}/></tr>
          <tr><StatisticLine text='bad' value={bad}/></tr>
          <tr><StatisticLine text='total' value={total}/></tr>
          <tr><StatisticLine text='average' value={average}/></tr>
          <tr><StatisticLine text='positive' value={positive}/></tr>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  const { text, value } = props
  if (text === 'positive' ) {
    return (
      <>
        <td>{text}</td>
        <td>{value} %</td>
      </>
    )
  }
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App