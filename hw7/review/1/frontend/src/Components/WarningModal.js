import { Modal } from "antd";

const WarningModal = ({ visible, onOk, onCancel }) => {
    return (
        <Modal
            visible={visible}
            title="Warning"
            okText="OK"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={onOk}
        >
            <p>
                This is a helper for development, it will delete all messages in the database for testing.
            </p>
            <p>
                Are you sure to clear all messages?
            </p>
        </Modal>
    );
};

export default WarningModal;
