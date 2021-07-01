import { Modal, Form, Input } from 'antd';

const ChatModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    // const onCheck = async () =>{
    //     try {
    //         const values = await form.validateFields();
    //         form.resetFields();
    //         onCreate(values);
    //     } catch (error) {
    //         window.alert(error);
    //     }
    // }
    return (
        <Modal
            visible={visible}
            title='Create a new chat room'
            okText='Create'
            cancelText='Cancel'
            onCancel={onCancel}
            onOk={() => {
                form.validateFields().then((values) => {
                    
                    form.resetFields();
                    onCreate(values);
                    console.log('can use validate')
                }).catch((e) => { window.alert(e) });
            }}
        >
            <Form form={form} layout='vertical' name='form_in_modal'>
                <Form.Item name='name' label='Name' rules={[{required: true,message:'Error: Please enter the name of the person to chat!'},]}>
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>);
};



export default ChatModal;