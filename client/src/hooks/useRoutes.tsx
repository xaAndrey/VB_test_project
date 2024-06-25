import {Route, Routes} from 'react-router-dom'
import { routes } from '../util/constants';
import { ListComments } from '../pages/list_comment/ListComments';
import { Comment } from '../pages/comment/Comment';

function useRoutes() {
    return (
        <Routes>
            <Route path={routes.main} element={<ListComments />} />
            <Route path={routes.comment} element={<Comment />}/>
        </Routes>
    );
}

export default useRoutes;