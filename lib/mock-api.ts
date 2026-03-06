export interface InvitePayload {
  name: string;
  email: string;
  role: string;
  department: string;
  message?: string;
}

export interface InviteResponse {
  status: "success" | "error";
  message: string;
  data: InvitePayload;
}

export async function sendInvite(data: InvitePayload): Promise<InviteResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        message: "Invitation sent successfully",
        data,
      });
    }, 1000);
  });
}
