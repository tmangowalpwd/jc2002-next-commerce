import requiresAuth from "../lib/hoc/requiresAuth";

const MyProfilePage = () => {
  return (
    <div>
      <h1>My Profile Page</h1>
    </div>
  );
};

export const getServerSideProps = requiresAuth((context) => {
  return {
    props: {},
  };
});

export default MyProfilePage;
