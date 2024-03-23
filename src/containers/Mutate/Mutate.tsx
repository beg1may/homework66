import React, {useState} from 'react';
import axiosApi from "../../axiosApi";

const Mutate = () => {
    const [meal, setMeal] = useState({
        time: '',
        calories: '',
        description: '',
    });


    const changeMeal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        setMeal(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const apiMeal = {
                ...meal,
                calories: Number(meal.calories),
            }

            await axiosApi.post('/meals.json', apiMeal)
        } catch (e) {
            console.error(e)
        } finally {
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h4 className="mt-3">Add / Edit</h4>
                <div className="form-group">
                    <label htmlFor="time">Select Calories</label>
                    <select
                        name="time"
                        id="time"
                        className="form-select"
                        value={meal.time}
                        required
                        onChange={changeMeal}
                    >
                        <option value="">Select a time</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="snack">Snack</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>

                    <div className="form-group">
                        <label htmlFor="description">Meal Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            className="form-control"
                            value={meal.description}
                            onChange={changeMeal}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="calories">Calories</label>
                        <input
                            type="number"
                            name="calories"
                            id="calories"
                            className="form-control"
                            value={meal.calories}
                            onChange={changeMeal}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Mutate;