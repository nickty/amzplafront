import { useState, useEffect } from "react";
import { useDataProvider, useGetIdentity, useNotify } from "react-admin";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Subscription from "../components/Subscription";

// Styled components
const FormContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const UserProfileUpdate = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);

  const { error, data, isLoading: identityLoading } = useGetIdentity();

  useEffect(() => {
    if (identityLoading) return;
    if (!data) {
      notify("User is not authenticated.", "warning");
      setLoading(false);
      return;
    }

    dataProvider
      .getOne("users", { id: data.id })
      .then(({ data }) => {
        reset(data);
        setLoading(false);
      })
      .catch((error) => {
        notify("Error loading user profile", "error");
        setLoading(false);
      });
  }, [data, identityLoading, dataProvider, notify, reset]);

  const onSubmit = (formData) => {
    if (!data) {
      notify("User is not authenticated.", "warning");
      return;
    }

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
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Name:</Label>
          <Input {...register("fullName", { required: true })} />
        </div>
        <div>
          <Label>Address:</Label>
          <Input {...register("address")} />
        </div>
        <div>
          <Label>Phone Number:</Label>
          <Input {...register("phone")} />
        </div>
        <Button type="submit">Update Profile</Button>
        <div>
          {/* <Label>Subscription:</Label>
          <Select {...register("subscription")}>
            <option value="free">Free</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </Select> */}

          <Subscription />
        </div>
      </Form>
    </FormContainer>
  );
};

export default UserProfileUpdate;
