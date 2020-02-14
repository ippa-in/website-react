export const ADD_CAROUSEL_DATA = 'ADD_CAROUSEL_DATA';
export const GET_CAROUSEL_DATA = 'GET_CAROUSEL_DATA';
export const UPDATE_CAROUSEL_DATA = 'UPDATE_CAROUSEL_DATA';
export const DELETE_SWAP_CAROUSEL_DATA = 'DELETE_SWAP_CAROUSEL_DATA';
export const GET_NAVIGATION_DATA = 'GET_NAVIGATION_DATA';
export const SET_NAVIGATION_DATA = 'SET_NAVIGATION_DATA';
export const GET_CONTAINER_DATA = 'GET_CONTAINER_DATA';
export const SET_CONTAINER_DATA = 'SET_CONTAINER_DATA';
export const GET_FILTER_DATA = 'GET_FILTER_DATA';
export const SET_FILTER_DATA = 'SET_FILTER_DATA';
export const GET_POINTS = 'GET_POINTS';
export const SET_POINTS = 'SET_POINTS';
export const SUBMIT_POINTS = 'SUBMIT_POINTS';
export const PREVIEW_POINTS = 'PREVIEW_POINTS';
export const SET_PREVIEW_POINTS = 'SET_PREVIEW_POINTS';

export const addCarouselData = (payload) => ({ type: ADD_CAROUSEL_DATA, payload });

export const getCarouselData = () => ({ type: GET_CAROUSEL_DATA });

export const updateCarouselData = (payload) => ({ type: UPDATE_CAROUSEL_DATA, payload });

export const deleteSwapCarouselData = (payload) => ({ type: DELETE_SWAP_CAROUSEL_DATA, payload });

export const getNavigationBarData = () => ({ type: GET_NAVIGATION_DATA });

export const setNavigationBarData = (payload) => ({ type: SET_NAVIGATION_DATA, payload });

export const getContainerData = (payload) => ({ type: GET_CONTAINER_DATA, payload });

export const setContainerData = (payload) => ({ type: SET_CONTAINER_DATA, payload });

export const getFilterData = (payload) => ({ type: GET_FILTER_DATA, payload });

export const setFilterData = (payload) => ({ type: SET_FILTER_DATA, payload });

export const getPoints = (payload) => ({ type: GET_POINTS, payload });

export const setPoints = (payload) => ({ type: SET_POINTS, payload });

export const submitPoints = (payload) => ({ type: SUBMIT_POINTS, payload });

export const previewPoints = (payload) => ({ type: PREVIEW_POINTS, payload });

export const setPreviewPoints = (payload) => ({ type: SET_PREVIEW_POINTS, payload });