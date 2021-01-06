import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import NowPlayingItem from './NowPlayingItem'
import Button from '../Base/Button'
import { NOWPLAYING_REPEAT_SET, NOWPLAYING_LIST_SET, NOWPLAYING_INDEX_SET } from '../../state/actions/root'

function mapStateToProps(state) {
    return { nowPlaying: state.nowPlaying, nowPlayingId: state.player.media.np_id }
}

function NowPlaying({ nowPlaying, nowPlayingId, dispatch }) {
    const onDragEnd = (res) => {
        const { destination, source, draggableId } = res
        if(!destination){
            return
        }
        if(destination.droppableId == source.droppableId && destination.index == source.index){
            return
        }

        const newNPList = Array.from(nowPlaying.list)
        newNPList.splice(source.index, 1)
        newNPList.splice(destination.index, 0, nowPlaying.list[source.index])
        dispatch(NOWPLAYING_LIST_SET(newNPList))
        dispatch(NOWPLAYING_INDEX_SET(newNPList.findIndex(x => x.np_id == nowPlayingId)))
    }

    return (
        <DragDropContext 
            onDragEnd={(r) => onDragEnd(r)}
        >
            <div className="my-4 mx-6">
                <div className="flex border-b-2 py-1 border-white">
                    <h3  className="px-3 font-semibold flex-grow">Now Playing</h3>
                    <Button onClick={() => {dispatch(NOWPLAYING_REPEAT_SET(!nowPlaying.repeat))}} className={nowPlaying.repeat? "bg-gray-400":""}><b>&#x1F501;</b></Button>
                </div>
                <Droppable droppableId="aye">
                    {(provided) => 
                        <div ref={provided.innerRef} {...provided.droppableProps} style={{maxHeight: 150, overflowY: 'auto'}} className="flex flex-col px-3 py-3">
                            {nowPlaying.list.map((x, i) => 
                                <div key={x.np_id} className="w-full">
                                    <NowPlayingItem item={x} index={i}></NowPlayingItem>
                                </div>)}
                            {provided.placeholder}
                        </div>
                    }
                </Droppable>
            </div>
        </DragDropContext>
    )
}

export default connect(mapStateToProps, null)(NowPlaying)