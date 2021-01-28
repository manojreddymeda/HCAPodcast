import React, { useState, useEffect } from 'react';
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    InputGroupButtonDropdown,
    Input,
} from 'reactstrap';

import { listPlaylistForTheChannel } from '../../services/ytapi.service'

const defaultFilter = "COVID-19 Vaccine Podcast Series" //"A Physician's Lens" 


const SearchBar = (props) => {
    const { filter, onFilter, search = '', onSearch } = props

    const [playlist, setPlayList] = useState([]);
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
        const fetchList = async () => {
            try {
                const list = await listPlaylistForTheChannel()
                setPlayList(list.items)
                onFilter(list.items.filter(i => i.snippet.title === defaultFilter)[0] || list.items[0])
            }
            catch (e) {
                setFetchError(true)
            }
        }
        fetchList()
    }, [onFilter])

    const [isOpen, setIsOpen] = useState(false);

    if (fetchError) {
        return <div className='text-light'>Unable to fetch playlist</div>
    }

    return (

        <InputGroup>
            {(playlist.length > 0 && filter) &&
                <InputGroupButtonDropdown addonType="prepend" isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                    <DropdownToggle caret color="primary">
                        {filter.snippet.title}
                    </DropdownToggle>
                    <DropdownMenu>
                        {playlist.map(opt => (
                            <DropdownItem key={opt.id} onClick={() => onFilter(opt)}>{opt.snippet.title}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </InputGroupButtonDropdown>
            }
            <Input placeholder="Search videos" value={search} onChange={(e) => onSearch(e.target.value)} style={{ width: '60%' }} />
        </InputGroup>

    );
}

export default SearchBar;
