import { AxiosInstance } from "axios";

export type SessionType = "WeekDay" | "WeekEnd";

export interface CreateStudioSessionPayload {
  startsAt: string;
  endsAt: string;
  type: SessionType;
}

export interface StudioSessionProps {
  id: string;
  merchantId: string;
  startsAt: string;
  endsAt: string;
  type: SessionType;
}

export interface BookingPayload {
  sessionId: string;
  date: string;
  userId: string;
  notes: string;
  title: string;
}

export interface GetBookingPayload {
  merchant: string;
  city?: string;
  limit?: number;
  offset?: number;
  period?: string;
}

export interface SessionBookingResponse {
  count: number;
  next: string;
  previous: string;
  data: SessionBookingProps[];
}

export type SessionBookingProps = BookingPayload &
  BookingResponse & {
    startsAt: string;
    endsAt: string;
  };

export interface BookingResponse {
  bookingId: string;
  bookingRef: string;
}

class StudioSession {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  fetchStudioSessions(merchantId: string) {
    return this.client.get<StudioSessionProps[]>(`/studios/${merchantId}`);
  }

  createStudioSession(merchantId: string, body: CreateStudioSessionPayload) {
    return this.client.post<CreateStudioSessionPayload, { sessionId: string }>(
      `/studios/${merchantId}`,
      body
    );
  }

  bookStudioSession(body: BookingPayload) {
    return this.client.post<BookingPayload, BookingResponse>("/bookings", body);
  }

  fetchSessionBookings(payload: GetBookingPayload) {
    const { limit = 20, offset = 1, city = " ", merchant, period } = payload;

    return this.client.get<SessionBookingResponse>(
      `/bookings?limit=${limit}&offset=${offset}&city=${city}&period=${period}&merchant=${merchant}`
    );
  }
}

export default StudioSession;
