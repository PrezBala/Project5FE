import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function AdminPanel() {
  const [token] = useCookies(['mr-token']);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Perform an API call to validate the token and check the user role
        const response = await fetch('/api/validate-token', {
          headers: {
            Authorization: `Bearer ${token['mr-token']}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
        console.error('Error validating token:', error);
      }
    };

    if (token['mr-token']) {
      validateToken();
    } else {
      setIsAdmin(false);
    }
  }, [token]);

  if (!isAdmin) {
    return <h1>Unauthorized Access</h1>;
  }

  // Render the admin-specific functionality and UI
  return (
    <div>
      <h1>Admin Panel</h1>
      {/* Add your admin-specific UI components and features here */}
    </div>
  );
}

export default AdminPanel;
