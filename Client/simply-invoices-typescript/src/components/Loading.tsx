import React from 'react'
import '../styles/loading.scss'

const Loading: React.FC = (): JSX.Element => {
  return (
    <div className="loading-component-div">
      <div className="loading-animation"></div>
      <h3>Loading...</h3>
    </div>
  )
}

export default Loading
