import { useState } from 'react'
import { connect } from 'react-redux'
import Button from '../Base/Button'
import AddFromYoutubeModal from "./AddFromYoutubeModal"
import LibraryItem from "./LibraryItem"

function mapStateToProps(state) {
    return { library: state.library }
}

function Library({ library }) {
    const [addModalOpen, setAddModalOpen] = useState(false)

    return (
        <div className="my-4 mx-6">
            <AddFromYoutubeModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)}></AddFromYoutubeModal>
            <div className="flex border-b-2 py-1 border-white">
                <h3 className="px-3 font-semibold flex-grow">Library</h3>
                <Button onClick={() => {setAddModalOpen(true)}}><b>+</b></Button>
            </div>
            <ul style={{maxHeight: 300, overflowY: 'scroll'}} className="px-3 py-3">
                {library.map(x => 
                    <li key={x.id}>
                        <LibraryItem item={x}></LibraryItem>
                    </li>)}
            </ul>
        </div>
    )
}

export default connect(mapStateToProps)(Library)