const Placeholder = ({ id, data }) => {
  return (
    <div 
      id={id} 
      className="component component--placeholder"
    > 
      Empty { data.text } 
    </div>
  )
}

export default Placeholder;