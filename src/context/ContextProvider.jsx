import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import baseURL from "../api/axiosApi";
export const GlobalContext = createContext();
const ContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(true);
	const [employeeList, setEmployeeList] = useState([]);

	useEffect(() => {
		const getEmployeeList = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(`${baseURL}/employee/employees`);
				setEmployeeList(data);
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			} catch (error) {}
		};
		getEmployeeList();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				loading,
				setLoading,
				loggedIn,
				setLoggedIn,
				employeeList,
				setEmployeeList,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default ContextProvider;
