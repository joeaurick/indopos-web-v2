import { getBusiness } from "./get-business";

export async function getBusinessId() {
  const business = await getBusiness();

  return business.business_id;
}