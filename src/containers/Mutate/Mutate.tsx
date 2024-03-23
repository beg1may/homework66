import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {useNavigate, useParams} from "react-router-dom";
import {ApiMeal} from "../../types";
import Spinner from "../../components/Spinner/Spinner";

const Mutate = () => {
    const navigator = useNavigate();
    const {id} = useParams();
    const [meal, setMeal] = useState({
        time: '',
        calories: '',
        description: '',
    });

    const [isFetching, setIsFetching] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);


    const changeMeal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        setMeal(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const fetchMeal = useCallback(async () => {
        try {
            setIsFetching(true);

            const response = await axiosApi.get<ApiMeal | null>(`/meals/${id}.json`);
            const meal = response.data;

            if (meal) {
                setMeal({
                    ...meal,
                    calories: meal.calories.toString(),
                })
            } else {
                setIsNotFound(true)
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetching(false);
        }
    }, [])

    useEffect(() => {
        if (id) {
            void fetchMeal();
        }
    }, [id, fetchMeal]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const apiMeal = {
                ...meal,
                calories: Number(meal.calories),
            }

            if (id) {
                await axiosApi.put(`/meals/${id}.json`, apiMeal);
            } else {
                await axiosApi.post('/meals.json', apiMeal);
                navigator('/');
            }

        } catch (e) {
            console.error(e)
        }
    }

    if (isNotFound) {
        return <Navigator to={"/not-found"}/>
    }

    return (
        <div className="col-5 mt-2">
            <h4 className="mt-3">{id ? 'Edit' : 'Add new Calories'}</h4>
            {
                isFetching ? <Spinner/> : (
                    <form onSubmit={onSubmit}>
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
                                {id ? 'Edit' : 'Create'}
                            </button>
                        </div>
                    </form>
                )
            }
        </div>
    );
};

export default Mutate;