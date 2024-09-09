import API from "../../backend";

export const getProducts = async () => {
    try {
        const response = await fetch(`${API}/products`, {
            method: "GET"
        });
        return await response.json();
    } catch (error) {
        return console.log(error);
    }
}

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API}/product/${id}`, {
            method: "GET"
        });
        return await response.json();
    } catch (error) {
        return console.log(error);
    }
}