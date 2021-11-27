import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUserFavorites, createFavorites, deleteFavorites, getOneFavorite } from "../../store/favorite"

function Favorites() {
    const dispatch = useDispatch();

    const venue = useSelector(state => state?.venue.current)
    const sessionUser = useSelector(state => state.session.user)
    const userFavorites = sessionUser ? Object.values(sessionUser?.favorites) : null
    const faveFind = userFavorites?.find(favorite => favorite?.venue_id === venue.id)

    const [liked, setLiked] = useState({ id: null })

    useEffect(() => {
        dispatch(getAllUserFavorites(sessionUser.id))
    }, [dispatch, sessionUser.id])

    useEffect(() => {
        if (faveFind)
            setLiked({ id: faveFind.id })
    }, [faveFind])


    async function handleFav() {
        if (liked.id) {
            await dispatch(deleteFavorites(liked.id))
            setLiked({ id: null })
        } else {
            let res = await dispatch(createFavorites({ userId: sessionUser.id, venueId: venue.id }))
            setLiked({ id: res.favorite.id })
        }
    }


    return (
        <div className='reservation-favorites'>

            <span className='fav-title'>
                {liked.id ? <>Like</>
                    : <>Unliked!</>
                }
            </span>

            <button
                type='button'
                onClick={() => handleFav()}
                id={liked.id ? 'button-unfave' : 'button-addfave'}
            >
                <i className="fas fa-heart" />
            </button >
        </div >
    )
}

export default Favorites
