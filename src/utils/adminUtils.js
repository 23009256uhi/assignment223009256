export const ADMIN_UID = "lYR7F0F2fob9yOI499XbJc7Tcnj1";

export function isAdmin(user) {
  return (
    user && (user.uid === ADMIN_UID || user.email === "1122131uhi@gmail.com")
  );
}
