import api from "./api";


export const login = async (email,password)=>
{
    const response = await api.post("/auth/login",{email,password});
    if(response.data.token)
    {
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);

    }
    return response.data;
};

export const logout = ()=>
{
    localStorage.clear();
    window.location.href = "/login";
}