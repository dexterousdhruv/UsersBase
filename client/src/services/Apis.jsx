import { commonRequest } from "./ApiCall";
import { BASE_URL } from "./helper";

export const registerUser = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/user/register`, data, header )
}

export const getAllUsers = async (search, gender, status, sort, page) => {
  return await commonRequest("GET", `${BASE_URL}/users/all?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, "" )
}

export const getUserProfile = async (id) => {
  return await commonRequest("GET", `${BASE_URL}/user/${id}`, "" )
}

export const updateUser = async (id, data, header) => {
  return await commonRequest("PUT", `${BASE_URL}/user/edit/${id}`, data, header )
}

export const deleteGivenUser = async (id) => {
  return await commonRequest("DELETE", `${BASE_URL}/user/delete/${id}`, "" )
}

export const setUserStatus = async (id, status) => {
  status = { status } // Change string to json
  return await commonRequest("PATCH", `${BASE_URL}/user/status/${id}?`, status )

}

export const exportToCsv = async () => {
  return await commonRequest("GET", `${BASE_URL}/users/export`, '')
}