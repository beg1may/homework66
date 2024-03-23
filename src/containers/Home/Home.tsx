import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ApiMeals, Meal} from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";
import {Link} from "react-router-dom";

const Home = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchMeals = useCallback(async () => {
        try {
            setIsFetching(true);

            const apiMealResponse = await axiosApi.get<ApiMeals | null>('/meals.json');
            const apiMeals = apiMealResponse.data;

            if (apiMeals) {
                setMeals(Object.keys(apiMeals).map(id => ({
                    ...apiMeals[id],
                    id,
                })));
            } else {
                setMeals([])
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetching(false);
        }
    }, []);

    useEffect(() => {
        void fetchMeals();
    }, [fetchMeals]);

    const removeMeal = async (id: string) => {
        try {
            if (window.confirm('Are you sure you want to delete the item?')) {
                await axiosApi.delete(`/meals/${id}.json`);
                void fetchMeals();
            }
        } catch (e) {
            console.error(e)
        }
    };

    const totalCalories = useMemo(() => meals.reduce((acc, meal)=> {
        return acc + meal.calories;
    }, 0), [meals])

    return (
        <div className="mt-2">
            <h4>Total Calories: {totalCalories}</h4>
            {
                isFetching ? (
                    <Spinner/>
                ) : meals.map((meal) => (
                    <div key={meal.id} className="card mt-2">
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <h6> {meal.time} </h6>
                                <p> {meal.description}</p>
                            </div>
                            <div className="d-flex flex-row">
                                <h6 className="me-5 mt-3">{meal.calories}kkal</h6>
                                <div className="mt-1">
                                    <Link
                                        to={ `/meals/${meal.id}/edit` }
                                        className="btn btn-outline-success me-2 my-sm-0"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => removeMeal(meal.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;