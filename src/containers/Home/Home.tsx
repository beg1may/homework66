import React, {useCallback, useEffect, useState} from 'react';
import {ApiMeals, Meal} from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

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

    console.log(meals);

    return (
        <div className="mt-2">
            <h4>Total Calories:</h4>
            {
                isFetching ? (
                    <Spinner/>
                ) : meals.map((meal) => (
                    <div key={meal.id} className="card mt-2">
                        <div className="card-body">
                            <p> {meal.time} </p>
                            <p> {meal.description} </p>
                            <p>
                                <button
                                    className="btn btn-warning me-2"
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;