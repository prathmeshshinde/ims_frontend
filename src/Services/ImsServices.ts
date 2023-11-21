import axios from "axios";
import { ILogin } from "../Interface/ILogin";
import { ISignUp } from "../Interface/ISignUp";
import { IUser } from "../Interface/IUser";

export class ImsService {
  private static serverUrl = "http://localhost:3000";

  public static login = (loginDetails: ILogin): Promise<{ data: any }> => {
    const dataUrl = `${this.serverUrl}/ims/login`;
    return axios.post(dataUrl, loginDetails);
  };

  public static signup = (signupDetails: ISignUp): Promise<{ data: any }> => {
    const dataUrl = `${this.serverUrl}/ims/signup`;
    return axios.post(dataUrl, signupDetails);
  };

  public static getUser = (username: string): Promise<{ data: IUser }> => {
    const dataUrl = `${this.serverUrl}/ims/user`;
    return axios.get(dataUrl, { params: { username: username } });
  };

  public static getJavascriptTestQuestions = () => {
    const dataUrl = `${this.serverUrl}/ims/javascript`;
    return axios.get(dataUrl);
  };

  public static getReactTestQuestions = () => {
    const dataUrl = `${this.serverUrl}/ims/react`;
    return axios.get(dataUrl);
  };

  public static getHtmlTestQuestions = () => {
    const dataUrl = `${this.serverUrl}/ims/html`;
    return axios.get(dataUrl);
  };

  public static getCssTestQuestions = () => {
    const dataUrl = `${this.serverUrl}/ims/css`;
    return axios.get(dataUrl);
  };

  public static postUserOnPointsTable = (userPointDetails: any) => {
    const dataUrl = `${this.serverUrl}/ims/postpoints`;
    return axios.post(dataUrl, userPointDetails);
  };

  public static getUsersPoint = (username: any) => {
    const dataUrl = `${this.serverUrl}/ims/userpoint`;
    return axios.get(dataUrl, { params: { username: username } });
  };

  public static updateTestPoints = (updatepoint: any) => {
    const dataUrl = `${this.serverUrl}/ims/updatepoint`;
    return axios.put(dataUrl, updatepoint);
  };
}
