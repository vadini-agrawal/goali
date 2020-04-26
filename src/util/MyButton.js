import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import EditIcon from 'react-bootstrap-icons/dist/icons/pencil';
import Tooltip from 'react-bootstrap/Tooltip';

export default ({ children, tip, tipClassName}) => (
    <OverlayTrigger
        placement='bottom'
        overlay = {
                <Tooltip className={tipClassName} id='editImage'>
                    { tip }
                </Tooltip>
        }>
        { children }
    </OverlayTrigger>
);

