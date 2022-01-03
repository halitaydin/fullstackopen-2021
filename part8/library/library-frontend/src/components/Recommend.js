import React, {useEffect, useState} from "react"
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_USERS, FILTER_GENRES } from '../queries'

const Recommend = (props) => {
    const users = useQuery(ALL_USERS)
    const [genre, {data}] = useLazyQuery(FILTER_GENRES, {fetchPolicy:'network-only'})
    const [filterGenre, setFilterGenre] = useState(null)

    useEffect(() => {
      if (data) {
        setFilterGenre(data.allBooks)
      }
    }, [data, setFilterGenre])

    useEffect(() => {
     if (users.data)
         genre({ variables: { genres: users.data.me.favoriteGenre } })
    }, [users.data, genre])


    if (!props.show) {
        return null
      }

        return (
          <div>
            <h2>recommendations</h2>
            <h2>books</h2>
            <p>in genre {users.data.me.favoriteGenre}</p>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>author</th>
                  <th>published</th>
                </tr>
                {filterGenre.map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
}

export default Recommend
