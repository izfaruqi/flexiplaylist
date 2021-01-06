import { useEffect, useRef, useState } from 'react'
import { ControlledMenu, Menu, MenuItem, SubMenu } from '@szhsin/react-menu'
import { connect } from 'react-redux'

import { deleteMedia, modifyCustomNamesMedia, loadAllMediaFromDB } from '../../controllers/library'
import Modal from '../Base/Modal'
import Button from '../Base/Button'
import { addMedia } from '../../controllers/nowPlaying'


function mapStateToProps(state){
    return { player: state.player }
}

function LibraryItem({ item, player, dispatch }){
    const menuAnchorRef = useRef()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDeleteClicked, setIsDeleteClicked] = useState(false)
    const deleteClickedStyle = "text-red-400"
    const deleteNotClickedStyle = "text-yellow-200"

    const [isCustomNameModalOpen, setIsCustomNameModalOpen] = useState(false)
    const [customNameModalTitle, setCustomNameModalTitle] = useState(item.custom_title)
    const [customNameModalArtist, setCustomNameModalArtist] = useState(item.custom_artist)


    const onMenuClose = (e) => {
        if(e.reason != "click"){
            setIsMenuOpen(false)
            setIsDeleteClicked(false)
        }
    }

    const onDeleteClicked = () => {
        if(isDeleteClicked){
            deleteMedia(item)
        } else {
            setIsDeleteClicked(true)
        }
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
        setIsDeleteClicked(false)
    }

    const onCustomNameModalSave = () => {
        modifyCustomNamesMedia(item.id, { title: customNameModalTitle, artist: customNameModalArtist })
        loadAllMediaFromDB()
        setIsCustomNameModalOpen(false)
    }
    
    return (
        <div className="mb-2 flex">

            <button onClick={() => addMedia(item)} className="flex-shrink mr-3 focus:outline-none" style={{minHeight: 25, minWidth: 25}}>
                +
            </button>
            
            <div className="flex flex-col flex-grow">
                <p className="text-sm break-all">{item.custom_title || item.title}</p>
                <p className="text-xs">{item.custom_artist || item.artist}</p>
            </div>

            <button ref={menuAnchorRef} onClick={() => setIsMenuOpen(true)} className="flex-shrink ml-2 focus:outline-none">&nbsp;⋮&nbsp;</button>
            <ControlledMenu anchorRef={menuAnchorRef} isOpen={isMenuOpen} onClose={e => onMenuClose(e)} position="anchor" direction="left" className="bg-black border border-white border-dashed">
                <MenuItem onClick={() => { setIsCustomNameModalOpen(true); closeMenu() }}>Custom names</MenuItem>
                <MenuItem onClick={() => onDeleteClicked()}><p className={isDeleteClicked? deleteClickedStyle : deleteNotClickedStyle}>Delete</p></MenuItem>
            </ControlledMenu>

            <Modal isOpen={isCustomNameModalOpen} onClose={() => setIsCustomNameModalOpen(false)}>
                <h4 className="mb-4">Set Custom Names</h4>
                <div className="flex flex-col flex-content-start h-full space-y-4">
                    <input value={customNameModalTitle} onChange={(e) => setCustomNameModalTitle(e.target.value)} className="bg-black font-mono border border-white p-1 px-2 w-full focus:outline-none" placeholder={item.title}></input>
                    <input value={customNameModalArtist} onChange={(e) => setCustomNameModalArtist(e.target.value)} className="bg-black font-mono border border-white p-1 px-2 w-full focus:outline-none" placeholder={item.artist}></input>
                    <div className="flex flex-row-reverse mt-2"><Button onClick={() => onCustomNameModalSave()}>Save</Button></div>
                </div>
            </Modal>
        </div>
    )
}

export default connect(mapStateToProps, null)(LibraryItem)