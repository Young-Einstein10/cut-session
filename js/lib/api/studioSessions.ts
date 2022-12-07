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

interface SessionBookingResponse {
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

  fetchSessionBookings() {
    return this.client.get<SessionBookingResponse>("/bookings");
  }
}

export default StudioSession;
