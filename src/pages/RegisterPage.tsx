import { ChangeEventHandler, useCallback } from "react";
import { useSignal } from "../hooks"
import { registerSignal } from "../signals/register";

export const RegisterPage = () => {
  const register = useSignal(registerSignal);

  const setEmail: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    registerSignal.next(oldRegister => {
      return {
        ...oldRegister,
        email: event.target.value
      }
    });
  }, []);

  const setPassword: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    registerSignal.next(oldRegister => {
      return {
        ...oldRegister,
        password: event.target.value
      }
    });
  }, []);

  return (
    <form>
      <input type="email" value={register.email} onChange={setEmail} />
      <input type="password" value={register.password} onChange={setPassword} />
    </form>
  );
}