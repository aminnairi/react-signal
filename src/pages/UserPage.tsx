import { useEffect } from "react";
import { useSignal } from "../hooks";
import { userSignal } from "../signals/users";
import { loadingSignal } from "../signals/loading";
import { errorSignal } from "../signals/error";

export const UserPage = () => {
  const user = useSignal(userSignal);
  const loading = useSignal(loadingSignal);
  const error = useSignal(errorSignal);

  useEffect(() => {
    errorSignal.emit(null);
    loadingSignal.emit(true);

    fetch("https://jsonplaceholder.typicode.com/users/1").then(response => {
      return response.json();
    }).then(user => {
      userSignal.emit({
        id: user.id,
        username: user.username
      });
    }).catch(error => {
      errorSignal.emit(error);
    }).finally(() => {
      loadingSignal.emit(false);
    });
  }, []);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (error) {
    return error.message;
  }

  if (!user) {
    return (
      <p>No user found</p>
    );
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>{user.id}</td>
          <td>{user.username}</td>
        </tr>
      </tbody>
    </table>
  );
};