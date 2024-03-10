import { useState, useEffect } from "react";
import { useDataProvider, useGetIdentity, useNotify } from "react-admin";
import { useForm } from "react-hook-form";

const UserProfileUpdate = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);

  const { error, data, isLoading: identityLoading } = useGetIdentity();

  // Fetch user's current information from the backend
  useEffect(() => {
    if (identityLoading) return; // Wait until the identity is loaded
    if (!data) {
      notify("User is not authenticated.", "warning");
      setLoading(false);
      return;
    }

    dataProvider
      .getOne("users", { id: data.id }) // Use the identity ID
      .then(({ data }) => {
        reset(data); // Populate the form with the user's current information
        setLoading(false);
      })
      .catch((error) => {
        notify("Error loading user profile", "error");
        setLoading(false);
      });
  }, [data, identityLoading, dataProvider, notify, reset]);

  // Handle form submission
  const onSubmit = (formData) => {
    console.log("on submit called", formData);
    if (!data) {
      notify("User is not authenticated.", "warning");
      return;
    }

    // formData now contains the form inputs
    dataProvider
      .update("users", { id: data.id, data: formData })
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
        <input {...register("fullName", { required: true })} />
      </div>
      <div>
        <label>Address:</label>
        <input {...register("address")} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input {...register("phone")} />
      </div>
      <div>
        <label>Subscription:</label>
        <select {...register("subscription")}>
          <option value="free">Free</option>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
        </select>
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserProfileUpdate;
