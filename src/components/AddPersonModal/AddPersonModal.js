import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { createPerson } from '../../store/peopleSlice';
import './AddPersonModal.scss';

function AddPersonModal({ toggleModal }) {
    const dispatch = useDispatch();

    function onModalClick(e) {
        if(e.target.classList.contains('modal')) {
            toggleModal();
        }
    }

    function getInitialValues() {
        const sessionData = sessionStorage.addPersonModalFields ? JSON.parse(sessionStorage.addPersonModalFields) : null;

        if(sessionData) {
            return  {
                name: sessionData.name,
                age: sessionData.age,
                description: sessionData.description,
            }
        }

        return {
            name: '',
            age: '',
            description: '',
        }
    }

    function getFieldStatus(error, touched) {
        return error && touched ? 'error' : '';
    }

    function onFormValidate(values) {
        sessionStorage.addPersonModalFields = JSON.stringify(values);

        const errors = {};

        if (!values.name) {
            errors.name = 'Required';
        }

        if (!values.age) {
            errors.age = 'Required';
        }

        if (isNaN(values.age) || values.age < 1 || values.age > 99) {
            errors.age = 'Must be number from 1 to 99';
        }

        if (!values.description) {
            errors.description = 'Required';
        }

        return errors;
    }

    function onFormSubmit(values) {
        dispatch(createPerson(values));

        toggleModal();
    }

    function renderForm() {
        return ({ errors, touched }) => (
            <Form className="form">
                <Field className={getFieldStatus(errors.name, touched.name)} type="text" name="name" placeholder="Name" />

                <Field className={getFieldStatus(errors.age, touched.age)} type="text" name="age" placeholder="Age" />

                <Field className={getFieldStatus(errors.description, touched.description)} type="text" name="description" placeholder="Description" />

                <div className="form__buttons">
                    <button className="form__save" type="submit">
                        Save
                    </button>

                    <button className="form__cancel" type="button" onClick={toggleModal}>
                        Cancel
                    </button>
                </div>
            </Form>
        );
    }

    return (
        <div className="modal" onClick={onModalClick}>
            <div className="modal__content">
                <Formik
                    initialValues={getInitialValues()}
                    validate={onFormValidate}
                    onSubmit={onFormSubmit}
                >
                    {renderForm()}
                </Formik>
            </div>
        </div>
    );
}

export default AddPersonModal;
