import { AuthProvider } from "./src/context/authContext";

import Layout from "./AppLayout";

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}
