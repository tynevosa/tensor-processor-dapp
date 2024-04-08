import axios from "axios";

const host = process.env.NEXT_PUBLIC_API_URL
axios.defaults.headers['tpu-api-key'] = "U2FsdGVkX18qrN7nHPpQRpx366XamJKN6hIyBAw0yGQ63PPa6lkQy7pVyR58zAhyf9QEsi2rw6erkhlCK6E3WA=="

export const setAuthorization = (token:string) => {
     axios.defaults.headers.Authorization = token
    
}
 

export const createWorkflow = async (param: any) => {
    const res = await axios.post(`${host}/workflow/create`, param);
    return res;
}

export const createPrompt = async(param:any) => {
    const res = await axios.post(`${host}/prompt/create`, param)
}

export const getPromptList = async () => {
    const res = await axios.get(`${host}/prompt/list`)
    return res
}

export const getPrompt = async (id:any) => {
    const res = await axios.get(`${host}/prompt/${id}`)
    return res
}

export const  getWorkflow = async (productId: any) => {
    const res = await axios.get(`${host}/workflow/${productId}`)
    return res
}

export const  getWorkflowList = async () => {
    const res = await axios.get(`${host}/workflow/list`)
    return res
}


 export const deleteWorkflow = async (workflow_id: number) => {
    const res = await axios.delete(`${host}/workflow/delete/${workflow_id}`)
    return res
}


 export const  publishWorkflow = async(workflow_id: number) => {
    const res = await axios.put(`${host}/publish/${workflow_id}`)
    return res
}

export const getToken  = async(wallet:string) => {
    const res = await axios.post(`${host}/credential`, {'wallet':wallet})
    return res
}


export const updateWorkflow = async (params:any, id:any) => {
    const res = await axios.post(`${host}/workflow/save/${id}`, params)
    return res
}

export const updatePrompt = async (params:any, id:any) => {
    const res = await axios.post(`${host}/prompt/save/${id}`, params)
    return res
}

export const nodeRun = async (params:any, id:any) => {
    const res = await axios.post(`${host}/workflow/run/${id}`, params)
    return res
}

export const getModelList = async () => {
    const res = await axios.get(`${host}/model/list`)
    return res
}