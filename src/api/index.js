import {fetchPost, fetchGet } from '../axiosConfig/index'

let url = '';
if (process.env.NODE_ENV == 'production') {
  url = window.location.host;
} else if (process.env.NODE_ENV == 'development') {
  url = '/api'
}

export const uploadInfoApi = ""
export const uploadUrl = ""
