import {Route, Routes} from 'react-router-dom'
import { routes } from '../util/constants';
import { ListComments } from '../pages/list_comment/ListComments';

function useRoutes() {
    return (
        <Routes>
            <Route path={routes.main} element={<ListComments />} />
        </Routes>
    );
}

export default useRoutes;