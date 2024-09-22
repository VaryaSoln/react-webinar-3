import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalPageLayout({ children, visible }) {
    console.log("ModalPageLayout");
  
    return (
        <div className={visible ? "ModalPageLayout": "ModalPageLayout ModalPageLayout_invisible"} >
            <div className="ModalPageLayout-center">{children}</div>
        </div>
    );
}

ModalPageLayout.propTypes = {
    children: PropTypes.node,
};

export default React.memo(ModalPageLayout);