import { Cat } from "../models/Cat";

// All API calls are here

export async function fetchAllCats(): Promise<Cat[] | undefined> {
    try {
        const response = await fetch("http://localhost:8080/cats");
        if (!response.ok) {
            throw new Error("Error fetching the cats");
        }
        const cats: Cat[] = await response.json();
        return cats;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return undefined;
    }
}

export async function createCat(cat: Cat) {
    try {
        const response = await fetch("http://localhost:8080/cats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cat),
        });
        if (!response.ok) {
            throw new Error("Error adding the cat");
        }
        const newCat = await response.json();
        return newCat;
    } catch (error) {
        console.error("Error adding the cat: ", error);
        throw error;
    }
}

export async function editCat(id: number, cat: Cat) {
    try {
        const response = await fetch("http://localhost:8080/cats/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": cat.name,
                "color": cat.color,
                "age": cat.age,
            }),
        });
        if (!response.ok) {
            throw new Error("Error editing the cat");
        } else {
            console.log("Cat edited without issues: " + response.status);
            return;
        }
    } catch (error) {
        console.error("Error editing the cat: ", error);
        throw error;
    }
}

export async function removeCat(id: number) {
    try {
        const response = await fetch("http://localhost:8080/cats/" + id, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error deleting the cat");
        } else {
            console.log("Cat deleted without issues: " + response.status);
            return;
        }
    } catch (error) {
        console.error("Error deleting the cat: ", error);
        throw error;
    }
}
