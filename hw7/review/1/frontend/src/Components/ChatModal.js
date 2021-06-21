import { Modal, Form, Input } from "antd";
import displayStatus from "../hooks/useDisplayStatus";

const ChatModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Create a new chat room"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((e) => { 
                    console.log(e);
                    // displayStatus({
                    //     type: "error",
                    //     msg: " Please enter the name of the person to chat!",
                    // }); 
                });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{
                        required: true,
                        message: "Error: Please enter the name of the person to chat!",
                    },]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ChatModal;
