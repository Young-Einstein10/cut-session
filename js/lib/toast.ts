import notify from "toastr";

notify.options = {
  positionClass: "toast-top-center",
};
const notifySuccess = notify.success;
const notifyError = notify.error;

export { notify, notifySuccess, notifyError };
