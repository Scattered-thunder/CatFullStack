import { Session } from "../models/Session";

export async function fetchUserAndAuth(
  username: string,
  password: string
): Promise<Session | null> {
  try {
    const response = await fetch(
      "http://localhost:8080/users/username/" + username
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error("Error fetching user data");
    }
    if (data.password === password) {
      const session: Session = {
        username: data.username,
        isLogged: true,
      };
      return session;
    }
    throw new Error("Invalid password");
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}
