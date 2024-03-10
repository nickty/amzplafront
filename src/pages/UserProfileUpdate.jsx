import { useState, useEffect } from "react";
import { useDataProvider, useGetIdentity, useNotify } from "react-admin";
import { useForm } from "react-hook-form";

const UserProfileUpdate = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);

  const { identity, loading: identityLoading } = useGetIdentity();

  console.log("identity", identity);
  console.log("register", register);
  console.log("reset", reset);

  // Fetch user's current information from the backend
  useEffect(() => {
    if (identityLoading) return; // Wait until the identity is loaded
    if (!identity) {
      notify("User is not authenticated.", "warning");
      setLoading(false);
      return;
    }

    dataProvider
      .getOne("users", { id: identity.id }) // Use the identity ID
      .then(({ data }) => {
        reset(data); // Populate the form with the user's current information
        setLoading(false);
      })
      .catch((error) => {
        notify("Error loading user profile", "error");
        setLoading(false);
      });
  }, [identity, identityLoading, dataProvider, notify, reset]);

  // Handle form submission
  const onSubmit = (formData) => {
    console.log("on submit called", formData);
    if (!identity) {
      notify("User is not authenticated.", "warning");
      return;
    }

    // formData now contains the form inputs
    dataProvider
      .update("users", { id: identity.id, data: formData })
      .then(() => {
        notify("Profile updated successfully", "info");
      })
      .catch((error) => {
        notify("Error updating profile", "error");
      });
  };

  if (loading || identityLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input name="fullName" ref={register({ required: true })} />
      </div>
      {/* <div>
        <label>Address:</label>
        <input name="address" ref={register} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input name="phone" ref={register} />
      </div>
      <div>
        <label>Subscription:</label>
        <select name="subscription" ref={register}>
          <option value="free">Free</option>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
        </select>
      </div> */}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserProfileUpdate;
