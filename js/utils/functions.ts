import api from "../lib/api";
import store from "../store";
import {
  fetchStudios,
  updateLoadingState,
  updateSearchingState,
} from "../store/slices/merchantSlice";

export async function handleFetchMerchants() {
  try {
    store.dispatch(updateLoadingState(true));

    const response = await api.auth.fetchMerchants();

    console.log(response);

    store.dispatch(updateLoadingState(false));
    store.dispatch(fetchStudios(response.data));
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
    store.dispatch(fetchStudios(response.data));
  } catch (error) {
    store.dispatch(updateSearchingState(false));
    console.log(error);
  }
}
