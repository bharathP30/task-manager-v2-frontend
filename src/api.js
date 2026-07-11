
export class ApiError extends Error {
  constructor(message, status) {
    super(message);       // sets this.message, same as a normal Error
    this.name = "ApiError";
    this.status = status; // the new part — carries res.status forward
  }
}

const BASE_API = import.meta.env.VITE_API_URL;

export default async function apiRequestHelper (path, { method = "GET", token, body } = {} ) {
    const url = `${BASE_API}${path}`;

    const res = fetch(url, {
        method,
        headers: {
            "content-type": "application/json",
            ...(token && { authorization: `Bearer ${token}`}), 
        },
        ...(body && { body: JSON.stringify(body)})
    })

    const data = res.json();

    if(!res.ok) throw new ApiError(data.error || "Something went wrong");

    return data;
}