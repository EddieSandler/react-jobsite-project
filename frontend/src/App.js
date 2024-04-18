import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useLocalStorage from "./components/useLocalStorage";
import Navigation from "./components/Navigation";
import LoadingSpinner from "./components/LoadingSpinner";
import JoblyApi from "./Api";
import UserContext from "./components/UserContext";
import jwt from "jsonwebtoken";
import PublicRoutes from "./components/PublicRoutes";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [applicationIds, setApplicationIds] = useState(new Set([]));
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

    useEffect(() => {
        async function getCurrentUser() {
            if (!token) return setInfoLoaded(true);
            try {
                const { username } = jwt.decode(token);
                JoblyApi.token = token;
                const currentUser = await JoblyApi.getCurrentUser(username);
                setCurrentUser(currentUser);
                setApplicationIds(new Set(currentUser.applications));
            } catch (err) {
                console.error("Problem loading user info:", err);
                setCurrentUser(null);
            }
            setInfoLoaded(true);
        }
        setInfoLoaded(false);
        getCurrentUser();
    }, [token]);

    function logout() {
        setCurrentUser(null);
        setToken(null);
    }

    function signup(signupData) {
        return JoblyApi.signup(signupData)
            .then(token => {
                setToken(token);
                return { success: true };
            })
            .catch(errors => {
                console.error("signup failed", errors);
                return { success: false, errors };
            });
    }

    function login(loginData) {
        return JoblyApi.login(loginData)
            .then(token => {
                setToken(token);
                return { success: true };
            })
            .catch(errors => {
                console.error("login failed", errors);
                return { success: false, errors };
            });
    }

    function hasAppliedToJob(id) {
        return applicationIds.has(id);
    }

    function applyToJob(id) {
        if (hasAppliedToJob(id)) return;
        JoblyApi.applyToJob(currentUser.username, id);
        setApplicationIds(new Set([...applicationIds, id]));
    }

    if (!infoLoaded) return <LoadingSpinner />;

    return (
        <Router>
            <UserContext.Provider value={{
                currentUser,
                setCurrentUser,
                applicationIds,
                hasAppliedToJob,
                applyToJob
            }}>
                <Navigation logout={logout} />
                <Routes>
                    <Route path="/*" element={<PublicRoutes login={login} signup={signup} />} />
                </Routes>
            </UserContext.Provider>
        </Router>
    );
}

export default App;























// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import useLocalStorage from "./components/useLocalStorage";
// import Navigation from "./components/Navigation";
// import LoadingSpinner from "./components/LoadingSpinner";
// import JoblyApi from "./Api";
// import UserContext from "./components/UserContext";
// import jwt from "jsonwebtoken";
// import PublicRoutes from "./components/PublicRoutes";

// export const TOKEN_STORAGE_ID = "jobly-token";

// function App() {
//   const [infoLoaded, setInfoLoaded] = useState(false);
//   const [applicationIds, setApplicationIds] = useState(new Set([]));
//   const [currentUser, setCurrentUser] = useState(null);
//   const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

//   useEffect(() => {
//     async function getCurrentUser() {
//       if (!token) return setInfoLoaded(true);
//       try {
//         const { username } = jwt.decode(token);
//         JoblyApi.token = token;
//         const currentUser = await JoblyApi.getCurrentUser(username);
//         setCurrentUser(currentUser);
//         setApplicationIds(new Set(currentUser.applications));
//       } catch (err) {
//         console.error("Problem loading user info:", err);
//         setCurrentUser(null);
//       }
//       setInfoLoaded(true);
//     }
//     setInfoLoaded(false);
//     getCurrentUser();
//   }, [token]);

//   function logout() {
//     setCurrentUser(null);
//     setToken(null);
//   }

//   function signup(signupData) {
//     return JoblyApi.signup(signupData)
//       .then(token => {
//         setToken(token);
//         return { success: true };
//       })
//       .catch(errors => {
//         console.error("signup failed", errors);
//         return { success: false, errors };
//       });
//   }

//   function login(loginData) {
//     return JoblyApi.login(loginData)
//       .then(token => {
//         setToken(token);
//         return { success: true };
//       })
//       .catch(errors => {
//         console.error("login failed", errors);
//         return { success: false, errors };
//       });
//       /** Checks if a job has been applied for. */
//   function hasAppliedToJob(id) {
//     return applicationIds.has(id);
//   }

//   /** Apply to a job: make API call and update set of application IDs. */
//   function applyToJob(id) {
//     if (hasAppliedToJob(id)) return;
//     JoblyApi.applyToJob(currentUser.username, id);
//     setApplicationIds(new Set([...applicationIds, id]));

//   }
// }

//   if (!infoLoaded) return <LoadingSpinner />;

//   return (
//     <Router>
//       <UserContext.Provider value={{ currentUser, setCurrentUser, applicationIds, applyToJob: id => applyToJob(id) }}>
//         <Navigation logout={logout} />
//         <Routes>
//           <Route path="/*" element={<PublicRoutes login={login} signup={signup} />} />
//         </Routes>
//       </UserContext.Provider>
//     </Router>
//   );
// }

// export default App;
