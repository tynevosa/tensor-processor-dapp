import axios from "axios";

export const setAuthorization = (token:string) => {
    axios.defaults.headers.Authorization = token
}

export const createWorkflow = async (param: any) => {
    const res = await axios.post(`/api/workflow/create`, param);
    return res;
}

export const createPrompt = async(param:any) => {
    const res = await axios.post(`/api/prompt/create`, param)
}

export const getPromptList = async () => {
    const res = await axios.get(`/api/prompt/list`)
    return res
}

export const getPrompt = async (id:any) => {
    const res = await axios.get(`/api/prompt/${id}`)
    return res
}

export const  getWorkflow = async (productId: any) => {
    const res = await axios.get(`/api/workflow/${productId}`)
    return res
}

export const  getWorkflowList = async () => {
    const res = await axios.get(`/api/workflow/list`)
    return res
}

export const publicWorkFlow = async (data:any, id:any) => {
    const res = await axios.put(`/api/workflow/publish/${id}`, data)
    return res
}

 export const deleteWorkflow = async (workflow_id: number) => {
    const res = await axios.delete(`/api/workflow/delete/${workflow_id}`)
    return res
}

export const  publishWorkflow = async(workflow_id: number) => {
    const res = await axios.put(`/api/publish/${workflow_id}`)
    return res
}

export const getToken  = async(wallet:string) => {
    const res = await axios.post(`/api/credential`, {'wallet':wallet})
    return res
}

export const updateWorkflow = async (params:any, id:any) => {
    const res = await axios.post(`/api/workflow/save/${id}`, params)
    return res
}

export const updatePrompt = async (params:any, id:any) => {
    const res = await axios.post(`/api/prompt/save/${id}`, params)
    return res
}

export const nodeRun = async (params:any, id:any) => {
    const res = await axios.post(`/api/workflow/run/${id}`, params)
    return res
}

export const getModelList = async () => {
    const data = {
        "page": 1,
        "count": 100
    }
    const res = await axios.post(`/api/model/list`, data)
    return res
}