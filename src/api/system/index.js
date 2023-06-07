import { get, post } from '../../utils/http';
export const getAdminGoalWithGet = (data) => get('/api/goal/admin');
export const getAdminGoalWithPost = (data) => post('/api/goal/admin');
export const getDepartTree = (data) => get('/api/admin/depart/list/all');
