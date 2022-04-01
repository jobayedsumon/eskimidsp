import React, {useState} from 'react';

const CreateCampaign = ({editMode}) => {
    const [formState, setFormState] = useState({});

    const onChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formState);
    };
    return (
        <div style={{height: 500, width: '60%'}} className="m-auto mt-5">
            <h1>Create New Campaign</h1>
            <div>

            </div>
        </div>

    );
}

export default CreateCampaign;
