import React, { useState } from 'react';
import styled from 'styled-components';

export interface ModalProps {
    onClose?: any;
    title?: string;
    top?: Number;
    show?: Boolean;
    width?: String | 'small' | 'medium' | 'large';
}

const Modal: React.FC<ModalProps> = ({
    onClose,
    children,
    title,
    show = false,
    top = 100,
    width = 'small'
}) => {

    const [visible, SetVisible] = useState<Boolean>(show);

    const CloseModal = (event: any) => {
        if(onClose) onClose(event);
        // SetVisible(false);
    }

    const ClickOutside = (event: any) => {
        if(event.target.classList.contains("modal-wrapper"))
            CloseModal(event);
    }

    return (
        <>
            {show && <Wrapper onClick={ClickOutside} topPosition={top} className="modal-wrapper">
                <div className={`m-content ${width}`}>
                    <div className="m-header">
                        <h5 className="modal-title">{ title }</h5>
                        <button type="button" onClick={CloseModal} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="m-body">
                        { children }
                    </div>
                    <div className="m-footer"></div>
                </div>
            </Wrapper>}
        </>
    );
}

const Wrapper = styled.div<{ topPosition: any }>`
    &.modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: ${props => props.topPosition}px;
    }
    .m-content.small {
        min-width: 370px;
        max-width: 370px;
    }
    .m-content.medium {
        min-width: 450px;
        max-width: 450px;
    }
    .m-content.large {
        min-width: 550px;
        max-width: 550px;
    }
    .m-content {
        min-height: 10px;
        background-color: var(--white);
    }
    .m-header {
        min-height: 60px;
        background-color: var(--dark);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: var(--white);
        align-items: center;
        padding: 5px;
    }
    .modal-title {
        margin-left: 10px;
    }
    .m-header .close {
        color: white;
        height: 55px;
        width: 55px;
    }
    .m-body {
        padding: 10px;
    }
`;



export default Modal;