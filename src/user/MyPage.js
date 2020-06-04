import { useAuthState, Loading } from "ra-core";

const MyPage = () => {
  const { loading, authenticated } = useAuthState();
  if (loading) {
    return <Loading />;
  }
  if (authenticated) {
    return <Exception />;
  }
  return "Unauthorized Access Denied";
};
