import React from 'react'

function BookTicketbyMovie(props) {
    const id = props.match.params.id
    return (
        <div>
            BookTicketbyMovie {id}
        </div>
    )
}

export default BookTicketbyMovie
