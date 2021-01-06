import { useState } from 'react'
import { connect } from "react-redux"
import { PLAYER_PAUSED_SET } from '../../state/actions/root'
import IconPlay from './play-outline.svg'
import IconPause from './pause-outline.svg'
import { playNpId, removeMedia } from '../../controllers/nowPlaying'
import { updateRichPresence, updateRichPresencePause } from '../../controllers/player'
import { Draggable } from 'react-beautiful-dnd'
import { Menu, MenuItem } from '@szhsin/react-menu'

function mapStateToProps(state){
    return { nowPlayingId: state.player.media.np_id, isPaused: state.player.isPaused }
}

function NowPlayingItem({ item, nowPlayingId, isPaused, index, dispatch }){
    const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false)
    
    const onPlayPause = () => {
        if(item.np_id == nowPlayingId){
            if(isPaused){
                dispatch(PLAYER_PAUSED_SET(false))
            } else {
                dispatch(PLAYER_PAUSED_SET(true))
            }
        } else {
            playNpId(item.np_id)
        }
    }
    
    const onRemove = () => {
        removeMedia(item.np_id)
    }

    return (
        <Draggable draggableId={item.np_id.toString()} index={index}>
            {(provided) => 
                <div ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps}  className={"mb-2 flex " + (item.np_id == nowPlayingId? " bg-gray-800" : "")}>
                    <button onClick={() => onPlayPause()} className="flex-shrink mr-3 focus:outline-none">
                        <img src={item.np_id == nowPlayingId && !isPaused? IconPause:IconPlay} style={{minHeight: 25, minWidth: 25}}></img>
                    </button>
                    <div className="flex flex-col flex-grow">
                        <p className="text-sm break-all">{item.custom_title || item.title}</p>
                        <p className="text-xs">{item.custom_artist || item.artist}</p>
                    </div>
                    <Menu onClose={e => {}} position="anchor" direction="left" className="bg-black border border-white border-dashed" menuButton={
                        <button className="flex-shrink ml-2 focus:outline-none">&nbsp;⋮&nbsp;</button>
                    }>
                        <MenuItem onClick={() => onRemove()}>Remove</MenuItem>
                    </Menu>
                </div>
            }
        </Draggable>
    )
}

export default connect(mapStateToProps)(NowPlayingItem)