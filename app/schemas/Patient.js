import deepmerge from 'deepmerge';

const Patient = {
    auth_id: '',
    email: '',
    firstname: '',
    middlename: '',
    lastname: '',
    photo: '',
    phone_number: '',
    date_of_birth: '',
    name: ``,
    Office: {
        id: '',
        name: '',
    },
    permissions: {
        notifications: false,
        notifications_token: '',
    },
    isEmailVerified: false,
};

export default function create(data) {
    Patient.created_at = new Date();
    Patient.updated_at = new Date();

    return deepmerge(Patient, data);
}