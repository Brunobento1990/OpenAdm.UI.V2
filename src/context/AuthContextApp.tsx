"use client";

import { keysLocalStorage } from "@/configs/KeysLocalStorage";
import { rotasApp } from "@/configs/RotasApp";
import { useLocalStorageApp } from "@/hooks/UseLocalStorageApp";
import { useNavigateApp } from "@/hooks/useNavigateApp";
import { ILoginResponse } from "@/interfaces/LoginResponse";
import { IUsuario } from "@/interfaces/Usuario";
import { ReactNode, createContext, useEffect, useState } from "react";

interface IAuthContextApp {
  usuario?: IUsuario;
  setUsuario?: (usuario: IUsuario) => void;
  logout: () => void;
  login: (response: ILoginResponse) => void;
}

interface IAppLayoutProvider {
  children: ReactNode;
}

export const AuthContextApp = createContext({} as IAuthContextApp);

export function AuthProviderApp(props: IAppLayoutProvider) {
  const [usuario, setUsuario] = useState<IUsuario>();
  const { getItem, setItem, removeItem } = useLocalStorageApp();
  const { navigate, path } = useNavigateApp();

  function init() {
    const usuarioLocalStorage = getItem<IUsuario>(
      keysLocalStorage.usuario,
      true
    );
    if (!usuarioLocalStorage) {
      navigate(rotasApp.login);
      return;
    }
    if (usuarioLocalStorage) {
      setUsuario(usuarioLocalStorage);
    }
  }

  function setNovoUsuario(usua: IUsuario) {
    setUsuario(usua);
    setItem(keysLocalStorage.usuario, usua, true);
  }

  function login(response: ILoginResponse) {
    setUsuario(response.usuario);
    setItem(keysLocalStorage.usuario, response.usuario, true);
    setItem(keysLocalStorage.jwt, response.token);
    setItem(keysLocalStorage.refreshToken, response.refreshToken);
    navigate(rotasApp.home);
  }

  function logout() {
    setUsuario(undefined);
    removeItem(keysLocalStorage.usuario);
    removeItem(keysLocalStorage.jwt);
    removeItem(keysLocalStorage.refreshToken);
    navigate(rotasApp.login);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <AuthContextApp.Provider
      value={{
        usuario,
        setUsuario: setNovoUsuario,
        logout,
        login,
      }}
    >
      {props.children}
    </AuthContextApp.Provider>
  );
}
