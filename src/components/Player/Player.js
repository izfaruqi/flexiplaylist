import { useEffect, useRef } from 'react'
import { connect } from "react-redux"
import path from 'path'
import { PLAYER_VOLUME_SET } from '../../state/actions/root'
import { playerHasReachedEnd, playerHasSeeked, playerHasStopped, playerCurrentTimeUpdated, playerHasPlayed, playerHasPaused, removeCurrentMedia, playerCurrentDurationUpdated } from '../../controllers/player'
import Button from '../Base/Button'
import { removeMedia as removeMediaFromNowPlaying } from '../../controllers/nowPlaying'

function mapStateToProps(state){
    return { player: state.player }
}

function Player({ player, dispatch }){
    const playerElm = useRef()
    const media_url = player.media.media_url && path.join(window.appPath, player.media.media_url)

    useEffect(() => {
        playerElm.current.ontimeupdate = (e) => {
            playerCurrentTimeUpdated(playerElm.current.currentTime)
        }

        playerElm.current.onended = (e) => {
            playerHasReachedEnd()
        }

        playerElm.current.onseeked = (e) => {
            playerHasSeeked()
        }

        playerElm.current.onpause = (e) => {
            playerHasPaused()
        }
        
    }, [])

    useEffect(() => {
        playerElm.current.load()

        if(player.media.media_url == null){
            playerHasStopped()
        } else {
            playerCurrentTimeUpdated(0)
            playerCurrentDurationUpdated(playerElm.current.duration)
            playerHasPlayed()
        }
    }, [player.media])

    useEffect(() => {
        playerElm.current.volume = player.volume
    }, [player.volume])

    useEffect(() => {
        if(player.isPaused){
            playerElm.current.pause()
        } else {
            playerElm.current.play()
            if(player.media.media_url != null){
                playerHasPlayed()

            }
        }
    }, [player.isPaused])

    const removeMedia = () => {
        removeCurrentMedia()
        removeMediaFromNowPlaying(player.media.np_id)
    }

    return (
        <div className="pb-2 px-4 pt-6">
            <div className="flex justify-between items-baseline">
                <h2 className="mx-6 mb-2 font-bold">Now Playing</h2>
                {player.media.id != null && <Button className="bg-red-600 text-white" onClick={() => removeMedia()}>⏏</Button>}
            </div>
            <h3 className="mx-6">{ player.media.custom_title || player.media.title || ""}</h3>
            <h4 className="mx-6">{ player.media.custom_artist || player.media.artist || ""}</h4>
            <audio ref={playerElm} className="mt-6 mb-2 px-6 w-full" src={media_url} autoPlay controls onVolumeChange={(e) => dispatch(PLAYER_VOLUME_SET(e.target.volume))}></audio>
        </div>
    )
}

export default connect(mapStateToProps, null)(Player)