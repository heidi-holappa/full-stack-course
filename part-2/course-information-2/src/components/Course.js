const Course = (props) => {
    const { course } = props
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
            <Total parts={course.parts} />
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.exercises
    }, 0)
    return (
        <p><strong>Total of {total} exercises</strong></p>
    )
}

export default Course