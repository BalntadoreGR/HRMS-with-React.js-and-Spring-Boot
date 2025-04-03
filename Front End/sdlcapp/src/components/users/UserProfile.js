const UserProfile = (function() {
    let currentUser = null;
    let currentRole = null;
  
    const getUser = () => currentUser;
    const getRole = () => currentRole;
  
    const setUser = (user) => {
      currentUser = user;
      // Update user data in localStorage or cookie if needed
    };

    const setRole = (role) => {
        currentRole = role;
        // Update user data in localStorage or cookie if needed
      };
  
    return {
      getUser,
      setUser,
      getRole,
      setRole,
    };
  })();
  
  export default UserProfile;