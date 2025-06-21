import Swal from "sweetalert2";

export const confirmAlert = async (message) => {
  return Swal.fire({
    icon: "question",
    title: "Konfirmasi",
    text: message,
    showDenyButton: true,
    confirmButtonText: "Ya",
    denyButtonText: "Tidak",
  });
};

export const alertSuccess = async (message) => {
  return Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: message,
  });
};
