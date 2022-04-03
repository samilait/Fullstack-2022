const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h1>{props.header}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.name} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map (
          part => <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    
    const total = parts.reduce( (s, p) => {
      return s + p.exercises
    }, 0)
  
    return (
      <div>
        <p><b>Number of exercises {total}</b></p>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header header={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course
  