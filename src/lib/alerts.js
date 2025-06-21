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
