import React from 'react'

function InformationMovie(props) {
    const {title_movie,
        different_name,
        launch_date,
        age_limit,
        cast,
        directors,
        trailer} = props
    return (
        <div>
            title movie: {title_movie}
            different name:{different_name}
            launch date:{launch_date}
            age limit:{age_limit}
            cast:{cast}
            directors:{directors}
            trailer:{trailer}
        </div>
    )
}

export default InformationMovie
