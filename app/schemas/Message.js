import deepmerge from 'deepmerge';

const Message = {
    body: {
        type: 'text',
        content: '',
    },
    recipient: '',
    author: { 
        id: '', 
        name: '',
    },
    read_at: null,
};

export default function create(data) {
    Message.created_at = new Date();
    Message.updated_at = new Date();

    return deepmerge(Message, data);
}