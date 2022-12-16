import api from "../lib/api";
import { GetBookingPayload } from "../lib/api/studioSessions";
import store from "../store";
import {
  updateStudios,
  updateSessions,
  updateLoadingState,
  updateSearchingState,
  updateBookings,
} from "../store/slices/merchantSlice";

export async function handleFetchSessions(merchantId: string) {
  try {
    store.dispatch(updateLoadingState(true));

    const response = await api.studioSession.fetchStudioSessions(merchantId);

    console.log(response);

    store.dispatch(updateLoadingState(false));
    store.dispatch(updateSessions(response.data));
  } catch (error) {
    store.dispatch(updateLoadingState(false));
    console.log(error);
  }
}

export async function handleFetchBookings(payload: GetBookingPayload) {
  try {
    store.dispatch(updateLoadingState(true));

    const response = await api.studioSession.fetchSessionBookings(payload);

    console.log(response);

    store.dispatch(updateLoadingState(false));
    store.dispatch(updateBookings(response.data));
  } catch (error) {
    store.dispatch(updateLoadingState(false));
    console.log(error);
  }
}

export async function handleFetchMerchants() {
  try {
    store.dispatch(updateLoadingState(true));

    const response = await api.auth.fetchMerchants();

    console.log(response);

    store.dispatch(updateLoadingState(false));
    store.dispatch(updateStudios(response.data));
  } catch (error) {
    store.dispatch(updateLoadingState(false));
    console.log(error);
  }
}

export async function handleSearchMerchants(searchValue: string) {
  try {
    store.dispatch(updateSearchingState(true));

    const response = await api.auth.searchStudiosByName(searchValue);

    console.log(response);

    store.dispatch(updateSearchingState(false));
    store.dispatch(updateStudios(response.data));
  } catch (error) {
    store.dispatch(updateSearchingState(false));
    console.log(error);
  }
}
