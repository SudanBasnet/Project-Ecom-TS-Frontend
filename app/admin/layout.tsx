import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <div>Admin Nav</div>
      {children}
      <div>Admin Footer</div>
    </main>
  );
};

export default Layout;
