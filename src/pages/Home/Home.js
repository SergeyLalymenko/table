import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople } from '../../store/peopleSlice';
import TableRow from './TableRow/TableRow';
import AddPersonModal from '../../components/AddPersonModal/AddPersonModal';
import './Home.scss';

function Home() {
    const dispatch = useDispatch();
    const people = useSelector((state) => state.people.data);
    const [isModalOpened, setIsModalOpened] = useState(false);

    useEffect(() => {
        dispatch(fetchPeople());
    }, [dispatch]);

    function toggleModal() {
        setIsModalOpened(!isModalOpened);
    }

    return (
        <main className="home">
            {
                isModalOpened && <AddPersonModal toggleModal={toggleModal} />
            }

            <section className="home__table table wrapper">
                <button className="table__add" type="button" onClick={toggleModal}>
                    Add person
                </button>

                <div>
                    {
                        people && people.map((person) => <TableRow key={person.id} person={person} />)
                    }
                </div>
            </section>
        </main>
    );
}

export default Home;
