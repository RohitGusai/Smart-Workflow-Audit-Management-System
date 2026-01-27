import api from "./api";

export const createRequest = async (title,description) =>
{
    const response = await api.post("/user/add",{title,description});
    return response.data;
}

export const approveRequest = async (id,comment) =>
{
    const response = await api.post(`/manager/approve/${id}?comment=${comment}`);
    console.log("Your are the first",response);
    console.log("Your are the second",response.data)
    return response.data;
}

export const managerData = async () =>
{
    const response = await api.get(`/manager/get-workflow`);
    return response.data;
}

export const rejectRequest = async (workflowId,comment) =>
{
    const response = await api.post(`/manager/reject/${workflowId}?comment=${comment}`);
    return response.data;
}

export const getAllRequests = async (workflowId) =>
{
    const response = await api.get(`/check-status/${workflowId}`)
    return response.data;
}


export const getRequestById = async (workflowId) =>
{
    const response = await api.get(`/get-data/${workflowId}`);
    return response.data;
}

export const getRequestAll = async () =>
{
    const response = await api.get("/user/workflow");
    return response.data;
}

export const getUserData = async () =>
{
    const response = await api.get(`/admin/get-all-users`);
    return response.data;
}

export const updateUser = async (id,updatedata) =>
{
    const response = await api.put(`/admin/update/${id}`,updatedata)
    return response;
}

export const getUserById = async (id) =>
{
    const response = await api.get(`/admin/get-user/${id}`)
    return response.data;
}

export const deleteUserById = async (id) =>
{
    const response = await api.delete(`/admin/delete/${id}`)
    return response.data;
}