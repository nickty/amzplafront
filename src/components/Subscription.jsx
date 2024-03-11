import styled from "styled-components";
import handleSubscriptionUpdateFunc from "../utils/handleSubscriptionUpdateFunc";

// Styled components
const SubscriptionSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const SubscriptionCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  width: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
`;

const InfoItem = styled.li`
  margin-bottom: 0.5rem;
`;

const UpdateButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

// Subscription component
const Subscription = ({ onSubscriptionChange }) => {
  const handleSubscriptionUpdate = (plan) => {
    // Example condition: Only Basic and Premium plans require payment
    if (plan === "basic" || plan === "premium") {
      // Here, you would integrate your payment modal logic
      // For demonstration, let's simulate a payment process with a simple confirmation
      const isPaymentSuccessful = window.confirm(
        `Confirm payment for ${plan} plan?`
      );

      handleSubscriptionUpdateFunc(plan);

      // If payment is successful, update the subscription
      if (isPaymentSuccessful) {
        onSubscriptionChange(plan);
      } else {
        alert("Payment failed or was cancelled.");
      }
    } else {
      // For free plan, update directly without payment
      onSubscriptionChange(plan);
    }
  };
  return (
    <SubscriptionSection>
      {/* Subscription card 1 */}
      <SubscriptionCard>
        <Title>Free Plan</Title>
        <InfoList>
          <InfoItem>Feature 1</InfoItem>
          <InfoItem>Feature 2</InfoItem>
          <InfoItem>Feature 3</InfoItem>
        </InfoList>
        <UpdateButton onClick={() => handleSubscriptionUpdate("free")}>
          Update Subscription
        </UpdateButton>
      </SubscriptionCard>

      {/* Subscription card 2 */}
      <SubscriptionCard>
        <Title>Basic Plan</Title>
        <InfoList>
          <InfoItem>Feature 1</InfoItem>
          <InfoItem>Feature 2</InfoItem>
          <InfoItem>Feature 3</InfoItem>
          <InfoItem>Feature 4</InfoItem>
        </InfoList>
        <UpdateButton onClick={() => handleSubscriptionUpdate("basic")}>
          Update Subscription
        </UpdateButton>
      </SubscriptionCard>

      {/* Subscription card 3 */}
      <SubscriptionCard>
        <Title>Premium Plan</Title>
        <InfoList>
          <InfoItem>Feature 1</InfoItem>
          <InfoItem>Feature 2</InfoItem>
          <InfoItem>Feature 3</InfoItem>
          <InfoItem>Feature 4</InfoItem>
          <InfoItem>Feature 5</InfoItem>
        </InfoList>
        <UpdateButton onClick={() => handleSubscriptionUpdate("premium")}>
          Update Subscription
        </UpdateButton>
      </SubscriptionCard>
    </SubscriptionSection>
  );
};

export default Subscription;
