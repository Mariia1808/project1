import UserPage from './pages/UserPage';
import { LOGIN_ROUTE, RECIPES_ROUTE, RECIPE_ROUTE, REGISTRATION_ROUTE, USER_ROUTE, CALORIES_ROUTE, MAIN_ROUTE, TYPE_ROUTE } from './utils/consts';
import RecipePage from './pages/RecipePage';
import Recipes from './pages/Recipes';
import Auth from './pages/Auth';
import Calories from './pages/Calories';
import Main from './pages/Main';
import Type from './pages/Type';

export const authRoutes = [
    
    {
        path:USER_ROUTE +'/:id',
        Component: UserPage
    }

    
]

export const publicRoutes = [
    {
        path:RECIPES_ROUTE,
        Component: Recipes
    },
    {
        path: TYPE_ROUTE + '/:id',
        Comment: Type
    },
    {
        path:MAIN_ROUTE,
        Component: Main
    },
    {
        path:CALORIES_ROUTE,
        Component: Calories
    },
    {
        path:RECIPE_ROUTE + '/:id',
        Component: RecipePage
    },{
        path:RECIPE_ROUTE + '/:id/:userId',
        Component: RecipePage
    },
    {
        path:REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path:LOGIN_ROUTE,
        Component: Auth
    }
]