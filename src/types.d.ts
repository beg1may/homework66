export interface ApiMeal {
    calories: number;
    description: string;
    time: string;
}

export interface ApiMeals {
    [id: string]: ApiMeal;
}

export interface Meal extends ApiMeal {
    id: string;
}