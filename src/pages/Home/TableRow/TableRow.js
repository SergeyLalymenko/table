import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { deletePerson, updatePerson } from '../../../store/peopleSlice';
import './TableRow.scss';

function TableRow({ person }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    function getInitialValues() {
        const sessionData = sessionStorage.tableFields ? JSON.parse(sessionStorage.tableFields)[person.id] : null;

        if(sessionData) {
            return {
                name: sessionData.name,
                age: sessionData.age,
                description: sessionData.description,
            }
        }
        
        return {
            name: person.name,
            age: person.age,
            description: person.description,
        }
    }

    function getFieldStatus(error) {
        return error ? 'error' : '';
    }

    function setSessionData(fields) {
        if(!sessionStorage.tableFields) {
            sessionStorage.tableFields = JSON.stringify({
                [person.id]: fields,
            });
        } else {
            const parsedFields = JSON.parse(sessionStorage.tableFields);

            sessionStorage.tableFields = JSON.stringify({
                ...parsedFields,
                [person.id]: fields,
            });
        }
    }

    function onDeleteBtnClick() {
        dispatch(deletePerson(person.id));
    }

    function onFormValidate(values) {
        setSessionData(values);

        const errors = {};

        if (!values.name) {
            errors.name = 'Required';
        }

        if (!values.age) {
            errors.age = 'Required';
        } else if (isNaN(values.age) || values.age < 1 || values.age > 99) {
            errors.age = 'Must be number from 1 to 99';
        }

        if (!values.description) {
            errors.description = 'Required';
        }

        return errors;
    }

    function onFormSubmit(values) {
        if(isEditing) {
            dispatch(updatePerson({
                id: person.id,
                newPerson: values,
            })).then((action) => {
                if(action.meta.requestStatus === 'fulfilled') {
                    setIsEditing(!isEditing);
                }
            });
        } else {
            setIsEditing(!isEditing);
        }
    }

    function renderForm() {
        return ({ errors }) => (
            <Form className="row">
                <div className="row__cell">
                    <Field className={getFieldStatus(errors.name)} type="text" name="name" readOnly={!isEditing} />
                </div>

                <div className="row__cell">
                    <Field className={getFieldStatus(errors.age)} type="text" name="age" readOnly={!isEditing} />
                </div>

                <div className="row__cell">
                    <Field className={getFieldStatus(errors.description)} type="text" name="description" readOnly={!isEditing} />
                </div>

                <div className="row__buttons">
                    <button className={`row__edit ${isEditing ? 'editing' : ''}`} type="submit">
                        {
                            isEditing ? 'Save' : 'Edit'
                        }
                    </button>

                    <button className="row__delete" type="button" onClick={onDeleteBtnClick}>
                        Delete
                    </button>
                </div>
            </Form>
        );
    }

    return (
        <Formik
            initialValues={getInitialValues()}
            validate={onFormValidate}
            onSubmit={onFormSubmit}
        >
            {renderForm()}
        </Formik>
    );
}

export default TableRow;
