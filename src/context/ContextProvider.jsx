import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const GlobalContext = createContext();
const ContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(true);
	const [employeeList, setEmployeeList] = useState([]);

	useEffect(() => {
		const getEmployeeList = async () => {
			try {
				const { data } = axios.get("http://localhost:8080/employee/employees");
				setEmployeeList(data);
			} catch (error) {}
		};
		getEmployeeList();
	}, [employeeList]);

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
