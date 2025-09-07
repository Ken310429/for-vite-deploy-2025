import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
const ApiError = (error, defaultErrorMessage = "操作失敗") => {
  const message = error?.response?.data?.message || error.message || defaultErrorMessage;
  return message;
};
const ApiResponse = (response) => {
  return response?.data || null;
}

export const signupAPI = async (signupField) => {
  try {
    const res = await api.post(`users/sign_up`, signupField);
    return ApiResponse(res);
  }
  catch (error) {
    ApiError(error, "註冊失敗");
  }
}

export const signinAPI = async (signInField) => {
  try {
    const res = await api.post(`users/sign_in`, signInField);
    ApiResponse(res);
  }
  catch (error) {
    return ApiError(error, "登入失敗");
  }
}
export const getTodoAPI = async (token) => {
  try {
    const res = await api.get(`todos/`, {
      headers: {
        Authorization: token,
      }
    })
    return ApiResponse(res);
  }
  catch (error) {
    ApiError(error, "取得待辦清單失敗");
  }
}
export const addTodoAPI = async (newTodo, token) => {
  try {
    const res = await api.post(`todos/`, {
      content: newTodo,
    }, {
      headers: {
        Authorization: token,
      }
    })
    return ApiResponse(res);
  } catch (error) {
    ApiError(error, "新增待辦清單失敗");
  }
}
export const deleteTodoAPI = async (token, id) => {
  try {
    const res = await api.delete(`todos/${id}`, {
      headers: {
        Authorization: token,
      }
    })
    return ApiResponse(res);
  } catch (error) {
    ApiError(error, "刪除待辦清單失敗");
  }
}
export const editTodoAPI = async (token, editTodo) => {
  try {
    const res = await api.put(`todos/${editTodo.id}`,
      {
        content: editTodo.content,
      }, {
      headers: {
        Authorization: token,
      }
    })
    return ApiResponse(res);
  } catch (error) {
    ApiError(error, "編輯待辦清單失敗");
  }
}

export const changeToggleAPI = async (id, token) => {
  try {
    const res = await api.patch(`todos/${id}/toggle`,
      {}, {
      headers: {
        Authorization: token,
      }
    })
    return ApiResponse(res);
  } catch (error) {
    ApiError(error, "切換待辦清單失敗");
  }
}
export const checkoutAPI = async (token) => {
  try {
    const res = await api.get(`users/checkout`, {
      headers: {
        Authorization: token,
      }
    })
    return ApiResponse(res);
  } catch (error) {
    ApiError(error, "取得使用者資料失敗");
  }
}
